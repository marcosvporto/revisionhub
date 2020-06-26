import FakeChecklistsRepository from '../repositories/fakes/FakeChecklistsRepository';
import FakeChecksRepository     from '../repositories/fakes/FakeChecksRepository';
import CreateCheckService       from './CreateCheckService';
import AppError                 from '@shared/errors/AppError';


describe('CreateCheck', () =>{
    it('should be able to create a new check', async ()=> {
        const fakeChecksRepository = new FakeChecksRepository()
        const fakeChecklistsRepository = new FakeChecklistsRepository()
        

        const createChecks = new CreateCheckService(
            fakeChecksRepository,
            fakeChecklistsRepository
        )

        const checklist  = await fakeChecklistsRepository.create({
            creator_id:'1234',
            title:"Testing checks",
        })


        const checks = await createChecks.execute({
            checklist_id: checklist.id,
            text: 'Testing'
        })

        expect(checks).toHaveProperty('id')
    })


    it('should not be able to create a new check', async ()=> {
        const fakeChecksRepository = new FakeChecksRepository()
        const fakeChecklistsRepository = new FakeChecklistsRepository()
        

        const createChecks = new CreateCheckService(
            fakeChecksRepository,
            fakeChecklistsRepository
        )


        await expect(
             createChecks.execute({
                checklist_id:  'Non Existing Checklist',
                text: 'Testing'
             })
        ).rejects.toBeInstanceOf(AppError);
    })
})