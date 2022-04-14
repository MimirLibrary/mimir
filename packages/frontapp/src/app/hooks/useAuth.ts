import {useAppSelector} from "./useTypedSelector";

export const useAuth = () => {
  const username = useAppSelector((state: any) => state.user.username)
  return {
    isAuth: !!username
  }
}
