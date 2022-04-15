import { useAppSelector } from './useTypedSelector';

export const useAuth = () => {
  const username = useAppSelector((state) => state.user.username);
  return {
    isAuth: !!username,
  };
};
