import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateChecklistService from '@modules/checklists/services/CreateChecklistService';
import FindChecklistByUserService from '@modules/checklists/services/FindChecklistByUserService';
import LikeChecklistService from '@modules/checklists/services/LikeChecklistService';
import DeleteChecklistService from '@modules/checklists/services/DeleteChecklistService';
import UpdateChecklistService from '@modules/checklists/services/UpdateChecklistService';
import ListAllChecklists from '@modules/checklists/services/ListAllChecklists';

export default class ChecklistController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { title } = req.body;

    const createChecklist = container.resolve(CreateChecklistService);

    const checklist = await createChecklist.execute({
      creator_id: id,
      title,
    });

    return res.json(checklist);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: checklist_id } = req.params;
    const { id: creator_id } = req.user;
    const { title } = req.body;

    const updateChecklist = container.resolve(UpdateChecklistService);

    const checklist = await updateChecklist.execute({
      checklist_id,
      creator_id,
      title,
    });

    return res.json(checklist);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAllChecklists = container.resolve(ListAllChecklists);

    const foundChecklists = await findAllChecklists.execute();

    return res.json(foundChecklists);
  }

  public async findByUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const findChecklistByUser = container.resolve(FindChecklistByUserService);

    const checklist = await findChecklistByUser.execute({
      userId: id,
    });

    return res.json(checklist);
  }

  public async like(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findChecklistByUser = container.resolve(LikeChecklistService);

    const checklist = await findChecklistByUser.execute(id);

    return res.json(checklist);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: checklistId } = req.params;
    const { id: userId } = req.user;

    const deleteChecklist = container.resolve(DeleteChecklistService);

    await deleteChecklist.execute({ checklistId, userId });

    return res.send('Checklist successfully deleted');
  }
}
