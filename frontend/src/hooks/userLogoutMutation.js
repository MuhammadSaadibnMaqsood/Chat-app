import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../lib/api";

const userLogoutMutation = () => {

    const queryClient = useQueryClient();

  return useMutation({
        mutationFn: logout,
        onSuccess: ()=>{ 
            queryClient.invalidateQueries({queryKey: ["authUser"]})
            
        }
    })

}

export default userLogoutMutation