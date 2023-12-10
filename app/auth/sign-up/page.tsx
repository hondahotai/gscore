"use client";
import styles from "../../../styles/registration.module.css";
import "../../../styles/global.css";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import endpoints from "@/services/endpoints";
import { ISignUp } from "@/services/types";
import { setToken, setUserName } from "@/state/ducks/user/slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

type Registration = {
  email: string;
  username: string;
  password: string;
  token: string;
};

export default function Registration() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>();
  const router = useRouter();

  const onSubmit = async (data: Registration) => {
    try {
      await endpoints.signUp(data).then((response) => {
        const { username, token } = response.data;
        dispatch(setUserName(username));
        dispatch(setToken(token));
        router.push("/auth/sign-in");
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Create account</div>
      <div className={styles.text}>
        You need to enter your name and email. We will send you a temporary
        password by email
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registration__form}
      >
        <input
          className={styles.registration__input}
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && <p className={styles.error}>{"Error"}</p>}

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
          Send password
        </button>
        <p className={styles.login__text}>
          Have an account?{" "}
          <Link href={"/auth/sign-in"} className={styles.login__link}>
            Go to the next step
          </Link>
        </p>
      </form>
    </div>
  );
}
