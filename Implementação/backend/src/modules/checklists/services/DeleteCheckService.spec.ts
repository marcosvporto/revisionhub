import FakeChecklistsRepository from '../repositories/fakes/FakeChecklistsRepository';
import FakeChecksRepository from '../repositories/fakes/FakeChecksRepository';

import DeleteCheckService from './DeleteCheckService';
import CreateCheckService from './CreateCheckService';
import CreateChecklistService from './CreateChecklistService';

import AppError from '@shared/errors/AppError'

describe('DeleteCheck', () => {
    it('should be able to delete a Check', async () => {
        const fakeChecklistsRepository = new FakeChecklistsRepository();
        const fakeChecksRepository = new FakeChecksRepository();

        const createChecks = new CreateCheckService(
            fakeChecksRepository,
            fakeChecklistsRepository
        );

        const deleteCheck = new DeleteCheckService(
            fakeChecksRepository,
            fakeChecklistsRepository
        );
        const checklist = await fakeChecklistsRepository.create({
            creator_id:'1234',
            title:"Testing Checks Deleting"
        });

        const check = await createChecks.execute({
            checklist_id:checklist.id,
            text: 'This check must be deleted'
        });
        
        await deleteCheck.execute({
            checkId:check.id,
            userId:checklist.creator_id
        });

        const findCheck = await fakeChecksRepository.find(check.id);

        expect(findCheck).toBeUndefined();

    });

    it('should not be able to delete a check with an invalid userId', async () => {
        const fakeChecklistsRepository = new FakeChecklistsRepository();
        const fakeChecksRepository = new FakeChecksRepository();

        const createChecks = new CreateCheckService(
            fakeChecksRepository,
            fakeChecklistsRepository
        );

        const deleteCheck = new DeleteCheckService(
            fakeChecksRepository,
            fakeChecklistsRepository
        );
        const checklist = await fakeChecklistsRepository.create({
            creator_id:'1234',
            title:"Testing Checks Deleting"
        });

        const check = await createChecks.execute({
            checklist_id:checklist.id,
            text: 'This check must be deleted'
        });
        
        await expect(deleteCheck.execute({
            checkId:check.id,
            userId:'0'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to delete a check with an invalid chekId', async () => {
        const fakeChecklistsRepository = new FakeChecklistsRepository();
        const fakeChecksRepository = new FakeChecksRepository();

        const createChecks = new CreateCheckService(
            fakeChecksRepository,
            fakeChecklistsRepository
        );

        const deleteCheck = new DeleteCheckService(
            fakeChecksRepository,
            fakeChecklistsRepository
        );
        const checklist = await fakeChecklistsRepository.create({
            creator_id:'1234',
            title:"Testing Checks Deleting"
        });

        const check = await createChecks.execute({
            checklist_id:checklist.id,
            text: 'This check must be deleted'
        });
        
        await expect(deleteCheck.execute({
            checkId:'2',
            userId:checklist.creator_id
        })).rejects.toBeInstanceOf(AppError);
    });

    
});