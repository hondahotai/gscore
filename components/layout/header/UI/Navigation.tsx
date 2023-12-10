"use client";
import styles from "./navigation.module.css";
import Link from "next/link";
import { Chevron } from "@/components/UI/icons/Chevron";
import { useEffect, useState } from "react";
import { Settings } from "@/components/UI/icons/Settings";
import { Logout } from "@/components/UI/icons/Logout";
import { useDispatch, useSelector } from "react-redux";
import { clearProducts, logout } from "@/state/ducks/user/slice";
import { useRouter } from "next/navigation";
import { RootState } from "@/state/rootReducer";

export const Navigation = () => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const userName = useSelector((state: RootState) => state.user.userName);
  const token = useSelector((state: RootState) => state.user.token);

  if (!token) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout(null));
    dispatch(clearProducts());
    router.push("/auth/sign-in");
  };

  return (
    <nav className={styles.navigation}>
      <Link href={"/subscriptions"} className={styles.subscriptions}>
        My subscriptions
      </Link>
      <div
        onClick={() => {
          setActive(!isActive);
        }}
        className={styles.subscription__chevron}
      >
        {userName}
        <div
          className={
            isActive
              ? `${styles.chevron__icon} ${styles.active}`
              : `${styles.chevron__icon}`
          }
        >
          <Chevron />
        </div>
        {isActive && (
          <ul className={styles.navbar}>
            <li className={styles.navbar__item}>
              <Settings />
              <Link href={"/settings"} className={styles.settings__link}>
                Settings
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Logout />
              <span onClick={handleLogout}>Logout</span>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
