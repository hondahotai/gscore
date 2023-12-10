import axios from "axios";
import style from "../styles/home.module.css";
import Link from "next/link";
import { CardsPack } from "@/components/modules/CardsPack/CardsPack";

export async function generateStaticParams() {
  try {
    const response = await axios.get(
      "https://internship.purrweb.site/api/products",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);

    return [];
  }
}

export default async function Home() {
  const cards = await generateStaticParams();
  return (
    <div className={style.home}>
      <h1 className={style.title}>Get started with Gscore today!</h1>
      <div className={style.wrapper}>
        <CardsPack cards={cards} />
      </div>
      <div className={style.subtitle}>Have more than 10 sites?</div>
      <Link className={style.link} href={"/"}>
        Contact us
      </Link>
    </div>
  );
}
