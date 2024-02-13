import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { fetchDevices } from '../http/deviceApi';
import DeviceItem from './DeviceItem';

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
          {
            isLoad == true && lastItems.map(i => {
              const newArrDevice = device.fullDevice.find(o => Number(i) == o.id);
              if(newArrDevice) {
                return <DeviceItem key={newArrDevice.id} device={newArrDevice} />
              }
              return null;
            })
          }
        </div>
    </div>
  );
}

export default LastList;