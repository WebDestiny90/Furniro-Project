import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from "swiper/modules";
import "./MainSwaper.css"
import 'swiper/css';
import 'swiper/css/effect-fade';

const MainSwiper = () => {
  return (
    <div className="sliderContainer">
      <Swiper
        effect={'fade'}
        speed={2500}
        loop={true}
        autoplay={{
          delay: 3300,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        className="swiper"
      >
        <SwiperSlide className="swiperSlide">
          <img className="swiperImage" src="/assets/img/heroimg.png" alt="Furniture image" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img className="swiperImage" src="/assets/img/heroimg2.webp" alt="Furniture image" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img className="swiperImage" src="/assets/img/heroimg3.jpg" alt="Furniture image" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img className="swiperImage" src="/assets/img/heroimg4.png" alt="Furniture image" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img className="swiperImage" src="/assets/img/heroimg5.jpg" alt="Furniture image" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default MainSwiper