export const getUserSubFromToken = (idToken: string): string => {
  if (!idToken) {
    return null;
  }
  const bufB64 = Buffer.from(idToken.split('.')[1], 'base64');
  return JSON.parse(bufB64.toString())?.sub;
};
