import { UserDTO } from '../../presenter/ports/declarativePresenterInterface';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User } from 'lucide-react';

interface UserListProps {
  users: UserDTO[];
  isLoading: boolean;
}

export function UserList({ users, isLoading }: UserListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-500">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <p className="text-neutral-500">No users yet. Create one below!</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => (
              <li key={user.id} className="flex items-center gap-3 rounded-md border border-neutral-200 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                  <User className="h-5 w-5 text-neutral-600" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-neutral-500">{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
