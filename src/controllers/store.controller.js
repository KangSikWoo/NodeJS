import { StatusCodes } from 'http-status-codes';
import { bodyToStore } from '../dtos/store.dto.js';
import { storeRegister } from '../services/store.service.js';

export const handleStoreSignUp = async (req, res, next) => {
  console.log('새로운 가게가 추가되었어요!');
  console.log('body:', req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const store = await storeRegister(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};

export const handleListStoreReviews = async (req, res, next) => {
  // 해당 가게 ID에 해당하는 리뷰 목록을 DB에서 가져오는 함수
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    // 커서 기반 페이지네이션을 위한 커서값, 문자열로 받아옴으로 parseInt로 변환해줘야 한다.
    typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json(reviews);
};
