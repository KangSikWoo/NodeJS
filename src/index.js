import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { handleUserSignUp } from './controllers/user.controller.js';
import { userRouter } from './routes/user.route.js';
import { reviewRouter } from './routes/review.route.js';
import { missionRouter } from './routes/mission.route.js';
//  response.middleware.js에서 보낸 함수에 이름이 없어도 import할 때 이름을 지어주면 됨.
import { responseHandler } from './middlewares/response.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(responseHandler); // res.success, res.error 함수 등록

app.use('/user', userRouter);
app.use('/review', reviewRouter);
app.use('/mission', missionRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/v1/users/signup', handleUserSignUp);

// 에러 핸들링 미들웨어, 던져진 에러를 잡고 포멧에 맞게 응답
app.use((err, req, res, next) => {
  if (err.errorCode) {
    return res.error({
      errorCode: err.errorCode,
      reason: err.reason,
      data: err.data,
    });
  }

  console.error(err);
  return res.error({ errorCode: 'S000', reason: '서버 내부 오류' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
