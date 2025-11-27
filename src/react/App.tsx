import { useEffect, useState } from 'react';
import { InMemoryUsersRepository } from '../useCases/adapters/inMemoryUsersRepository';
import { ListUsers } from '../useCases/listUsers';
import { AddUser } from '../useCases/addUser';
import { DeclarativePresenterImpl } from '../presenter/declarativePresenter';
import { PresenterState } from '../presenter/ports/declarativePresenterInterface';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';

const usersRepository = new InMemoryUsersRepository();
const listUsers = new ListUsers(usersRepository);
const addUser = new AddUser(usersRepository);
const presenter = new DeclarativePresenterImpl(listUsers, addUser);

export function App() {
  const [state, setState] = useState<PresenterState>(presenter.getState());

  useEffect(() => {
    const unsubscribe = presenter.subscribe(setState);
    presenter.loadUsers();
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-neutral-900">User Management System</h1>

        <UserList users={state.users} isLoading={state.isLoading && state.users.length === 0} />

        <UserForm
          onSubmit={(data) => presenter.createUser(data)}
          errors={state.errors}
          successMessage={state.successMessage}
          isLoading={state.isLoading}
        />
      </div>
    </div>
  );
}
