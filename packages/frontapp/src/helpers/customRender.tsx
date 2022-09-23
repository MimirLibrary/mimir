import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string | null) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            return;
          }),
      },
    };
  },
}));
const wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper, ...options });
};

export { customRender as render };
