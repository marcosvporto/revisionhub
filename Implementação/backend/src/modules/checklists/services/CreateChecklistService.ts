import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';

interface IRequest {
  creator_id: string;
  title: string;
}

@injectable()
class CreateChecklistService {
  constructor(
    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  public async execute({ creator_id, title }: IRequest): Promise<CheckList> {
    const checklist = await this.checklistsRepository.create({
      creator_id,
      title,
    });

    return checklist;
  }
}

export default CreateChecklistService;
