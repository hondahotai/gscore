"use client";

import styles from "@/styles/registration.module.css";
import stylesLogin from "@/styles/login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import endpoints from "@/services/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setToken, setUserName } from "@/state/ducks/user/slice";
import { RootState } from "@/state/rootReducer";
import { ISignIn, User } from "@/services/types";

interface ILoginInputs {
  email: string;
  password: string;
  token: string;
  user: User;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>();
  const dispatch = useDispatch();
  const router = useRouter();
  const productList = useSelector((state: RootState) => state.user.products);

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    try {
      await endpoints.signIn(data).then((response) => {
        dispatch(setToken(response.data.token));
        dispatch(setUserName(response.data.user.username));
      });
      if (productList.length === 0) {
        router.push("/");
      } else {
        router.push("/auth/checkout");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className={stylesLogin.wrapper}>
      <div className={stylesLogin.login__title}>Log in</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registration__form}
      >
        <input
          className={styles.registration__input}
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className={styles.error}>{"Error"}</p>}

        <input
          className={styles.registration__input}
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className={styles.error}>{"Error"}</p>}
        <button className={`${styles.registration__btn} primary`} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
