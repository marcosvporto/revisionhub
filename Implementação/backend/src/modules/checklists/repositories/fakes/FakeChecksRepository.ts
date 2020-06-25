import IChecksRepository from '../IChecksRepository'
import ICreateCheckDTO from '../../dtos/ICreateCheckDTO';

import { uuid } from 'uuidv4'

import Check from '../../infra/typeorm/entities/Check'
import checklistsRouter from '@modules/checklists/infra/http/routes/checklists.routes';

class FakeChecksRepository implements IChecksRepository {

    private checks: Check[] = [];

    public async create({
        checklist_id,
        text,
    }: ICreateCheckDTO): Promise<Check> {

        const check = new Check();

        Object.assign(check, { id: uuid(), checklist_id, text });

        this.checks.push(check);

        return check;
    }

    public async find(checkId: string): Promise<Check |undefined> {
        const findChecks = await this.checks.find(
            check => check.id === checkId
        )

        return findChecks
    }

    public async findByChecklist(checklistId: string): Promise<Check[] > {
        const findChecks = await this.checks.filter(
            check => check.checklist_id === checklistId
        )

        return findChecks
    }

    public async save(check: Check): Promise<Check> {
        const checkIndex = this.checks.findIndex(
            iterationCheck => iterationCheck.id === check.id
        )

        this.checks[checkIndex] = check 

        return check
    }

    public async delete(check: Check): Promise<void>{
        const checkIndex = this.checks.findIndex(
            iterationCheck => iterationCheck.id === check.id

        )

        this.checks.splice(checkIndex, 1)
    }

}

export default FakeChecksRepository;