import { act } from '@testing-library/react';

export const nextTick = async () => {
  await act(
    () =>
      new Promise((res) => {
        setTimeout(() => {
          res();
        }, 0);
      })
  );
};
