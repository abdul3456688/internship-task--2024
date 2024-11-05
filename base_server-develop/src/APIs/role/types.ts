// src/features/role/types.ts
export interface IRole {
   
    roleName: string;
  }
  
  export interface IRoleCreate {
    username: string;
    email: string;
    password: string;
    roleName: string;
  }
  
  export interface IRoleUpdate {
    
    roleName?: string; // The new role to assign to the user (optional)
  }

  export interface IRoleDocument extends Document {
    roleName: string;
  }