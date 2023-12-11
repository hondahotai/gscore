"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@/styles/registration.module.css";
import "../../../styles/global.css";
import s from "../PersonalUserInput/PersonalUserInput.module.css";
import endpoints from "@/services/endpoints";
import { useDispatch } from "react-redux";
import { setUserName } from "@/state/ducks/user/slice";
import { IGetUserInfo, IUpdatePersonalData } from "@/services/types";
import { useEffect } from "react";
import { emailRegex } from "@/variables/emailValidation";

export const PersonalUserInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdatePersonalData>();

  const getUserInfo = async () => {
    try {
      const { data } = await endpoints.getUserInfo();
      reset({
        username: data.username,
        email: data.email,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IUpdatePersonalData> = async (data) => {
    try {
      await endpoints.updatePersonalData({
        username: data.username,
        email: data.email,
      });
      dispatch(setUserName(data.username));
      reset(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
              value: emailRegex,
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
