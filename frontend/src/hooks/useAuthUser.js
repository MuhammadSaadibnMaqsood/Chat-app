import { getAuthUser } from '../lib/api';
import { useQuery } from "@tanstack/react-query"; 

const useAuthUser = () => {
  const authData = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    isLoading: authData.isLoading,
    authUser: authData.data?.user
  };
};

export default useAuthUser;
