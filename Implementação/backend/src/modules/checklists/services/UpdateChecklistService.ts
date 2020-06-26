import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  checklist_id: string;
  creator_id: string;
  title: string;
}

@injectable()
class UpdateChecklistService {
  constructor(
    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  public async execute({
    checklist_id,
    creator_id,
    title,
  }: IRequest): Promise<CheckList> {
    const findChecklist = await this.checklistsRepository.find(checklist_id);

    if (!findChecklist) {
      throw new AppError('Checklist not found', 404);
    }

    if (findChecklist.creator_id !== creator_id) {
      throw new AppError('You are not the owner of this checklist', 401);
    }

    findChecklist.title = title;

    await this.checklistsRepository.save(findChecklist);

    return findChecklist;
  }
}

export default UpdateChecklistService;
