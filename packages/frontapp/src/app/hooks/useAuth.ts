import { useAppSelector } from './useTypedSelector';

export const useAuth = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return {
    isAuth,
  };
};
