import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ChecklistsController from '../controllers/ChecklistsController';
import ChecksController from '../controllers/ChecksController';

const checklistsRouter = Router();

const checklistsController = new ChecklistsController();
const checksController = new ChecksController();

/* ======Checklists======= */

checklistsRouter.get('/', checklistsController.findAll);

checklistsRouter.post('/', ensureAuthenticated, checklistsController.create);

checklistsRouter.put('/:id', ensureAuthenticated, checklistsController.update);

checklistsRouter.get(
  '/:id',
  ensureAuthenticated,
  checklistsController.findByUser,
);

checklistsRouter.get('/', ensureAuthenticated, checklistsController.findByUser);

checklistsRouter.patch('/:id', checklistsController.like);

checklistsRouter.delete(
  '/:id',
  ensureAuthenticated,
  checklistsController.delete,
);

/* ======Checks======= */

checklistsRouter.post(
  '/:id/checks',
  ensureAuthenticated,
  checksController.create,
);

checklistsRouter.put(
  '/:id/checks/:checkId',
  ensureAuthenticated,
  checksController.update,
);

checklistsRouter.get('/:id/checks', checksController.list);

checklistsRouter.delete(
  '/:id/checks/:checkId',
  ensureAuthenticated,
  checksController.delete,
);

export default checklistsRouter;
