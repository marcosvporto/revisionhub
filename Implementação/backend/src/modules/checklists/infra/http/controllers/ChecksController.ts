import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCheckService from '@modules/checklists/services/CreateCheckService';
import UpdateCheckService from '@modules/checklists/services/UpdateCheckService';
import ListChecksByChecklistService from '@modules/checklists/services/ListChecksByChecklistService';
import DeleteCheckService from '@modules/checklists/services/DeleteCheckService';

export default class ChecklistController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { text } = req.body;

    const createCheck = await container.resolve(CreateCheckService);

    const check = await createCheck.execute({
      checklist_id: id,
      text,
    });

    return res.json(check);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: creator_id } = req.user;
    const { checkId: check_id } = req.params;
    const { text } = req.body;

    const updateCheck = await container.resolve(UpdateCheckService);

    const check = await updateCheck.execute({
      check_id,
      creator_id,
      text,
    });

    return res.json(check);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const createCheck = await container.resolve(ListChecksByChecklistService);

    const check = await createCheck.execute(id);

    return res.json(check);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { checkId } = req.params;
    const { id: userId } = req.user;

    const deleteCheck = container.resolve(DeleteCheckService);

    await deleteCheck.execute({ checkId, userId });

    return res.send('Checklist successfully deleted');
  }
}
