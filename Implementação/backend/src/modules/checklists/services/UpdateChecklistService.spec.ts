import FakeChecklistRepository from '@modules/checklists/repositories/fakes/FakeChecklistsRepository'; 
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService'
import CreateChecklistService from './CreateChecklistService';
import UpdateChecklistService from './UpdateChecklistService';
import AppError from '@shared/errors/AppError';


describe('UpdateChecklist', () => {
    it('should be able to update a checklist with valid params', async () => {

        const fakeChecklistRepository   = new FakeChecklistRepository();
        const fakeUsersRepository       = new FakeUsersRepository();
        const fakeHashProvider          = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository
        );

        const updateChecklist = new UpdateChecklistService(
            fakeChecklistRepository
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const checklist = await createChecklist.execute({
            creator_id:user.id,
            title:"This checklist must be updated"
        });

        const updatedChecklist = await updateChecklist.execute({
            creator_id: user.id,
            checklist_id: checklist.id,
            title:"This checklist has been updated"

        });
        
        const expectedUpdatedChecklist = await fakeChecklistRepository.find(checklist.id);

    
        expect(updatedChecklist).toStrictEqual(expectedUpdatedChecklist);


    });

    it('should not be able to update a checklist with invalid creator_id', async () => {

        const fakeChecklistRepository   = new FakeChecklistRepository();
        const fakeUsersRepository       = new FakeUsersRepository();
        const fakeHashProvider          = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository
        );

        const updateChecklist = new UpdateChecklistService(
            fakeChecklistRepository
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const checklist = await createChecklist.execute({
            creator_id:user.id,
            title:"This checklist must be updated"
        });

        
        
        await expect(
            updateChecklist.execute({
                creator_id: '1',
                checklist_id: checklist.id,
                title:"This checklist has been updated"
            })
            
        ).rejects.toBeInstanceOf(AppError);


    });

    it('should not be able to update a checklist with invalid checklist_id', async () => {

        const fakeChecklistRepository   = new FakeChecklistRepository();
        const fakeUsersRepository       = new FakeUsersRepository();
        const fakeHashProvider          = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository
        );

        const updateChecklist = new UpdateChecklistService(
            fakeChecklistRepository
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const checklist = await createChecklist.execute({
            creator_id:user.id,
            title:"This checklist must be updated"
        });

        
        
        await expect(
            updateChecklist.execute({
                creator_id: user.id,
                checklist_id: '1',
                title:"This checklist has been updated"
            })
            
        ).rejects.toBeInstanceOf(AppError);


    });
} );