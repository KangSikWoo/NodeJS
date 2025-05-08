import express from 'express';
import { DuplicateUserEmailError, InvalidLoginError } from '../error.js';
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { email } = req.body;
    // 예시
    const exists = false;
    if (exists) throw new DuplicateUserEmailError(undefined, { email });
    res.success({ message: '회원가입 성공' });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 예시
    const isValid = false;
    if (!isValid) throw new InvalidLoginError(undefined, { email });
    res.success({ message: '로그인 성공' });
  } catch (err) {
    next(err);
  }
});

export default router;
