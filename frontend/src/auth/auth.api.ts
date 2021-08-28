import Api from "../common/api";

export const login = async (formInput: LoginFormInput) => {
  const { data } = await Api.post<UserAuthResponse, LoginFormInput>({
    url: "/auth/login",
    data: formInput,
  });

  const rest = await Api.get("/collections");
  console.log(rest);
};

export const register = async (registerInput: RegisterFormInput) => {
  const { data } = await Api.post<UserAuthResponse, RegisterFormInput>({
    url: "/auth/register",
    data: registerInput,
  });
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

export interface LoginFormInput {
  email: string;
  password: string;
}

interface UserAuthResponse {
  id: string;
  email: string;
}
