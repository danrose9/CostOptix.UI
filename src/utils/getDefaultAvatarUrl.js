export const getDefaultAvatarUrl = () => {
  const sessionToken = JSON.parse(sessionStorage.getItem('authTokens'));
  let loggedInUser = sessionToken.name;
  if (!loggedInUser) {
    loggedInUser = 'User';
  }

  return 'https://ui-avatars.com/api/?name=' + loggedInUser;
};
