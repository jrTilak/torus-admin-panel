import { sampleUser } from "./data";
import { HandleGetUserServiceReturn } from "./types";

export const handleGetUserService =
  async (): Promise<HandleGetUserServiceReturn> => {
    return sampleUser;
  };

export const handleLoginService = async () => {
  return sampleUser;
};

export const handleLogoutService = async () => {
  return null;
};
