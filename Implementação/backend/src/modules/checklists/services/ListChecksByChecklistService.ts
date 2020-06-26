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

  public async execute(checklist_id: string): Promise<Check[]> {
    const findChecklist = await this.checklistsRepository.find(checklist_id);

    if (!findChecklist) {
      throw new AppError('Checklist not found');
    }

    const checks = await this.checksRepository.findByChecklist(checklist_id);

    return checks || [];
  }
}

export default CreateChecklistService;
