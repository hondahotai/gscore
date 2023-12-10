"use client";
import styles from "../CardsPack/cardPack.module.css";
import { CardItem } from "@/components/modules/CardsPack/CardItem/CardItem";

import { IProduct } from "@/state/ducks/user/types";

type CardItemType = {
  cards: IProduct[];
};

export const CardsPack = ({ cards }: CardItemType) => {
  return (
    <div className={styles.wrapper}>
      {" "}
      {cards &&
        cards.map((card: IProduct) => {
          return <CardItem key={card.id} card={card} />;
        })}
    </div>
  );
};
