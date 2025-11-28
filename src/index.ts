import { spawn } from 'child_process';
import { View } from './view/view';
import { ApiView } from './view/apiView';
import { createUsersRepository } from './useCases/adapters/repositoryFactory';
import { ListUsers } from './useCases/listUsers';
import { AddUser } from './useCases/addUser';
import { Presenter } from './presenter/presenter';
import { ApiPresenter } from './presenter/apiPresenter';
import { getAppConfig } from './config/cliConfig';

const config = getAppConfig();
console.log(`Using ${config.repository} repository, ${config.view} view`);

const usersRepository = createUsersRepository(config.repository);
const listUsers = new ListUsers(usersRepository);
const addUser = new AddUser(usersRepository);

if (config.view === 'react') {
  // Start API server for React to consume
  const apiPresenter = new ApiPresenter(listUsers, addUser);
  const apiView = new ApiView(apiPresenter);
  apiView.start();

  // Start Vite dev server
  console.log('Starting React dev server...');
  const vite = spawn('npx', ['vite'], {
    stdio: 'inherit',
    shell: true,
  });
  vite.on('error', (err) => console.error('Failed to start Vite:', err));
} else {
  const view = new View();
  const presenter = new Presenter(view, listUsers, addUser);
  presenter.init();
}
