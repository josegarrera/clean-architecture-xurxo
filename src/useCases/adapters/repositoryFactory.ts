import { IUsersRepository } from '../ports/IUsersRepository';
import { InMemoryUsersRepository } from './inMemoryUsersRepository';
import { FileUsersRepository } from './fileUsersRepository';

export type RepositoryType = 'memory' | 'file';

export function createUsersRepository(type: RepositoryType): IUsersRepository {
  switch (type) {
    case 'file':
      return new FileUsersRepository();
    case 'memory':
    default:
      return new InMemoryUsersRepository();
  }
}

export function getRepositoryTypeFromArgs(): RepositoryType {
  const args = process.argv.slice(2);
  const repoArg = args.find((arg) => arg.startsWith('--repo='));

  if (repoArg) {
    const value = repoArg.split('=')[1];
    if (value === 'file' || value === 'memory') {
      return value;
    }
  }

  return 'memory';
}
