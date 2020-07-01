import { inject, injectable } from 'tsyringe';

import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  checklistId: string;
  userId: string;
}

@injectable()
class CreateChecklistService {
  constructor(
    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  /** ETVX
   * ENTRY:
   *  Espera-se que um objeto da classe DeleteCheckklistService tenha sido instanciado,
   *  tendo como parâmetro um objeto da classe CHecklistRepository;
   *  Espera-se que a função execute tenha sido chamada tendo como parâmetro um corpo de requisição 
   *  contendo uma string referente a checklistID e outra string referente ao userID.
   *  
   * TASK:
   *  A funcão execute utilizará o módulo ChecklistRepository para buscar uma Checklist que corresponda ao 
   *  identificador passado como parâmetro dentro do banco de dados, já que este módulo possui todas as 
   *  ferramentas necessárias para a comunicação com o banco de dados referente ao módulo de Checklists.
   *  Encontrado o registro da checklst no banco de dados, afunção verifica se o id do usuário (Revisor) é o 
   *  mesmo que o contido no registro da checklist. Para que somente o dono da checklist seja capaz de deletá-la.
   * 
   * V&V:
   *  Caso a busca por uma checklits usando o identificador passado como parâmetro, não retorne nenhum resultado,
   *  um AppError é lançado.
   *  Caso o userId passado como parâmetro no corpo da requisição não seja compatível com o userID da checklist
   *  retornada do banco, um AppError é lançado.
   * EXIT:
   *  Espera-se que a checklist correspondente ao id passado não conste mais no banco de dados.
   * 
   */
  public async execute({ checklistId, userId }: IRequest): Promise<void> {
    // Busca no repositório de CHecklists (interface com o banco de dados) a CHecklist correspondente ao CHecklist_ID
    const findChecklist = await this.checklistsRepository.find(checklistId);

    // Caso nenhuma CHecklist seja encontrada, lança um AppError
    if (!findChecklist) {
      throw new AppError('Checklist not found', 404);
    }

    /**
     * Caso o userId passado como parâmetro no corpo da requisição não seja compatível com o userID da checklist
     * retornada do banco, um AppError é lançado
     */
    if (findChecklist.creator_id !== userId) {
      throw new AppError('You are not the owner of this checklist', 401);
    }

    // Deleta a Checklist do banco de dados
    await this.checklistsRepository.delete(findChecklist);
  }
}

export default CreateChecklistService;
