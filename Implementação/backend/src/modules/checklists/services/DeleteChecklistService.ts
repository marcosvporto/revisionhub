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

  public async execute({ checklistId, userId }: IRequest): Promise<void> {
    const findChecklist = await this.checklistsRepository.find(checklistId);

    if (!findChecklist) {
      throw new AppError('Checklist not found', 404);
    }

    if (findChecklist.creator_id !== userId) {
      throw new AppError('You are not the owner of this checklist', 401);
    }

    await this.checklistsRepository.delete(findChecklist);
  }
}

export default CreateChecklistService;
