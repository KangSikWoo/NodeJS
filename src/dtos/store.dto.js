export const bodyToStore = (body) => {
  return {
    store_id: body.store_id,
    store_name: body.store_name,
    store_status: body.store_status,
    location_location_id: body.location_location_id,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      // Express에서 리뷰들의 가장 마지막 ID를 내려줌.
      // 리뷰가 하나도 없다면 페이지네이션이 끝나 더 조화할 리뷰가 없는 상태이므로 null을 내려주게 됨.
      // 이렇게 하면 API를 사용할 때 pagination > cursor 값을 바로 다음 요청에 가져와 사용할 수 있기 때문에 더 좋음.
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
