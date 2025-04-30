import { prisma } from '../db.config.js';

// User 데이터 삽입
export const addUser = async (data) => {
  // 이미 존재하는 이메일인지 검사사
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }
  // 존재하지 않는다면 user 테이블에 새 유저 데이터 삽입입
  const created = await prisma.user.create({ data: data });
  // 생성된 유저의 id 반환환
  return created.id;
};

// 사용자 정보 얻기 (특정 userId를 가진 유저 정보를 조회)
export const getUser = async (userId) => {
  // 유저가 없으면 자동으로 에러 발생
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑 (주어진 유저가 어떤 음식 카테고리를 선호하는지 관계 테이블에 추가가)
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 특정 유저의 선호 음식 카테고리 목록을 조회회
export const getUserPreferencesByUserId = async (userId) => {
  // userFavorCategory 테이블에서 userId 기준으로 검색
  // foodCategory 테이블과 관계가 연결된 객체(foodCategory)도 함께 가져옴 (like join)
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: 'asc' },
  });

  // 반환 값은 객체 배열
  return preferences;
};
