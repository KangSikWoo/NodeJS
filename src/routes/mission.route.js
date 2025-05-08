import express from 'express';
import { MissionNotAvailableError, MissionNotFoundError } from '../error.js';

const router = express.Router();

//  특정 미션 확인
router.get('/:id', async (req, res, next) => {
  try {
    const missionId = parseInt(req.params.id);

    // 예시
    const mission = null; // await prisma.mission.findUnique({ where: { id: missionId } });

    if (!mission) {
      throw new MissionNotFoundError(undefined, { missionId });
    }

    if (mission.isExpired) {
      throw new MissionNotAvailableError(undefined, { missionId });
    }

    return res.success({ mission });
  } catch (err) {
    next(err);
  }
});

export default router;
