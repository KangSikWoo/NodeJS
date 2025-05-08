// import { responseFromUser } from './user.dto';
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from '../repositories/user.repository.js';

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    user_id: data.user_id,
    user_name: data.user_name,
    user_sex: data.user_sex,
    user_birth: data.user_birth,
    user_location: data.user_location,
    user_phoneNumber: data.user_phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error('이미 존재하는 이메일입니다.', data);
  }

  // for (const preference of data.preferences) {
  //   await setPreference(joinUserId, preference);
  // }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  // return responseFromUser({ user, preferences });
};
