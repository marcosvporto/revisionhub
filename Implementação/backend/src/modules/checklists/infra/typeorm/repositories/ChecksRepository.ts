import { getRepository, Repository } from 'typeorm';

import IChecksRepository from '@modules/checklists/repositories/IChecksRepository';
import ICreateCheckDTO from '@modules/checklists/dtos/ICreateCheckDTO';

import Check from '../entities/Check';

class ChecksRepository implements IChecksRepository {
  private ormRepository: Repository<Check>;

  constructor() {
    this.ormRepository = getRepository(Check);
  }

  public async find(check_id: string): Promise<Check | undefined> {
    const findCheck = await this.ormRepository.findOne({
      where: { id: check_id },
    });

    return findCheck;
  }

  public async findByChecklist(checklist_id: string): Promise<Check[]> {
    const findChecks = await this.ormRepository.find({
      where: { checklist_id },
    });

    return findChecks;
  }

  public async create({ checklist_id, text }: ICreateCheckDTO): Promise<Check> {
    const check = this.ormRepository.create({ checklist_id, text });

    await this.ormRepository.save(check);

    return check;
  }

  public async delete(check: Check): Promise<void> {
    await this.ormRepository.remove(check);
  }

  public async save(check: Check): Promise<Check> {
    return this.ormRepository.save(check);
  }
}

export default ChecksRepository;
