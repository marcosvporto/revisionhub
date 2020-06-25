import Checklist from '../infra/typeorm/entities/CheckList';
import ICreateChecklistDTO from '../dtos/ICreateChecklistDTO';

export default interface IChecklistsRepository {
  create(data: ICreateChecklistDTO): Promise<Checklist>;
  findAll(): Promise<Checklist[]>;
  find(checklist_id: string): Promise<Checklist | undefined>;
  findByUser(userId: string): Promise<Checklist[]>;
  findByTitle(title: string): Promise<Checklist[] | undefined>;
  save(checklist: Checklist): Promise<Checklist>;
  delete(checklist: Checklist): Promise<void>;
}
