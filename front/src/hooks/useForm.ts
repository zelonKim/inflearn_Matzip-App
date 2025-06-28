import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => Record<keyof T, string>; // Record<키타입, 밸류타입>: 해당 키타입과 밸류타입을 갖는 객체타입
} // keyof T: 객체 T의 모든 키

function useForm<T>({initialValues, validate}: UseFormProps<T>) {
  // 커스텀 훅
  const [values, setValues] = useState(initialValues);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeText = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text, // 해당 키에 대해 입력한 내용이 values 상태와 합쳐짐.
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true, // 해당 키와 true 밸류가 touched 상태와 합쳐짐.
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name]; // 해당 키에 대한 밸류를 가져옴.
    const onChangeText = (text: string) => handleChangeText(name, text); // 사용자가 입력한 내용이 text 매개변수에 담김.
    const onBlur = () => handleBlur(name);
    return {value, onChangeText, onBlur};
  };

  useEffect(() => {
    const newErrors = validate(values); // values에 대해 유효성 검증을 수행함.
    setErrors(newErrors);
  }, [validate, values]);

  return {values, errors, touched, getTextInputProps};
}
export default useForm;
