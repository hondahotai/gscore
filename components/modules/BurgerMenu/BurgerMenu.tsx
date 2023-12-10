"use client";
import styles from "@/components/modules/BurgerMenu/burgerMenu.module.css";
import { Burger } from "@/components/UI/icons/Burger";
import { useState } from "react";
import { Close } from "@/components/UI/icons/Close";
import Link from "next/link";
import style from "@/components/layout/header/header.module.css";
import { Logo } from "@/components/UI/icons/Logo";
import { Chevron } from "@/components/UI/icons/Chevron";
import { Settings } from "@/components/UI/icons/Settings";
import { Logout } from "@/components/UI/icons/Logout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/rootReducer";
import { clearProducts, logout } from "@/state/ducks/user/slice";
import { useRouter } from "next/navigation";

export const BurgerMenu = () => {
  const [isActive, setActive] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const userName = useSelector((state: RootState) => state.user.userName);
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleMenu = () => {
    setActive(!isActive);
  };
  const handleOpenList = () => {
    setOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout(null));
    dispatch(clearProducts());
    router.push("/auth/sign-in");
    setActive(false);
  };

  return (
    <div className={styles.burger}>
      <div onClick={toggleMenu} className={styles.burger__btn}>
        <Burger />
      </div>

      <div
        className={
          isActive
            ? `${styles.sidemenu} ${styles.sidemenuActive}`
            : `${styles.sidemenu}`
        }
      >
        <div className={styles.heading}>
          <div onClick={toggleMenu}>
            <Close />
          </div>
          <Link className={style.wrapper} href={"/"} onClick={toggleMenu}>
            <Logo />
            <h2 className={style.text}>GSCORE</h2>
          </Link>
        </div>
        <div className={styles.title}>My subscriptions</div>
        <div className={styles.divider}></div>
        <div onClick={handleOpenList} className={styles.menu__list}>
          <p>{token ? `${userName}` : ` `}</p>
          <div
            className={
              isOpen
                ? `${styles.chevron__icon} ${styles.active}`
                : `${styles.chevron__icon}`
            }
          >
            <Chevron />
          </div>
        </div>
        {isOpen && (
          <ul className={styles.navbar}>
            <li className={styles.navbar__item}>
              <Settings />
              <Link
                href={"/settings"}
                className={styles.settings__link}
                onClick={toggleMenu}
              >
                Settings
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Logout />
              <span onClick={handleLogout}>Logout</span>
            </li>
          </ul>
        )}
        <div className={styles.divider}></div>
      </div>
    </div>
  );
};
