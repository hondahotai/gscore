"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@/styles/registration.module.css";
import "../../../styles/global.css";
import s from "../PersonalUserInput/PersonalUserInput.module.css";
import endpoints from "@/services/endpoints";
import { useDispatch } from "react-redux";
import { setUserName } from "@/state/ducks/user/slice";
import { IUpdatePersonalData } from "@/services/types";

export const PersonalUserInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdatePersonalData>();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IUpdatePersonalData> = async (data) => {
    await endpoints
      .updatePersonalData({
        username: data.username,
        email: data.email,
      })
      .then(() => {
        dispatch(setUserName(data.username));
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={s.title}>Personal Info</div>
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
        {errors.email && (
          <p className={styles.error}>{`${errors.email.message}`}</p>
        )}
        <button className={`${s.personal__btn} primary`}>Save</button>
      </form>
    </div>
  );
};
