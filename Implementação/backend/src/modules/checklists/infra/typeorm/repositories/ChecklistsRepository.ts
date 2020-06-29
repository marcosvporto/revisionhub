import { getRepository, Repository } from 'typeorm';

import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';
import ICreateChecklistDTO from '@modules/checklists/dtos/ICreateChecklistDTO';

import Checklist from '../entities/CheckList';

class ChecklistsRepository implements IChecklistsRepository {
  private ormRepository: Repository<Checklist>;

  constructor() {
    this.ormRepository = getRepository(Checklist);
  }

  public async create({
    creator_id,
    title,
  }: ICreateChecklistDTO): Promise<Checklist> {
    const checklist = this.ormRepository.create({ creator_id, title });

    await this.ormRepository.save(checklist);

    return checklist;
  }

  public async find(checklist_id: string): Promise<Checklist | undefined> {
    const findChecklist = await this.ormRepository.findOne({
      where: { id: checklist_id },
    });

    return findChecklist;
  }

  public async findByUser(user_id: string): Promise<Checklist[]> {
    const findChecklists = await this.ormRepository.find({
      where: { creator_id: user_id },
    });

    return findChecklists;
  }

  public async findAll(): Promise<Checklist[]> {
    const findChecklists = await this.ormRepository.find();

    return findChecklists;
  }

  public async findByTitle(title: string): Promise<Checklist[] | undefined> {
    const findChecklists = await this.ormRepository.find({
      where: { title },
    });

    return findChecklists;
  }

  public async save(checklist: Checklist): Promise<Checklist> {
    return this.ormRepository.save(checklist);
  }

  public async delete(checklist: Checklist): Promise<void> {
    await this.ormRepository.remove(checklist);
  }
}

export default ChecklistsRepository;
