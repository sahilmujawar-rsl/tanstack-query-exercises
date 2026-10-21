import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users";
import { recordCreatedUser } from "../api/localChanges";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: async (createdUser) => {
      recordCreatedUser(createdUser);
      queryClient.setQueryData(["users"], (old) => [...(old ?? []), createdUser]);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users"], refetchType: "none" });
    },
  });
}
