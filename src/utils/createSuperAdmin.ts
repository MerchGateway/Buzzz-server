

import { User } from 'src/app/users/entities/user.entity';
import * as superadminJson from '../assets/data/supper_admin.json';
import { Role } from 'src/types/general';

const createSuperAdmin = async () => {

  // // get categories
  const parseSuperAdmin = superadminJson as User;
  const superadmin = await User.findOne({where:{
    role:Role.SUPER_ADMIN
  }});
  

  if (!superadmin) {
    const newSuperAdmin = User.create({...parseSuperAdmin, role:Role.SUPER_ADMIN});

    const newlyCreatedAdmin = await User.save(newSuperAdmin);
    console.log(newlyCreatedAdmin);

  }
 
};
export default createSuperAdmin;
