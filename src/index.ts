import { View } from './view/view';
import { createUsersRepository, getRepositoryTypeFromArgs } from './useCases/adapters/repositoryFactory';
import { ListUsers } from './useCases/listUsers';
import { AddUser } from './useCases/addUser';
import { Presenter } from './presenter/presenter';

const repoType = getRepositoryTypeFromArgs();
console.log(`Using ${repoType} repository`);

const usersRepository = createUsersRepository(repoType);
const listUser = new ListUsers(usersRepository);
const addUser = new AddUser(usersRepository);

const view = new View();
const presenter = new Presenter(view, listUser, addUser);
presenter.init();
