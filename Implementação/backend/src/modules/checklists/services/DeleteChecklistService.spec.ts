import FakeChecklistRepository from '../repositories/fakes/FakeChecklistsRepository'
import DeleteChecklistService from './DeleteChecklistService'
import CreateChecklistService from './CreateChecklistService';
import AppError from '@shared/errors/AppError';

describe('DeleteChecklist', () => {
    it('should be able to delete a Checklist', async () => {
        const fakeChecklistRepository = new FakeChecklistRepository();

        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository,
        );
        const deleteChecklist = new DeleteChecklistService(
            fakeChecklistRepository,
        );

        const checklist = await createChecklist.execute({
            creator_id: '456',
            title:'Checklist to be deleted',
        });

        await deleteChecklist.execute({
            checklistId:checklist.id,
            userId:checklist.creator_id
        });

        const findChecklist = await fakeChecklistRepository.find(checklist.id);
        
        expect(findChecklist).toBeUndefined();
    });


    it('should not be able to delete a checklist with an invalid userId', async () => {

        const fakeChecklistRepository = new FakeChecklistRepository();

        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository,
        );
        const deleteChecklist = new DeleteChecklistService(
            fakeChecklistRepository,
        );

        const checklist = await createChecklist.execute({
            creator_id: '456',
            title:'Checklist to be deleted',
        });

     
        await expect(deleteChecklist.execute({
            checklistId:checklist.id,
            userId:'12'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to delete a checklist with an invalid checklistId', async () => {

        const fakeChecklistRepository = new FakeChecklistRepository();

        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository,
        );
        const deleteChecklist = new DeleteChecklistService(
            fakeChecklistRepository,
        );

        const checklist = await createChecklist.execute({
            creator_id: '456',
            title:'Checklist to be deleted',
        });

         

        //const findChecklist = await fakeChecklistRepository.find(checklist.id);
        
        await expect(deleteChecklist.execute({
            checklistId:'8',
            userId:checklist.creator_id
        })).rejects.toBeInstanceOf(AppError);

    });

});
