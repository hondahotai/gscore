import style from "./header.module.css";
import Link from "next/link";
import { Logo } from "@/components/UI/icons/Logo";
import { Navigation } from "@/components/layout/header/UI/Navigation";
import { BurgerMenu } from "@/components/modules/BurgerMenu/BurgerMenu";

export const Header = () => {
  return (
    <header className={style.header}>
      <Link className={style.wrapper} href={"/"}>
        <Logo />
        <h2 className={style.text}>GSCORE</h2>
      </Link>
      <Navigation />
      <BurgerMenu />
    </header>
  );
};
