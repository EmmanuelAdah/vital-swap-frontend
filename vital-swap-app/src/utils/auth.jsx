export const saveSessionWithTimer = (user, token, hoursToLive = 24) => {
  const expiryTime = Date.now() + hoursToLive * 60 * 60 * 1000;

  const sessionData = {
    id: user._id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`.trim(),
    token: token,
    expiry: expiryTime
  };

  localStorage.setItem('user_session', JSON.stringify(sessionData));
};

export const getSession = () => {
  try {
    const sessionStr = localStorage.getItem('user_session');
    if (!sessionStr) return null;

    const session = JSON.parse(sessionStr);

    if (Date.now() > session.expiry) {
      clearSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error parsing session:', error);
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem('user_session');
};

export default {saveSessionWithTimer, getSession, clearSession};