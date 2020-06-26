import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
/**
 * ENTRY :
 *    Espera-se que tenha sido feita uma requisição por uma rota autenticada: Profile ou Checklist.
 *    Espera-se que no corpo da requisição haja um cabeçalho de autenticação, contendo a palavra "Bearer"
 *    um JWT token, separados por um espaço
 *  
 * TASK :
 *    A função ensureAuthenticated verifica se há um JWT token válido e o decodifica para obter o id 
 *    do usuário para que o servidor possa prosseguir com a requisição e executar a função que lhe 
 *    foi designada. Para tal, utiliza-se a função verify, contida no pacote jsonwebtoken.
 *    
 * V&V :
 *    Caso o corpo da requisição não possua um cabeçalho é lançado um AppError
 *    Caso ocorra um erro na decodificação do JWT token contido no cabeçalho é lançado um AppError.
 * 
 * EXIT:
 *    Espera-se que o id do usuário que foi decodificado don JWT token seja uma string
 */
export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // busca o cabeçalho de autenticação no corpo da requisição
  const authHeader = req.headers.authorization;

  // caso não haja um cabeçalho, um AppError é lançado
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Busca o token contido no cabeçalho via desestruturação
  const [, token] = authHeader.split(' ');

  try {
    // verifica se o token é valido e o decodifica 
    const decoded = verify(token, authConfig.jwt.secret);

    // indica que o token decodificado possui os parâmetros iat,exp e sub e retorna sub por desestruturação
    const { sub } = decoded as ITokenPayload;

    // atribui ao id do usuário na requisição o id decodificado
    req.user = {
      id: sub,
    };

    return next();
  } catch {
    // Caso ocorra um erro na decodificação do token, lança um AppError
    throw new AppError('Invalid JWT token', 401);
  }
}
