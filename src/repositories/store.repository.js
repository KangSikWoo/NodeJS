import { pool } from '../db.config.js';

// User 데이터 삽입
export const addStore = async (data) => {
  const conn = await pool.getConnection();
  console.log('🔥 addStore로 전달된 data:', data);

  try {
    const [confirm] = await pool.query(`SELECT EXISTS(SELECT 1 FROM store WHERE store_id = ?) as isExistStoreId;`, [data.store_id]);

    if (confirm[0].isExistStoreId) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO store 
        (store_id, store_name, store_point, store_status, location_location_id, store_img) 
        VALUES (?, ?, ?, ?, ?, ?);`,
      [data.store_id, data.store_name, data.store_point, data.store_status, data.location_location_id, data.store_img]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

// 사용자 정보 얻기
export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE store_id = ?;`, [storeId]);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

import { prisma } from '../db.config.js';

export const getAllStoreReviews = async (storeId) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      // prisma에선 populate 기능은 없지만 대신에 include나 select를 사용해 연결된 테이블의 데이터를 가져옴.
      // populate는 다른 컬렉션의 데이터를 참조해서 자동으로 채워주는 기능
      userId: true,
      store: true,
      user: true,
    },
    // 커서 값 넣은 것.
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: 'asc' },
    take: 5,
  });

  return reviews;
};
