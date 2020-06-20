import { inject, injectable } from 'tsyringe';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateChecklistService {
  constructor(
    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  public async execute(checklist_id: string): Promise<CheckList> {
    const checklist = await this.checklistsRepository.find(checklist_id);

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    checklist.likes += 1;

    await this.checklistsRepository.save(checklist);

    return checklist;
  }
}

export default CreateChecklistService;
