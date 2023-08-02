import { randomPassword } from '@base/shared/util';
import { validatePassword } from './validate-password';
import { createPassword } from './create-password';

describe('serverUtil', () => {
  let plainPassword: string;

  beforeEach(() => {
    plainPassword = randomPassword();
  });

  it('should work', async () => {
    const { password } = await createPassword(plainPassword);
    expect(await validatePassword(plainPassword, password)).toBeTruthy();
  });
});
