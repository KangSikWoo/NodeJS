export const bodyToStore = (body) => {
  return {
    store_id: body.store_id,
    store_name: body.store_name,
    store_status: body.store_status,
    location_location_id: body.location_location_id,
  };
};
