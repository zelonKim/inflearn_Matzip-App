import { Category } from "@/types/domain";

type UserInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (/^[^\ㄴ@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {  // 정규표현식.test()를 통해 유효성 검증을 수행함.
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(values.password.length >= 8 && values.password.length < 20)) { 
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }
  return errors;
}



function validateLogin(values: UserInformation) {
  return validateUser(values);
}



function validateSignup(values: UserInformation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = (...errors, passwordConfirm: '')
 
  if(values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }
  
  return signupErrors;
}



function validateAddPost(values: {title:string}) {
  const errors = {
    title: '',
    description: ''
  };
  
  if(values.title.trim === '') {
    errors.title = '제목은 1~30자 이내로 입력해주세요'
  }

  return errors;
}



function validateEditProfile(values: {nickname: string}) {
  const errors = {
    nickname: ''
  }

  if(isBlank(values.nickname)) {
    errors.nickname='닉네임을 입력해주세요'
  }

  return errors;

}

function validateCategory(values: Category) {
  const errors = {
    RED: '',
    GREEN:'',
    YELLOW: '',
    BLUE: '',
    PURPLE: ''
  };

  return errors;
}


export {validateLogin, validateSignup, validateAddPost, validateEditProfile, validateCategory};
