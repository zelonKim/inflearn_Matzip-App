const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
  SETTING: 'Setting',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
  SEARCH_LOCATION: 'searchLocation',
} as const;

const feedNavigations = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
  EDIT_POST: 'EditPost',
  IMAGE_ZOOM: 'ImageZoom',
} as const;

const feedTabNavigations = {
  FEED_HOME: 'FeedTabHome',
  FEED_FAVORITE: 'FeedFavorite',
} as const;

const settingNavigatons = {
  SETTING_HOME: 'SettingHome',
  EDIT_PROFILE: 'EditProfile',
  DELETE_ACCOUNT: 'DeleteAccount',
  EDIT_CATEGORY: 'EditCategory',
} as const;

export {
  mainNavigations,
  authNavigations,
  mapNavigations,
  feedNavigations,
  feedTabNavigations,
  settingNavigatons,
};
