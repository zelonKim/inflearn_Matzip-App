const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
};

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
} as const;

export {mainNavigations, authNavigations, mapNavigations};
