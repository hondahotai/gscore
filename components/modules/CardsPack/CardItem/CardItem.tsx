"use client";
import styles from "./cardItem.module.css";
import { CheckCircle } from "@/components/UI/icons/CheckCircle";
import "../../../../styles/global.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addProduct } from "@/state/ducks/user/slice";

import { IProduct } from "@/state/ducks/user/types";
import { RootState } from "@/state/rootReducer";

type CardItemType = {
  card: IProduct;
};

export const CardItem = ({ card }: CardItemType) => {
  const { id, sitesCount, prices } = card;

  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleProductSelection = () => {
    dispatch(addProduct(card));
    if (token) {
      router.push("/auth/checkout");
    } else {
      router.push("/auth/sign-up");
    }
  };

  let siteCountText;
  if (sitesCount === 1) {
    siteCountText = `Single site license`;
  } else {
    siteCountText = `All features for ${sitesCount}  sites`;
  }

  const isSpecialCard = id === 2;
  const cardClass = isSpecialCard
    ? `${styles.card} ${styles.active}`
    : styles.card;
  const textClass = isSpecialCard
    ? `${styles.text} ${styles.active}`
    : styles.text;
  const btnClass = isSpecialCard
    ? `secondary`
    : `secondary ${styles.secondaryBlack}`;

  return (
    <div className={cardClass}>
      <p className={styles.cost}>${prices[0].price}</p>
      <h2 className={styles.title}>{sitesCount} Site license</h2>
      <p className={textClass}>
        Get the advanced WordPress plugin <br /> that optimizes content with GSC{" "}
        <br />
        keywords at one low annual price
      </p>
      <div className={styles.divider}></div>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <CheckCircle />
          <span className={styles.list__text}>{siteCountText}</span>
        </li>
        <li className={styles.list__item}>
          <CheckCircle />
          <span className={styles.list__text}>
            Special introductory pricing
          </span>
        </li>
        <li className={styles.list__item}>
          <CheckCircle />
          <span className={styles.list__text}>
            Unlimited Pages and Keywords
          </span>
        </li>
        <li className={styles.list__item}>
          <CheckCircle />
          <span className={styles.list__text}>Billed annually</span>
        </li>
      </ul>
      <button
        type="submit"
        onClick={handleProductSelection}
        className={btnClass}
      >
        Get Gscore
      </button>
    </div>
  );
};
