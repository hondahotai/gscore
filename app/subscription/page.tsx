"use client";
import styles from "@/styles/subscription.module.css";
import s from "@/styles/checkout.module.css";
import "../../styles/global.css";
import { Basket } from "@/components/UI/icons/Basket";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/state/rootReducer";
export default function Subscription() {
  const products = useSelector((state: RootState) => state.user.products);
  const router = useRouter();
  const handleSubscriptionsPage = () => {
    router.push("/subscriptions");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Start your subscription</div>
      <div className={styles.subtitle}>
        We have sent you a payment receipt by e-mail and a link to download the
        plugin with a license key.
      </div>
      <div className={s.accordion__wrapper}>
        <div className={s.accordion__item}>
          <span>Package name</span>
          <span>Price</span>
        </div>
        <div className={s.divider}></div>
        <div className={s.accordion__price}>
          <span>{products[0].name + ` licence`}</span>
          <div className={s.price__info}>
            <span>{products[0].prices[0].price}</span>
            <Basket />
          </div>
        </div>
      </div>
      <button
        onClick={handleSubscriptionsPage}
        className={`${styles.subscription__btn} primary`}
      >
        Go to my subscriptions
      </button>
    </div>
  );
}
