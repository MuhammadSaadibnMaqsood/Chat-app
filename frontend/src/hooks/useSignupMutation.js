import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api';

const useSignupMutation = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
     mutationFn: signup,
     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
   });
 
}

export default useSignupMutation