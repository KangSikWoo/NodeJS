// 해당 이메일 존재 에러
export class DuplicateUserEmailError extends Error {
  errorCode = 'U001';

  constructor(reason = '이미 존재하는 이메일입니다.', data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 이메일 또는 비밀번호 불일치 에러
export class InvalidLoginError extends Error {
  errorCode = 'U002';

  constructor(reason = '이메일 또는 비밀번호가 잘못되었습니다.', data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

//   해당 유저 찾기 실패 에러러
export class UserNotFoundError extends Error {
  errorCode = 'U003';

  constructor(reason = '해당 유저를 찾을 수 없습니다.', data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 작성한 리뷰 존재 에러러
export class ReviewAlreadyExistsError extends Error {
  errorCode = 'R001';

  constructor(reason = '이미 작성한 리뷰가 존재합니다.', data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 리뷰 찾기 실패 에러
export class ReviewNotFoundError extends Error {
  errorCode = 'R002';

  constructor(reason = '리뷰를 찾을 수 없습니다.', data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션 종료 에러러
export class MissionNotAvailableError extends Error {
  errorCode = 'M001';

  constructor(reason = '해당 미션은 더 이상 유효하지 않습니다.', data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 해당 미션 존재 여부 에러
export class MissionNotFoundError extends Error {
  errorCode = 'M002';

  constructor(reason = '존재하지 않는 미션입니다.', data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
