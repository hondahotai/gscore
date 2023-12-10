"use client";
import styles from "@/styles/subscriptions.module.css";
import { MyCards } from "@/components/modules/MyCards/MyCards";
import { ArrowLeft } from "@/components/UI/icons/ArrowLeft";
import { ArrowRight } from "@/components/UI/icons/ArrowRight";
import { Copy } from "@/components/UI/icons/Copy";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import endpoints from "@/services/endpoints";
import { ISelfSubscriptions, SelfSubscriptionType } from "@/services/types";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { number } from "prop-types";
import { tree } from "next/dist/build/templates/app-page";
import { useDispatch } from "react-redux";
import { setSubscribeId } from "@/state/ducks/user/slice";
import { useRouter } from "next/navigation";
import { EmptyPage } from "@/components/modules/EmptyPage/EmptyPage";

type Styles = {
  status: string;
  hold: string;
  active: string;
  inactive: string;
};

export default function Subscriptions() {
  const [subscriptionList, setSubscriptionList] = useState<ISelfSubscriptions>(
    [],
  );
  const [subCount, setSubCount] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const getSelfSubscribes = async () => {
    try {
      const { data } = await endpoints.selfSubscribes();
      setSubscriptionList(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSelfSubscribes();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: true,
    afterChange: (current: number) => setSubCount(current + 1),
  };

  const sliderRef = useRef<any>(null);

  const handleLeftClick = () => {
    sliderRef.current?.slickPrev();
    setShowCodes(true);
  };

  const handleRightClick = () => {
    sliderRef.current?.slickNext();
    setShowCodes(true);
  };

  const cssStyles = styles as Styles;
  const [isShowCodes, setShowCodes] = useState(false);
  const handleShowCodes = () => {
    setShowCodes(!isShowCodes);
  };

  const handleActiveCode = async (code: string, index: number) => {
    try {
      const { data } = await endpoints.activateCode({ code });
      setSubscriptionList((currentList) => {
        const newList = [...currentList];
        newList[subCount - 1].codes = newList[subCount - 1].codes.map((c, i) =>
          i === index ? { ...c, ...data } : c,
        );
        return newList;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckboxClick = (id: number) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleConfirm = async () => {
    try {
      await endpoints.codeManage({
        codesIds: selectedIds,
        subscribeId: subscriptionList[subCount - 1].codes[0].subscribeId,
      });
      await getSelfSubscribes();
      setSelectedIds([]);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  const handleChangeProduct = async () => {
    dispatch(
      setSubscribeId(subscriptionList[subCount - 1].codes[0].subscribeId),
    );
    router.push("/");
  };

  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    const hasHoldStatus = subscriptionList[subCount - 1]?.codes.some(
      (code) => code.status === `HOLD`,
    );
    setDisabled(!hasHoldStatus);
  }, [subscriptionList, subCount]);

  return isLoading ? (
    <div></div>
  ) : subscriptionList.length !== 0 ? (
    <div>
      <div>
        <div className={styles.heading}>
          <div className={styles.title}>My subscriptions</div>
          <button
            className={`${styles.btn} primary`}
            onClick={handleChangeProduct}
          >
            Upgrade
          </button>
        </div>
        <div className={styles.card__wrapper}>
          <Slider {...settings} ref={sliderRef}>
            {subscriptionList?.map(
              (card: SelfSubscriptionType, index: number) => {
                return (
                  <div key={index} className={styles.mySlides}>
                    <MyCards
                      index={index}
                      card={card}
                      activeCard={subCount - 1}
                      handleShowCodes={handleShowCodes}
                    />
                    ;
                  </div>
                );
              },
            )}
          </Slider>
        </div>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            onClick={() => {
              handleLeftClick();
            }}
          >
            <ArrowLeft />
          </button>
          <div className={styles.slideCounts}>
            <span>{subCount}</span>/{subscriptionList.length}
          </div>
          <button
            className={styles.arrow}
            onClick={() => {
              handleRightClick();
            }}
          >
            <ArrowRight />
          </button>
        </div>
        {isShowCodes &&
          subscriptionList[subCount - 1]?.codes.map((codes, index) => {
            return (
              <div key={index} className={styles.accordion}>
                <div className={styles.status__inner}>
                  <label className={styles.custom__checkbox}>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxClick(codes.id)}
                      className={styles.checkbox}
                      disabled={isDisabled}
                    />
                    <span className={styles.checkmark}></span>
                  </label>

                  <div
                    className={`${cssStyles.status} ${styles.status__popup} ${
                      cssStyles[codes.status.toLowerCase() as keyof Styles]
                    }`}
                  >
                    {codes.status}
                  </div>
                </div>

                <div className={styles.accordion__text}>
                  <div>License code</div>
                  <div className={styles.accordion__info}>
                    {codes.code}
                    <button className={styles.copy__btn}>
                      <Copy />
                    </button>
                  </div>
                </div>
                <div className={styles.accordion__text}>
                  <div>Domain</div>
                  <div className={styles.accordion__info_wide}>
                    {subscriptionList[subCount - 1]?.codes[0].origin || ` `}
                  </div>
                </div>
                <div className={styles.accordion__activate}>
                  {codes.status === `INACTIVE` && (
                    <button
                      onClick={() => {
                        handleActiveCode(codes.code, index);
                      }}
                      className={`secondary`}
                    >
                      {" "}
                      activate
                    </button>
                  )}
                </div>
                <div className={styles.accordion__status}>
                  <div>status</div>
                  <div
                    className={`${cssStyles.status} ${
                      cssStyles[codes.status.toLowerCase() as keyof Styles]
                    }`}
                  >
                    {codes.status}
                  </div>
                </div>
              </div>
            );
          })}
        {subscriptionList[subCount - 1]?.codes.some(
          (code) => code.status === `HOLD`,
        ) && (
          <div className={styles.select__wrap}>
            <div className={styles.select__text}>
              Select the domains you want to keep
            </div>
            <button
              onClick={handleConfirm}
              className={`${styles.select__confirm} primary`}
            >
              {" "}
              confirm
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>
      <EmptyPage />
    </div>
  );
}
