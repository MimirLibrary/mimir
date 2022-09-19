export const transformISBNcode = (code: string) => {
  return code.includes('-') ? code.replaceAll('-', '') : code;
};
