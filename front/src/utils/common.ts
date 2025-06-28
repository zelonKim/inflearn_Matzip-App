import {ForwardedRef} from 'react';

function mergeRefs(...refs: ForwardedRef<T>[]) {
  // 부모 컴포넌트와 자식 컴포넌트의 참조객체를 모두 사용할 수 있도록 해줌.
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

export {mergeRefs};
