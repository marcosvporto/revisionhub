import FakeChecklistsRepository from '../repositories/fakes/FakeChecklistsRepository';
import CreateChecklistService from './CreateChecklistService';

describe('CreateChecklist', () => {
  it('should be able to create a new checklist', async () => {
    const fakeChecklistsRepository = new FakeChecklistsRepository();

    const createChecklists = new CreateChecklistService(
      fakeChecklistsRepository,
    );

    const checklists = await createChecklists.execute({
      creator_id: '1234',
      title: 'Testing checks',
    });

    expect(checklists).toHaveProperty('id');
  });
});
