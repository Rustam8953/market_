import React, { useContext, useEffect } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi';
import Pages from '../components/Pages';
import '../assets/style/root.css';
import '../assets/style/shop.css';
import LastList from '../components/LastList';

const Shop = observer(() => {
  const {device} = useContext(Context);
  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(null, null, 1, 2).then(data => {
      device.setDevice(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])
  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
      device.setDevice(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand]);
  const localLastProuct = JSON.parse(localStorage.getItem('_last'));
  return (
    <Container>
      <div className="mt-3 d-flex" style={{gap: 15}}>
        <Col md={3}>
          <div className='shop-filter'>
            <TypeBar />
            <Button onClick={() => device.setSelectedType({})} >Сбросить фильтр</Button>
          </div>
        </Col>
        <Col md={9} className="shop-content">
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </div>
      {localLastProuct && localLastProuct.length > 0 && <LastList />}
    </Container>
  );
})

export default Shop;