import { User } from '../../../app/users/entities/user.entity';
import { Role } from '../../../types/general';
export const SUPER_ADMIN: Partial<User> = {
  email: 'admin@gmail.com',
  password: 'admin123',
  firstName: 'Dev',
  lastName: 'admin',
  emailVerified: true,
  role: Role.SUPER_ADMIN,
};

export const TEMPORARY_CATEGORIES = [
  { name: 'Category1', description: 'Category 1 description' },
  { name: 'Category2', description: 'Category 2 description' },
  { name: 'Category3', description: 'Category 3 description' },
  { name: 'Category4', description: 'Category 4 description' },
  { name: 'Category5', description: 'Category 5 description' },
  { name: 'Category6', description: 'Category 6 description' },
];
