import styles from "./myCards.module.css";
import { useSelector } from "react-redux";
import { IProduct } from "@/state/ducks/user/types";
import { ISelfSubscriptions, SelfSubscriptionType } from "@/services/types";

interface MyCardsProps {
  index: number;
  card: SelfSubscriptionType;
  activeCard: number;
  handleShowCodes: () => void;
}

export const MyCards = ({
  index,
  card,
  activeCard,
  handleShowCodes,
}: MyCardsProps) => {
  const cardInfo = card.product.name;
  const cardPrice = card.product.prices[0].price;
  const isActive = index === activeCard;
  return (
    <div
      className={
        isActive
          ? `${styles.container} ${styles.active}`
          : `${styles.container}`
      }
    >
      <div className={styles.heading}>
        <div className={styles.title}>Gscore</div>
        <div className={styles.status}>Active</div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.info}>
        <div>{`${cardInfo} licence`}</div>
        <div>{`${cardPrice} $`}</div>
      </div>
      <div className={styles.desc}>valid until 21.10.2022</div>
      <button
        className={`${styles.btn_card} primary`}
        onClick={handleShowCodes}
      >
        View
      </button>
    </div>
  );
};
