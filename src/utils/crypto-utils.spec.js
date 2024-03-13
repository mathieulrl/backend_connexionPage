import {vi, describe, it, beforeEach} from 'vitest'
import { comparePassword, hashPassword, saltRounds } from './crypto-utils';
import bcrypt from 'bcrypt';

vi.mock('bcrypt', () => ({
  default:{
    hash: vi.fn(() => 'hashPassword'),
    compare: vi.fn(() => 'comparePassword')
  }

}));

describe('crypto-utils', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call bcrypt hash', () => {

    // arrange (given)
    const psw = 'password';

    // act (when)
    hashPassword(psw);

    // assert (then)
    expect(bcrypt.hash).toHaveBeenCalledWith(psw, saltRounds);

  });

  it('should compare password', () => {

    // arrange (given)
    const psw = 'password';

    // act (when)
    const hash = hashPassword(psw);
    comparePassword(psw, hash);

    // assert (then)
    expect(bcrypt.compare).toHaveBeenCalledWith(psw, hash);

  });


});

