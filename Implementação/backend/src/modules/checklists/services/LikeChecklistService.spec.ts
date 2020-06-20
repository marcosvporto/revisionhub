import FakeChecklistsRepository from '@modules/checklists/repositories/fakes/FakeChecklistsRepository';
import CreateChecklistService from './CreateChecklistService';
import LikeChecklistService from './LikeChecklistService';

import AppError from '@shared/errors/AppError';


describe('LikeChecklist', () => {
    it('should be able to like a checklist', async () => {
        const fakeChecklistsRepository = new FakeChecklistsRepository();

        const createChecklist = new CreateChecklistService(
            fakeChecklistsRepository
        );

        const likeChecklist = new LikeChecklistService(
            fakeChecklistsRepository
        );

        const checklist = createChecklist.execute({
            creator_id: '456',
            title:'Likable checklist'
        });

        const likesBefore = (await checklist).likes;

        await likeChecklist.execute((await checklist).id);

        expect((await checklist).likes).toBe(likesBefore + 1);

    });

    it('should not be able to like a checklist', async () => {
        const fakeChecklistsRepository = new FakeChecklistsRepository();

        const createChecklist = new CreateChecklistService(
            fakeChecklistsRepository
        );

        const likeChecklist = new LikeChecklistService(
            fakeChecklistsRepository
        );

        const checklist = createChecklist.execute({
            creator_id: '456',
            title:'Likable checklist'
        });

        const likesBefore = (await checklist).likes;


        await expect(likeChecklist.execute('1')).rejects.toBeInstanceOf(AppError);

    });
})