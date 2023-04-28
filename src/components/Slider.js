import React, { useEffect, useState } from "react";
import "../css/Slider.css";

const PageSelector = ({
  currentIndex,
  totalCards,
  setCurrentIndex,
  data,
  setData,
}) => {
  const rows = [];
  for (let index = 0; index < totalCards; index++) {
    rows.push(
      <div
        className={index === currentIndex ? "dot dot-active" : "dot"}
        key={index}
        onClick={() => {
          const change = index - currentIndex;
          if (change > 0) {
            const newArr = [...Array(data.length - change).keys()].map((i) => {
              return { ...data[i + change] };
            });

            for (let i = 0; i < change; i++) {
              newArr.push({ ...data[i] });
            }
            setData(newArr);
          } else if (change < 0) {
            const newArr = [...Array(Math.abs(change)).keys()].map((i) => {
              return { ...data[data.length - Math.abs(change) + i] };
            });

            for (let i = 0; i < data.length - Math.abs(change); i++) {
              newArr.push({ ...data[i] });
            }
            setData(newArr);
          }
          setCurrentIndex(index);
        }}
      ></div>
    );
  }
  return <div>{rows}</div>;
};

const Cards = ({
  currentIndex,
  setCurrentIndex,
  cardsPerPage,
  data,
  setData,
}) => {
  const [tr, setTr] = useState("-100%");
  const [isTicking, setTicking] = useState(false);
  const handleLeftClick = () => {
    setTicking(true);
    setTr("0%");
    const timer = setTimeout(() => {
      const newArr = [{ ...data[data.length - 1] }, ...data];
      newArr.pop();
      setData(newArr);
      if (currentIndex === 0) {
        setCurrentIndex(data.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
      setTicking(false);
      setTr("-100%");
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleRightClick = () => {
    setTicking(true);
    setTr("-200%");
    const timer = setTimeout(() => {
      const newArr = [...data, { ...data[0] }];
      newArr.shift();
      setData(newArr);
      if (currentIndex === data.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
      setTicking(false);
      setTr("-100%");
    }, 500);
    return () => clearTimeout(timer);
  };

  const cards = [];
  for (let index = 0; index < data.length; index++) {
    const cardData = data[index];
    cards.push(
      <div
        className="item-card"
        style={{
          display: "inline-flex",
          width: `${100 / cardsPerPage}%`,
          padding: "10px",
          height: "100%",
          transform: `translateX(${tr})`,
          transition: `${isTicking ? "0.5s ease-in-out" : "none"}`,
        }}
        key={index}
      >
        <div className="data-card">
          <img src={cardData.Poster} alt="poster" />
          <div className="card-title">{cardData.Title}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="item-outer">
      <div
        style={{
          height: "100%",
          width: "100%",
          flexDirection: "row",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {cards}
      </div>
      <button onClick={handleLeftClick} className="arrow-left">
        &lt;
      </button>
      <button onClick={handleRightClick} className="arrow-right">
        &gt;
      </button>
    </div>
  );
};

const Slider = ({ values }) => {
  const [data, setData] = useState(values);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [totalCards, setTotalCards] = useState(data.length);

  useEffect(() => {
    setData(values);
    setTotalCards(values.length);
  },[values]);

  return (
    <div>
      <div className="outer">
        <Cards
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          cardsPerPage={cardsPerPage}
          data={data}
          setData={setData}
        />
        <div className="carousal-dots">
          <PageSelector
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            totalCards={totalCards}
            data={data}
            setData={setData}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span>Number of cards{"\t"}</span>
        <div style={{ display: "flex", padding: "0 5px 0 5px" }}>
          <button
            onClick={() => {
              if (cardsPerPage > 1) {
                setCardsPerPage(cardsPerPage - 1);
              }
            }}
          >
            -
          </button>
          <div style={{ padding: "0 5px 0 5px" }}>{cardsPerPage}</div>
          <button
            onClick={() => {
              if (cardsPerPage < data.length - 2 && cardsPerPage < 10) {
                setCardsPerPage(cardsPerPage + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
