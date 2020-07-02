import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Check from '@modules/checklists/infra/typeorm/entities/Check';
import IChecksRepository from '@modules/checklists/repositories/IChecksRepository';
import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';

interface IRequest {
  checklist_id: string;
  text: string;
}

@injectable()
class CreateChecklistService {
  constructor(
    @inject('ChecksRepository')
    private checksRepository: IChecksRepository,

    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  /** ETVX
   * 
   *  ENTRY:
   *    Espera-se que um objeto da classe LitsChecksByChecklitService tenha sido instanciado,
   *    tendo como parâmetros um objeto da classe IChecksRepository e um objeto da classe 
   *    IChecklistRepository
   *    Espera-se que a função execute tenha sido chamada tendo como parâmetro uma string contendo 
   *    um identificador de checklist.
   *  TASK:
   *    A função execute utilizará o módulo checklistsRepository para buscar uma Checklist que
   *    corresponda ao identificador passado como parâmetro dentro do banco de dados, já que este módulo
   *    possui todas as ferramentas necessárias para a comunicação com o banco de dados referente ao módulo
   *    de Checklists.
   *    Encontrado o registro da checklist no banco de dados, a função execute utilizará o módulo 
   *    checksRepository para buscar todas as Checks que estão associadas ao identiicador da Checklist 
   *    retornada, também no banco de dados. Assim como o módulo checklistsRepository, o módulo 
   *    checksRepository possui todas as ferramentas para a comunicação com o banco de dados. Porém se atenta
   *    somente aos registros de checks. 
   *    
   *  V&V:
   *    Caso a busca por uma checklist usando identificador passado como parâmetro, um AppError é lançado
   *  EXIT:
   *    Espera-se que a função execute retorne uma lista de checks.
   * 
   */
  public async execute(checklist_id: string): Promise<Check[]> {
    // BUsca no repositório de Checklists (interface com o banco) a Checklist correspondente a checklist_id
    const findChecklist = await this.checklistsRepository.find(checklist_id);

    // Caso nenhuma Checklist seja encontrada, lança um AppError
    if (!findChecklist) {
      throw new AppError('Checklist not found');
    }
    // Busca no repositório de Checks, todas as checklists associadas a checklist procurada
    const checks = await this.checksRepository.findByChecklist(checklist_id);

    // Retorna um Array de Checks ou um Array Vazio
    return checks || [];
  }
}

export default CreateChecklistService;
