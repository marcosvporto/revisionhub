import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
//
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

/** ETVX
 * 
 * ENTRY :
 *    Espera-se que um objeto da classe AuthenticateUserService tenha sido instanciado, 
 *    tendo como parâmetros um objeto da classe IUsersRepository e um objeto da classe IHashProvider
 *    Espera-se que a função execute tenha sido chamada tendo como parâmetros um email e 
 *    uma senha válidas.
 *    Espera-se que o email possua um corpo de e-mail válido, ou seja, uma string contendo "@" e 
 *    ".com" no meio.
 *    Espera-se que a senha seja uma string.
 * TASK :
 *    A função execute utilizará o módulo usersRepository para buscar o email passado como parâmetro
 *    no banco de dados, já que que a classe IUsersRepository possui todas as ferramentas necessárias
 *    para a comunicação com o banco de dados referente ao módulo de usuários (Revisores). 
 *    Uma delas é a função findByEmail. 
 *    Caso o email seja encontrado no banco de dados, a função findByEmail retornará um objeto
 *    da classe User contendo os parâmetros do usuário, incluindo a senha encriptada.
 *    A função execute usará o módulo hashProvider, mais especificamente a função compareHash,
 *    para comparar a senha passada na request com a senha contida no objeto User retornado do banco 
 *    de dados. 
 *    Caso não haja erros ao buscar o usuário no banco ou ao comparar as senhas, a função execute
 *    irá retornar um objeto JSON contendo o usuário autenticado e um JWT token, que será utilizado 
 *    para criar uma seção autenticada, onde o usuário logado poderá ter acesso às rotas que 
 *    necessitam de autenticação. 
 *   
 * V&V :
 *  Caso o email não seja encontrado na base de dados ou caso a senha do usuário seja conflitante
 *  com a senha do usuário retornado do banco de dados será lançado um AppError. Desta forma 
 *  garantimos que o usuário passado como parâmetro no objeto JSON da response é válido.
 *  Para a geração do JWT token utiliza-se uma secret única para esta aplicação, além disso, o token
 *  é gerado por ferramentas do pacote jsonwebtoken portanto, esta lógica de geração cabe à este 
 *  pacote, nos garantindo que o token gerado seguirá os padrões necessários.
 * 
 * EXIT: 
 *    Espera-se que o token contido na response seja um objeto JSON, contendo como subject o id do usuário e
 *    o tempo de expiração do token. 
 *    Espera-se que o user retornado na response seja o usuário correspondente ao email e senha digitados 
 */
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Busca no repositório (interface com o banco) o usuário correspondente ao email
    const user = await this.usersRepository.findByEmail(email);
    
    // Caso nenhum usuário seja encontrado, lança um AppError
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    // Compara a senha passada no parâmetro com a senha do usuário retornado do banco
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    // caso as senhas sejam conflitantes lança um AppError
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    // Busca o secret e o tempo de expiração do token no arquivo de configuração via desestruturação
    const { secret, expiresIn } = authConfig.jwt;

    // cria o token usando a função sign do jsonwebtoken
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    //retorna o usuário e o token de autenticação
    return {
      user,
      token,
    };
  }
}


export default AuthenticateUserService;
