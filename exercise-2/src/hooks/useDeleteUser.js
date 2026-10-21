import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/users";
import { recordDeletedUser, revertDeletedUser } from "../api/localChanges";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData(["users"]);

      recordDeletedUser(id);
      queryClient.setQueryData(["users"], (old) =>
        Array.isArray(old) ? old.filter((user) => user.id !== id) : old
      );

      return { previousUsers };
    },
    onError: (error, id, context) => {
      revertDeletedUser(id);

      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users"], refetchType: "none" });
    },
  });
}
