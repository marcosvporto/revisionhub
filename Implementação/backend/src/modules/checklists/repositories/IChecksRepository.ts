import { create } from 'handlebars';
import Check from '../infra/typeorm/entities/Check';
import ICreateCheckDTO from '../dtos/ICreateCheckDTO';

export default interface IChecksRepository {
  create(data: ICreateCheckDTO): Promise<Check>;
  find(checkId: string): Promise<Check | undefined>;
  findByChecklist(checklistId: string): Promise<Check[]>;
  delete(check: Check): Promise<void>;
  save(check: Check): Promise<Check>;
}
