// stores/roleStore.ts
import { create } from 'zustand';



interface RoleStore {
  roles: Array<any>;
  setRoles: (roles: any[]) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  roles: [],
  setRoles: (roles) => set({ roles }),
}));





