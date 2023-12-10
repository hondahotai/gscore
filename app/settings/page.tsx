"use client";
import styles from "@/styles/settings.module.css";
import { useState } from "react";
import { PersonalUserInput } from "@/components/modules/PersonalUserInput/PersonalUserInput";
import { PasswordUserInput } from "@/components/modules/PasswordUserInput/PasswordUserInput";
export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (tabName: number) => {
    setActiveTab(tabName);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settings</h2>
      <div className={styles.tabs}>
        <div
          onClick={() => {
            changeTab(0);
          }}
          className={`${activeTab === 0 ? styles.tab__active : `${styles.tab}`}
          `}
        >
          Personal info
        </div>
        <div
          onClick={() => {
            changeTab(1);
          }}
          className={`${activeTab === 1 ? styles.tab__active : `${styles.tab}`}
          `}
        >
          Change password
        </div>
      </div>
      <div className={styles.divider}></div>
      {activeTab === 0 ? <PersonalUserInput /> : <PasswordUserInput />}
    </div>
  );
}
