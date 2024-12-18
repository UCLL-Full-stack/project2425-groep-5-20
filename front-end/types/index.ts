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

export type Item = {
  id?: number,
  name?: string,
  quantity?: number
}

export type ShoppingList = {
  id?: number;
  name?: string;
  creationDate?: string,
  lastUpdate?: string,
  updatedBy?: User,
  items?: Item[]
}

  export type Role = 'admin' | 'parent' | 'child';