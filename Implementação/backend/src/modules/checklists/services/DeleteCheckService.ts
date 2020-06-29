import { inject, injectable } from 'tsyringe';

import IChecksRepository from '@modules/checklists/repositories/IChecksRepository';
import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  checkId: string;
  userId: string;
}

@injectable()
class DeleteCheckService {
  constructor(
    @inject('ChecksRepository')
    private checksRepository: IChecksRepository,

    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  public async execute({ checkId, userId }: IRequest): Promise<void> {
    const findCheck = await this.checksRepository.find(checkId);

    if (!findCheck) {
      throw new AppError('Check not found', 404);
    }

    const findChecklist = await this.checklistsRepository.find(
      findCheck.checklist_id,
    );

    if (!findChecklist) {
      throw new AppError('Internal server error', 500);
    }

    if (findChecklist.creator_id !== userId) {
      throw new AppError('You are not the owner of this checklist', 401);
    }

    await this.checksRepository.delete(findCheck);
  }
}

export default DeleteCheckService;
