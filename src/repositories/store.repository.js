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
