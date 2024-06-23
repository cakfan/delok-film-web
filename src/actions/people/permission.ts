import { getMe } from "../user";

export const getPermission = async (roles: string[]): Promise<boolean> => {
  const me = await getMe();

  if (!me) {
    return false;
  }

  const myRole = roles.includes(me.role!);
  return myRole;
};
