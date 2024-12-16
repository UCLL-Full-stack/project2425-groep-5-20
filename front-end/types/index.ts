export type User = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
  };

  export type Family = {
    id?: number;
    name?: string;
    familyList?: User[];
    owner?: User;
  }

  export type Role = 'admin' | 'parent' | 'child';