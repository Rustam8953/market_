import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { Context } from '..';
import star from '../assets/star.png';
import {useNavigate} from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className='mt-3'>
            <Card style={{width: 150}} border={'light'}>
                <Image width={150} height={150} src={'http://localhost:3001/' + device.img} />
                <div className="d-flex text-black-50 justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="">{device.rating}</div>
                        <Image width={15} height={15} src={star} />
                    </div>
                </div>
                <div className="" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>{device.name}</div>
            </Card>
        </Col>
    );
}

export default DeviceItem;