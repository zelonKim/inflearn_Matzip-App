const errorMessages = {
  CANNOT_GET_ADDRESS: '주소를 알 수 없습니다.',
} as const;

const alerts = {
  LOCATION_PERMISSION: {
    TITLE: '위치 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 위치 권한을 허용해 주세요.',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 접근 권한이 필요합니다.',
    DESCRIPTION: '설정 화면에서 사진 권한을 허용해 주세요.',
  },
  NOT_SELECTED_LOCATION: {
    TITLE: '추가할 위치를 선택해주세요.',
    DESCRIPTION: '지도를 길게 누르면 위치가 선택됩니다.',
  },
  DELETE_POST: {
    TITLE: '삭제 하시겠습니까?',
    DESCRIPTION: '피드와 지도에서 모두 삭제됩니다.',
  },
} as const;

export {errorMessages, alerts};
