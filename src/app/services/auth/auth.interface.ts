import { Role } from 'src/app/tool/role.enam';

export interface Auth {
  email: string;
  password: string;
}

export interface AuthInfo {
  role: Role;
}
