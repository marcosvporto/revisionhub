import { inject, injectable } from 'tsyringe';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';

@injectable()
class ListAllChecklists {
  constructor(
    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  public async execute(): Promise<CheckList[] | undefined> {
    const checklists = await this.checklistsRepository.findAll();

    return checklists;
  }
}

export default ListAllChecklists;
