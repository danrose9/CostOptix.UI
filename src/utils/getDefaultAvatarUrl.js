export const getDefaultAvatarUrl = () => {
  let loggedInUser = sessionStorage.getItem('authTokens').name;

  return 'https://ui-avatars.com/api/?name=' + loggedInUser;
};
