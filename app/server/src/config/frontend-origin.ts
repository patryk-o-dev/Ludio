const DEV_FRONTEND_ORIGIN = 'http://localhost:5173';

export const getFrontendOrigin = () => {
  if (process.env.NODE_ENV !== 'production') {
    return DEV_FRONTEND_ORIGIN;
  }

  const frontendOrigin = process.env.FRONTEND_ORIGIN;

  if (!frontendOrigin) {
    throw new Error('Missing FRONTEND_ORIGIN in production');
  }

  return frontendOrigin;
};
