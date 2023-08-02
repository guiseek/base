import { hash, genSalt } from 'bcrypt';

export const createPassword = async (plain: string, salt?: string) => {
  if (!salt) salt = await genSalt();
  return { salt, password: await hash(plain, salt) };
};
