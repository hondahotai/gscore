"use client";
import styles from "./TabsDivider.module.css";
import { usePathname } from "next/navigation";
import { any } from "prop-types";

export const TabsDivider = () => {
  let pathName = usePathname();

  const stepsOrder: { [key: string]: number } = {
    "/auth/sign-up": 1,
    "/auth/sign-in": 2,
    "/auth/checkout": 3,
  };

  const currentStep = stepsOrder[pathName] || 0;

  const getClassNameForPath = (path: string) => {
    const stepNumber = stepsOrder[path];
    return stepNumber && stepNumber <= currentStep ? styles.active : "";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.text}>Create account</p>
        <div
          className={`${styles.divider} ${getClassNameForPath(
            "/auth/sign-up",
          )}`}
        ></div>
      </div>
      <div className={styles.inner}>
        <p className={styles.text}>Log in</p>
        <div
          className={`${styles.divider} ${getClassNameForPath(
            "/auth/sign-in",
          )}`}
        ></div>
      </div>
      <div className={styles.inner}>
        <p className={styles.text}>Checkout</p>
        <div
          className={`${styles.divider} ${getClassNameForPath(
            "/auth/checkout",
          )}`}
        ></div>
      </div>
    </div>
  );
};
