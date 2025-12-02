import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { userAuthService } from "../../api/services/auth/user.service";

export const useUpdateUser = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "updateUser",
    async (_, { arg: userData }) => {
      return await userAuthService.updateUser(userData);
    },
    {
      onSuccess: (updatedUser) => {
        if (updatedUser?.id || updatedUser?._id) {
          const userId = updatedUser.id || updatedUser._id;
          mutate(["user", userId]);
        }

        mutate("users");
        mutate((key) => Array.isArray(key) && key[0] === "usersByRole");
      },
    }
  );

  return {
    updateUser: trigger,
    loading: isMutating,
    error,
  };
};
