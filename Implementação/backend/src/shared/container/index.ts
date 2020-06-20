import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IChecklistsRepository from '@modules/checklists/repositories/IChecklistsRepository';
import ChecklistsRepository from '@modules/checklists/infra/typeorm/repositories/ChecklistsRepository';

import IChecksRepository from '@modules/checklists/repositories/IChecksRepository';
import ChecksRepository from '@modules/checklists/infra/typeorm/repositories/ChecksRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IChecklistsRepository>(
  'ChecklistsRepository',
  ChecklistsRepository,
);

container.registerSingleton<IChecksRepository>(
  'ChecksRepository',
  ChecksRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
