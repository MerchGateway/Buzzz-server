import { User } from 'src/app/users/entities/user.entity';
import * as superAdminJson from '../assets/data/supper_admin.json';
import { Role } from 'src/types/general';

const createSuperAdmin = async () => {
  // get categories
  const parseSuperAdmin = superAdminJson as User;
  const superAdmin = await User.findOne({
    where: {
      role: Role.SUPER_ADMIN,
    },
  });

  if (!superAdmin) {
    const newSuperAdmin = User.create({
      ...parseSuperAdmin,
      role: Role.SUPER_ADMIN,
    });

    const newlyCreatedAdmin = await User.save(newSuperAdmin);
    console.log(newlyCreatedAdmin);
  }
};
export default createSuperAdmin;
