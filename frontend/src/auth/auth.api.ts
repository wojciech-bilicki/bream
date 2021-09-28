import Api from "../common/api";

export const login = async (formInput: LoginFormInput) => {
  const { data } = await Api.post<UserData, LoginFormInput>({
    url: "/auth/login",
    data: formInput,
  });

  return data;
};

export const register = async (registerInput: RegisterFormInput) => {
  const { data } = await Api.post<UserData, RegisterFormInput>({
    url: "/auth/register",
    data: registerInput,
  });
};

export const verify = async () => {
  const { data } = await Api.get<UserData>("/auth/verify");
  return data;
};

export const logout = async () => {
  const { data } = await Api.post({ url: "/auth/logout" });
};

export interface RegisterFormInput {
  email: string;
  countryCode: string | null;
  name: string;
  surname: string;
  displayName: string;
  password: string;
  subscribedToNewsletter: boolean;
  termsAccepted: boolean;
}

export type UserData = Omit<RegisterFormInput, "termsAccepted">;

export interface LoginFormInput {
  email: string;
  password: string;
}
