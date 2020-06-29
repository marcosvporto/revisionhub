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

  public async execute({ checklist_id, text }: IRequest): Promise<Check> {
    const findChecklist = await this.checklistsRepository.find(checklist_id);

    if (!findChecklist) {
      throw new AppError('Checklist not found', 404);
    }

    const check = await this.checksRepository.create({
      checklist_id,
      text,
    });

    return check;
  }
}

export default CreateChecklistService;
