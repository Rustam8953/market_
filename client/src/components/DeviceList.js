import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Context } from '..';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
    const {device} = useContext(Context);
    return (
        <div className="d-flex device-box">
            {device.device.map((device) => 
                <DeviceItem key={device.id} device={device} />
            )}
        </div>
    );
})

export default DeviceList;