import { useRef, useState, useEffect } from "react";
import "./Inspiration.css";
import { inspirationSlider } from "../../constants/constants";

const timeRunning = 3000;
const timeAutoNext = 7000;

const Inspiration = () => {
  const [slideList, setSlideList] = useState(inspirationSlider);
  const runningTimeRef = useRef(null);
  const animTimeoutRef = useRef();
  const autoNextRef = useRef();

  useEffect(() => {
    if (runningTimeRef.current) {
      runningTimeRef.current.style.animation = "none";
      runningTimeRef.current.offsetHeight;
      runningTimeRef.current.style.animation = null;
      runningTimeRef.current.style.animation = `runningTime 7s linear 1 forwards`;
    }
  }, [slideList]);

  useEffect(() => {
    autoNextRef.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => clearTimeout(autoNextRef.current);
  }, [slideList]);

  function showSlider(type) {
    let newList = [...slideList];
    if (type === "next") {
      newList.push(newList.shift());
    } else {
      newList.unshift(newList.pop());
    }
    setSlideList(newList);

    clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => {
    }, timeRunning);
  }

  return (
    <section className="inspiration">
      <div className="carousel">
        <div className="list">
          {slideList.map(({ id, imgSrc, title, name, des }) => (
            <div className="item" key={id} style={{ backgroundImage: `url(${imgSrc})` }}>
              <div className="content">
                <div className="title">{title}</div>
                <div className="name">{name}</div>
                <div className="des">
                  {des}
                </div>
                <div className="btn">
                  <button className="color_white">Explore More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button className="prev" onClick={() => showSlider("prev")}>&#60;</button>
          <button className="next" onClick={() => showSlider("next")}>&#62;</button>
        </div>
        <div className="timeRunning" ref={runningTimeRef}></div>
      </div>
    </section>
  );
};

export default Inspiration;