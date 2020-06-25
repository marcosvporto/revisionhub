import FakeChecklistRepository      from '@modules/checklists/repositories/fakes/FakeChecklistsRepository';
import FakeChecksRepository         from '@modules/checklists/repositories/fakes/FakeChecksRepository';
import ListChecksByChecklistService from './ListChecksByChecklistService';
import AppError                     from '@shared/errors/AppError';


describe('ListChecksByChecklist', () => {

    it('should be able to list checks by checlist with valid ChecklistId', async () => {
        const fakeChecklistRepository = new FakeChecklistRepository();
        const fakeChecksRepository = new FakeChecksRepository();
        
        const ListChecksByChecklist = new ListChecksByChecklistService (
            fakeChecksRepository,
            fakeChecklistRepository
        );
        
        const checklist = await fakeChecklistRepository.create({
            creator_id: '123',
            title: 'this checklist must have its checks listed'
        });

        const checks = [
            await fakeChecksRepository.create({
                checklist_id:checklist.id,
                text:'first check'
            }),
            await fakeChecksRepository.create({
                checklist_id:checklist.id,
                text:'second check'
            }),
            await fakeChecksRepository.create({
                checklist_id:checklist.id,
                text:'third check'
            }),

        ];

        const listedChecks = await ListChecksByChecklist.execute(
            checklist.id
        );

        expect(listedChecks).toStrictEqual(checks);
    });

    it('should not be able to list checks by checlist with invalid ChecklistId', async () => {
        const fakeChecklistRepository = new FakeChecklistRepository();
        const fakeChecksRepository = new FakeChecksRepository();
        
        const ListChecksByChecklist = new ListChecksByChecklistService (
            fakeChecksRepository,
            fakeChecklistRepository
        );
        
        const checklist = await fakeChecklistRepository.create({
            creator_id: '123',
            title: 'this checklist must have its checks listed'
        });

        const checks = [
            await fakeChecksRepository.create({
                checklist_id:checklist.id,
                text:'first check'
            }),
            await fakeChecksRepository.create({
                checklist_id:checklist.id,
                text:'second check'
            }),
            await fakeChecksRepository.create({
                checklist_id:checklist.id,
                text:'third check'
            }),

        ];

        await expect(ListChecksByChecklist.execute(
                        '1'
                    ))
            .rejects
            .toBeInstanceOf(AppError);
    });
   

});
