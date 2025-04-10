import { StatusCodes } from 'http-status-codes';
import { bodyToStore } from '../dtos/store.dto.js';
import { storeRegister } from '../services/store.service.js';

export const handleStoreSignUp = async (req, res, next) => {
  console.log('새로운 가게가 추가되었어요!');
  console.log('body:', req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const store = await storeRegister(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};
