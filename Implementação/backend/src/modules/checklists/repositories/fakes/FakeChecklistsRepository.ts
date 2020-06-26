import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';
import ICreateChecklistDTO from '@modules/checklists/dtos/ICreateChecklistDTO';

import { uuid } from 'uuidv4';

import Checklist from '../../infra/typeorm/entities/CheckList';

class FakeChecklistsRepository implements IChecklistsRepository {
  private checklists: Checklist[] = [];

  public async create({
    creator_id,
    title,
  }: ICreateChecklistDTO): Promise<Checklist> {
    const checklist = new Checklist();

    Object.assign(checklist, { id: uuid(), creator_id, title, likes: 0 });

    this.checklists.push(checklist);

    return checklist;
  }

  public async find(checklist_id: string): Promise<Checklist | undefined> {
    const findChecklists = await this.checklists.find(
      checklist => checklist.id === checklist_id,
    );

    return findChecklists;
  }

  public async findAll(): Promise<Checklist[]> {
    return this.checklists;
  }

  public async findByUser(user_id: string): Promise<Checklist[]> {
    const findChecklists = await this.checklists.filter(
      checklist => checklist.creator_id === user_id,
    );

    return findChecklists;
  }

  public async findByTitle(title: string): Promise<Checklist[] | undefined> {
    const findChecklists = await this.checklists.filter(
      checklist => checklist.title === title,
    );

    return findChecklists;
  }

  public async save(checklist: Checklist): Promise<Checklist> {
    const checklistIndex = this.checklists.findIndex(
      iterationChecklist => iterationChecklist.id === checklist.id,
    );

    this.checklists[checklistIndex] = checklist;

    return checklist;
  }

  public async delete(checklist: Checklist): Promise<void> {
    const checklistIndex = this.checklists.findIndex(
      iterationChecklist => iterationChecklist.id === checklist.id,
    );

    this.checklists.splice(checklistIndex, 1);
  }
}

export default FakeChecklistsRepository;
