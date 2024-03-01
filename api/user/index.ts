import axios, { AxiosResponse } from "axios";

import { User } from "@/types/User";

export type PostSigninParams = {
  username: string;
  password: string;
};

export type PostSigninResponse = {
  token: string;
};

export const postSignin = async (
  username: string,
  password: string,
): Promise<AxiosResponse<User>> => {
  try {
    await axios({
      url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: { username, password },
    });

    const response = await getUser(1);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw error;
  }
};

export const getUser = (id: number): Promise<AxiosResponse<User>> => {
  return axios.get(`https://fakestoreapi.com/users/${id}`);
};
