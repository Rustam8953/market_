import React from 'react';
import { Container, Button } from 'react-bootstrap';
import CreateType from '../modals/CreateType';
import CreateBrand from '../modals/CreateBrand';
import CreateDevice from '../modals/Createdevice';
import {useState} from 'react';

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  return (
    <Container className='d-flex flex-column'>
      <Button variant='outline-dark' className='mt-2' onClick={() => setTypeVisible(true)}>Добавить тип</Button>
      <Button variant='outline-dark' className='mt-2' onClick={() => setBrandVisible(true)}>Добавить бренд</Button>
      <Button variant='outline-dark' className='mt-2' onClick={() => setDeviceVisible(true)}>Добавить устройство</Button>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
    </Container>
  );
}

export default Admin;