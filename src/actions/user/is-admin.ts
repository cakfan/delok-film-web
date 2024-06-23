import { getMe } from "./get-me";

export const isAdmin = async (): Promise<boolean> => {
  const me = await getMe();

  if (!me) return false;

  const role = me.role === "admin";
  return role;
};
