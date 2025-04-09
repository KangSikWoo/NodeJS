export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    user_id: body.user_id,
    user_name: body.user_name,
    user_sex: body.user_sex,
    user_birth: body.user_birth,
    user_location: body.user_location || '',
    user_phoneNumber: body.user_phoneNumber,
  };
};
