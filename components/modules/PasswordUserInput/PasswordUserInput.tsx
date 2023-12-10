"use client";
import s from "@/components/modules/PersonalUserInput/PersonalUserInput.module.css";
import styles from "@/styles/registration.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import endpoints from "@/services/endpoints";

interface IFormPassword {
  currentPassword: string;
  newPassword: string;
}

export const PasswordUserInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<IFormPassword>();

  const onSubmit: SubmitHandler<IFormPassword> = async (data) => {
    await endpoints
      .updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      .then(() => {
        reset();
      })
      .catch((e: any) => {
        if (e.response && e.response.status === 400) {
          setError("newPassword", {
            type: "manual",
            message: e.response.data.message,
          });
        }
      });
  };

  return (
    <div>
      <div className={s.title}>Change password</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registration__form}
      >
        <input
          className={styles.registration__input}
          placeholder="Current password"
          {...register("currentPassword", { required: true })}
        />
        {errors.currentPassword && <p className={styles.error}>{"Error"}</p>}
        <input
          className={styles.registration__input}
          placeholder="New password"
          {...register("newPassword", { required: true })}
        />
        {errors.newPassword && <p className={styles.error}>{"Error"}</p>}
        <button className={`${s.personal__btn} primary`}>Save</button>
      </form>
    </div>
  );
};
