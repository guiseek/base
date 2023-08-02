import { uuidV4 } from './uuid';

describe('commonUtilData', () => {
  it('uuid', () => {
    expect(uuidV4()).toBeInstanceOf(String);
  });
});
