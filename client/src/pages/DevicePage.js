import React, { useContext, useEffect, useState } from 'react';
import { Container, Col, Image, Row, Card, Button } from 'react-bootstrap';
import BigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceApi';
import '../assets/style/device.css';
import { Context } from '..';

const DevicePage = () => {
  const [device, setDevice] = useState({info: []});
  const {deviceNode} = useContext(Context);
  const {id} = useParams();
  const getLocal = localStorage.getItem('_last');
  
  let lastList = [];
  lastList.push(Number(id));

  if(getLocal) JSON.parse(getLocal).forEach(i => lastList.push(i));
  else localStorage.setItem('_last', '');
  
  const newArr = lastList.reduce((a, b) => {
    if (!a.includes(b)) a.push(b);
    return a;
  }, [])
  localStorage.setItem('_last', JSON.stringify(newArr));

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])
  return (
    <Container>
      <div className='d-flex'>
        <Col md={4}>
          <Image width={300} height={300} src={'http://localhost:3001/' + device.img} />
        </Col>
        <Col md={4}>
          <div className='d-flex flex-column align-items-center'>
            <h2>{device.name}</h2>
            <div className='d-flex justify-content-center align-items-center'
            style={{background: `url(${BigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}>
              {device.rating}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Card className='d-flex align-items-center justify-content-around'
          style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
            <h3>От: {device.price}</h3>
            <Button variant='outline-dark'>Добавить в корзину</Button>
          </Card>
        </Col>
      </div>
      <div className='d-flex flex-column m-3 device-info'>
        <h3>Характеристики</h3>
        {device.info.map((info, index) =>
          <div className='device-info__item' key={info.id}>
            <span>{info.title}:</span><span>{info.description}</span>
          </div>
        )}
      </div>
    </Container>
  );
}

export default DevicePage; 