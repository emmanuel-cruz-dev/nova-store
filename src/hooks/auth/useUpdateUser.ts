import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { userAuthService } from "../../api/services/auth/user.service";
import { User, UseUpdateUserReturn } from "../../types";

export const useUpdateUser = (): UseUpdateUserReturn => {
  const { trigger, isMutating, error } = useSWRMutation<
    User,
    Error,
    string,
    User
  >(
    "updateUser",
    async (_, { arg: userData }: { arg: User }) => {
      return await userAuthService.updateUser(userData);
    },
    {
      onSuccess: (updatedUser: User) => {
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
