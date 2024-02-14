import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { fetchDevices } from '../http/deviceApi';
import DeviceItem from './DeviceItem';
import { Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const LastList = () => {
  const {device} = useContext(Context);
  const [isLoad, setIsLoad] = useState(false);
  const lastItems = JSON.parse(localStorage.getItem('_last'));
  useEffect(() => {
    fetchDevices(null, null, device.page, 7).then(data => {
      device.setFullDevice(data.rows)
      setIsLoad(true);
    })
  }, [])
  return (
    <div className="">
        <h2>Вы недавно смотрели</h2>
        <div className="last-box">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {
            isLoad == true && lastItems.map(i => {
              const newArrDevice = device.fullDevice.find(o => Number(i) == o.id);
              if(newArrDevice) {
                return <SwiperSlide><DeviceItem key={newArrDevice.id} device={newArrDevice} /></SwiperSlide>
              }
              return null;
            })
          }
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
        </div>
    </div>
  );
}

export default LastList;