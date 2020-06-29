import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';

interface IRequest {
  userId: string;
}

@injectable()
class CreateChecklistService {
  constructor(
    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<CheckList[]> {
    const checklists = await this.checklistsRepository.findByUser(userId);

    return checklists;
  }
}

export default CreateChecklistService;
