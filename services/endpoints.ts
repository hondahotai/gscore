import axios from "./axiosInstance";
import {
  IActivateCode,
  IChangeProduct,
  ICodeManage,
  ISelfSubscriptions,
  ISignIn,
  ISignUp,
  ISubscribe,
  IUpdatePassword,
  IUpdatePersonalData,
} from "@/services/types";

const endpoints = {
  signUp: (data: ISignUp) => axios.post<ISignUp>("/users/sign-up", data),
  signIn: (data: ISignIn) => axios.post<ISignIn>("/users/sign-in", data),
  buySubscribe: (data: ISubscribe) =>
    axios.post<ISubscribe>("/payments/buy", data),
  selfSubscribes: () => axios.get<ISelfSubscriptions>("/subscribe/self"),
  codeManage: (data: ICodeManage) =>
    axios.put<ICodeManage>("/code/manage", data),
  activateCode: (data: IActivateCode) => axios.post("/code/activate", data),
  changeProduct: (data: IChangeProduct) =>
    axios.post<IChangeProduct>("/subscribe/change-product", data),
  updatePersonalData: (data: IUpdatePersonalData) =>
    axios.patch<IUpdatePersonalData>("/users", data),
  updatePassword: (data: IUpdatePassword) =>
    axios.patch<IUpdatePassword>("/users/update-password", data),
};

export default endpoints;
