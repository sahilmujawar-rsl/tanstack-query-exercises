import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import { applyLocalChanges } from "../api/localChanges";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => applyLocalChanges(await fetchUsers()),
  });
}
