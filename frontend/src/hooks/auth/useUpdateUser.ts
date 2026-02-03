import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { userService } from "../../api";
import { SafeUser, UseUpdateUserReturn } from "../../types";

export const useUpdateUser = (): UseUpdateUserReturn => {
  const { trigger, isMutating, error } = useSWRMutation<
    SafeUser,
    Error,
    string,
    SafeUser
  >(
    "updateUser",
    async (_, { arg: userData }: { arg: SafeUser }) => {
      return await userService.updateUser(userData);
    },
    {
      onSuccess: (updatedUser: SafeUser) => {
        if (updatedUser?.id) {
          mutate(["user", updatedUser.id]);
        }

        mutate("users");
        mutate(
          (key: unknown) => Array.isArray(key) && key[0] === "usersByRole"
        );
      },
    }
  );

  return {
    updateUser: trigger,
    loading: isMutating,
    error,
  };
};
