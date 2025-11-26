import { View } from './view/view';
import { InMemoryUsersRepository } from './useCases/adapters/inMemoryUsersRepository';
import { ListUsers } from './useCases/listUsers';
// import { AddUser } from "./useCases/addUser";
import { Presenter } from './presenter/presenter';

const usersRepository = new InMemoryUsersRepository();
const listUser = new ListUsers(usersRepository);
// const addUser = new AddUser(usersRepository);

const view = new View();
const presenter = new Presenter(view, listUser);

presenter.presentWelcome();
presenter.presentUsers();
