import Api from "../common/api";

export interface LoginFormInput {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  email: string;
}

export const login = async (formInput: LoginFormInput) => {
  // try {
  const { data } = await Api.post<LoginResponse, LoginFormInput>({
    url: "/auth/login",
    data: formInput,
  });
  // } catch (err) {
  //   console.log(JSON.stringify(err));
  //   console.log(err.response);
  //   console.log(err.statusCode);
  // }
};
