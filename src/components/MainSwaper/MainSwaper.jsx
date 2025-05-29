import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from "swiper/modules";
import { heroSwiper } from "../../constants/constants"
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
        {
          heroSwiper.map(({ id, imgSrc }) => {
            return (
              <SwiperSlide key={id} className="swiperSlide">
                <img className="swiperImage" src={imgSrc} alt="Furniture image" />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default MainSwiper