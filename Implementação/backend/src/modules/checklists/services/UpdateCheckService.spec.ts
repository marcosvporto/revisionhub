import FakeChecklistRepository from '@modules/checklists/repositories/fakes/FakeChecklistsRepository'; 
import FakeChecksRepository from '@modules/checklists/repositories/fakes/FakeChecksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService'
import CreateCheckService from './CreateCheckService';
import CreateChecklistService from './CreateChecklistService';
import UpdateCheckService from './UpdateCheckService';
import AppError from '@shared/errors/AppError';


describe('UpdateCheck', () => {
    it('should be able to update a check with valid params', async () => {

        const fakeChecklistRepository   = new FakeChecklistRepository();
        const fakeChecksRepository      = new FakeChecksRepository();
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );
        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository
        );
        const createCheck = new CreateCheckService(
            fakeChecksRepository,
            fakeChecklistRepository
        );
        const updateCheck = new UpdateCheckService(
            fakeChecksRepository,
            fakeChecklistRepository
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const checklist = await createChecklist.execute({
            creator_id: user.id,
            title:'one of its checks must be updated',

        });

        const checks = [
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must not be updated'
            }),
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must be updated'
            }),
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must not be updated'
            }),
        ];

        const updatedCheck = await updateCheck.execute({
            check_id: checks[1].id,
            creator_id: user.id,
            text:'this check has been updated'
        });

        const expectedUpdatedCheck = await fakeChecksRepository.find(checks[1].id);

        //console.log(expectedUpdatedCheck);


        expect(updatedCheck).toStrictEqual(expectedUpdatedCheck);
        
    });


    it('should not be able to update a check with invalid check_id', async () => {

        const fakeChecklistRepository   = new FakeChecklistRepository();
        const fakeChecksRepository      = new FakeChecksRepository();
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );
        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository
        );
        const createCheck = new CreateCheckService(
            fakeChecksRepository,
            fakeChecklistRepository
        );
        const updateCheck = new UpdateCheckService(
            fakeChecksRepository,
            fakeChecklistRepository
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const checklist = await createChecklist.execute({
            creator_id: user.id,
            title:'one of its checks must be updated',

        });

        const checks = [
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must not be updated'
            }),
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must be updated'
            }),
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must not be updated'
            }),
        ];

        await expect(
                updateCheck.execute({
                    check_id: '1',
                    creator_id: user.id,
                    text:'this check have been updated'
                })
            )
        .rejects.toBeInstanceOf(AppError);
        
    });

    it('should not be able to update a check with invalid creator_id', async () => {

        const fakeChecklistRepository   = new FakeChecklistRepository();
        const fakeChecksRepository      = new FakeChecksRepository();
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );
        const createChecklist = new CreateChecklistService(
            fakeChecklistRepository
        );
        const createCheck = new CreateCheckService(
            fakeChecksRepository,
            fakeChecklistRepository
        );
        const updateCheck = new UpdateCheckService(
            fakeChecksRepository,
            fakeChecklistRepository
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const checklist = await createChecklist.execute({
            creator_id: user.id,
            title:'one of its checks must be updated',

        });

        const checks = [
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must not be updated'
            }),
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must be updated'
            }),
            await createCheck.execute({
                checklist_id:checklist.id,
                text:'this check must not be updated'
            }),
        ];

        await expect(
                updateCheck.execute({
                    check_id: checks[1].id,
                    creator_id: '1',
                    text:'this check have been updated'
                })
            )
        .rejects.toBeInstanceOf(AppError);
        
    });
})