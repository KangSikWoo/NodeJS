import express from 'express';
import { ReviewAlreadyExistsError, ReviewNotFoundError } from '../error.js';

const router = express.Router();

// 리뷰 작성
router.post('/', async (req, res, next) => {
  try {
    const { userId, storeId } = req.body;

    // 예시
    const existingReview = false; // await prisma.review.findFirst({ where: { userId, storeId } });

    if (existingReview) {
      throw new ReviewAlreadyExistsError(undefined, { userId, storeId });
    }

    return res.success({ message: '리뷰 작성 완료' });
  } catch (err) {
    next(err);
  }
});

// 리뷰 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const reviewId = parseInt(req.params.id);

    const review = null; // await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) {
      throw new ReviewNotFoundError(undefined, { reviewId });
    }

    return res.success({ review });
  } catch (err) {
    next(err);
  }
});

export default router;
