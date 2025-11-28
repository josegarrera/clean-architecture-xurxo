import { RepositoryType } from '../useCases/adapters/repositoryFactory';

export type ViewType = 'cli' | 'react';

export interface AppConfig {
  repository: RepositoryType;
  view: ViewType;
}

function getArgValue(argName: string): string | undefined {
  const args = process.argv.slice(2);
  const arg = args.find((a) => a.startsWith(`--${argName}=`));
  return arg?.split('=')[1];
}

export function getAppConfig(): AppConfig {
  const repoValue = getArgValue('repo');
  const viewValue = getArgValue('view');

  return {
    repository: repoValue === 'file' ? 'file' : 'memory',
    view: viewValue === 'react' ? 'react' : 'cli',
  };
}
