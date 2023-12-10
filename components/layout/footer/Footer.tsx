import style from "./footer.module.css";
import { Logo } from "@/components/UI/icons/Logo";
import Link from "next/link";
import { Facebook } from "@/components/UI/icons/Facebook";
import { Twitter } from "@/components/UI/icons/Twitter";
import { Linkedin } from "@/components/UI/icons/Linkedin";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.divider__wide}></div>
      <div className={style.footer__info}>
        <div className={style.footer__logo}>
          <Logo />
          <h2 className={style.text}>GSCORE</h2>
        </div>
        <p className={style.footer__desc}>
          Ut enim ad minim veniam quis <br /> nostrud exercitation ea commodo
        </p>
      </div>
      <div className={style.divider}></div>
      <div className={style.links}>
        <div className={style.copyright}>
          Copyright © 2022 GScore | All Rights Reserved
          <Link className={style.copyright__links} href={"/"}>
            Cookies |
          </Link>{" "}
          <Link className={style.copyright__links} href={"/"}>
            {" "}
            Privacy Policy
          </Link>
        </div>
        <div className={style.social}>
          <Link href={"/"}>
            <Facebook />
          </Link>
          <Link href={"/"}>
            <Twitter />
          </Link>
          <Link href={"/"}>
            <Linkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
};
