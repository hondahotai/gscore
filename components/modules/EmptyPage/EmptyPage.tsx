import { Close } from "@/components/UI/icons/Close";
import "../../../styles/global.css";
import styles from "./EmptyPage.module.css";
import { useRouter } from "next/navigation";

export const EmptyPage = () => {
  const router = useRouter();
  const handleHomePage = () => {
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.close}>
        <Close />
      </div>
      <div className={styles.title}>No active subscriptions</div>
      <div className={styles.descr}>
        You can subscribe right now by clicking on the button below
      </div>
      <button className="primary" onClick={handleHomePage}>
        Get Gscore
      </button>
    </div>
  );
};
