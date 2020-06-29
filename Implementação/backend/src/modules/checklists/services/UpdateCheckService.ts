import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Check from '@modules/checklists/infra/typeorm/entities/Check';
import IChecksRepository from '@modules/checklists/repositories/IChecksRepository';
import AppError from '@shared/errors/AppError';
import IChecklistsRepository from '../repositories/IChecklistsRepository';

interface IRequest {
  check_id: string;
  creator_id: string;
  text: string;
}

@injectable()
class UpdateCheckService {
  constructor(
    @inject('ChecksRepository')
    private checksRepository: IChecksRepository,

    @inject('ChecklistsRepository')
    private checklistsRepository: IChecklistsRepository,
  ) {}

  public async execute({
    check_id,
    creator_id,
    text,
  }: IRequest): Promise<Check> {
    const findCheck = await this.checksRepository.find(check_id);

    if (!findCheck) {
      throw new AppError('Check not found', 404);
    }

    const findCheckList = await this.checklistsRepository.find(
      findCheck.checklist_id,
    );

    if (!findCheckList) {
      throw new AppError('Internal server error', 500);
    }

    if (findCheckList.creator_id !== creator_id) {
      throw new AppError('You are not the owner of this checklist', 401);
    }

    findCheck.text = text;

    await this.checksRepository.save(findCheck);

    return findCheck;
  }
}

export default UpdateCheckService;
