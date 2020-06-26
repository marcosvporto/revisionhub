import FakeChecklistRepository from '@modules/checklists/repositories/fakes/FakeChecklistsRepository';
import CreateChecklistService from './CreateChecklistService';
import ListAllChecklists from './ListAllChecklists';
import FakeChecklistsRepository from '@modules/checklists/repositories/fakes/FakeChecklistsRepository';


describe('ListAllChecklists', () => {
    it('should be able to list all the checklists', async () => {
        const fakeChecklistRepository = new FakeChecklistRepository();

        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository,
        );

        const listAll = new ListAllChecklists(
            fakeChecklistRepository
        );

        const checklists = [ 
            await createChecklist.execute({
                creator_id: '123',
                title: 'first checklist'
            }),
            await createChecklist.execute({
                creator_id:'465',
                title:'second checklist'
            }),
            await createChecklist.execute({
                creator_id:'789',
                title:'third checklist'
            })
        ];

        const listedChecklists = await listAll.execute();

        console.log(listedChecklists);
        //expect(listedChecklists).toHaveLength(checklists.length);

        expect(listedChecklists).toStrictEqual(checklists);
    })
})