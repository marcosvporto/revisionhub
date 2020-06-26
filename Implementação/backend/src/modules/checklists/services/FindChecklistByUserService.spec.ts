import FakeChecklistsRepository from '@modules/checklists/repositories/fakes/FakeChecklistsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateChecklistService from '@modules/checklists/services/CreateChecklistService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FindChecklistByUserService from '@modules/checklists/services/FindChecklistByUserService';
import Checklist from '@modules/checklists/infra/typeorm/entities/CheckList';
import AppError from '@shared/errors/AppError';


describe('FindChecklistByUser', () => {
    it('should be able to find a checklist by user', async () => {
        const fakeChecklistsRepository = new FakeChecklistsRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
          );

        const createChecklist = new CreateChecklistService(
            fakeChecklistsRepository
        );

        const findChecklistByUser = new FindChecklistByUserService(
            fakeChecklistsRepository
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
          });

          const checklist = await createChecklist.execute({
            creator_id: user.id,
            title:'Checklist to be found by user',
        });
        
        const  checklistFound = await findChecklistByUser.execute({
            userId: user.id
        });
        
        expect( checklistFound[0].creator_id ).toStrictEqual(checklist.creator_id);
    })
})