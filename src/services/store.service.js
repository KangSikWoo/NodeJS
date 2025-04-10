import { addStore } from '../repositories/store.repository.js';

export const storeRegister = async (data) => {
  const joinStoreId = await addStore({
    store_id: data.store_id,
    store_name: data.store_name,
    store_status: data.store_status,
    location_location_id: data.location_location_id,
  });

  if (joinStoreId === null) {
    throw new Error('이미 존재하는 가게입니다.');
  }
};
