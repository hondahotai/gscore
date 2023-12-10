"use client";
import styles from "@/styles/checkout.module.css";
import "../../../styles/global.css";
import { Basket } from "@/components/UI/icons/Basket";
import { useDispatch, useSelector } from "react-redux";
import endpoints from "@/services/endpoints";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "@/state/rootReducer";
import { setSubscribeId } from "@/state/ducks/user/slice";

export default function Checkout() {
  const router = useRouter();

  const products = useSelector((state: RootState) => state.user.products);

  useEffect(() => {
    if (products.length === 0) {
      router.push("/");
    }
  }, [products, router]);

  const productId = products[0].prices[0].productId;
  const subscribeId = useSelector((state: RootState) => state.user.subscribeId);
  const dispatch = useDispatch();

  const handlePurchaseSubscribe = async () => {
    await endpoints.buySubscribe({ priceId: productId }).then(() => {
      router.push("/subscription");
    });
  };

  const handleUpgradeSubscribe = async () => {
    try {
      await endpoints.changeProduct({
        productId: productId,
        subscribeId: subscribeId,
      });
      router.push("/subscriptions");
      dispatch(setSubscribeId(null));
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Checkout</div>
      <div className={styles.accordion__wrapper}>
        <div className={styles.accordion__item}>
          <span>Package name</span>
          <span>Price</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.accordion__price}>
          <span>{products[0].name + ` licence`}</span>
          <div className={styles.price__info}>
            <span>{products[0].prices[0].price}</span>
            <Basket />
          </div>
        </div>
      </div>
      <div className={styles.checkout__info}>
        <span>Total:</span>
        <span>{products[0].prices[0].price}</span>
      </div>
      {subscribeId ? (
        <div>
          <button
            onClick={handleUpgradeSubscribe}
            className={`${styles.checkout__btn} primary`}
          >
            Upgrade
          </button>
          {errorMessage && <p className={styles.error__text}>{errorMessage}</p>}
        </div>
      ) : (
        <button
          onClick={handlePurchaseSubscribe}
          className={`${styles.checkout__btn} primary`}
        >
          Purchase
        </button>
      )}
    </div>
  );
}
