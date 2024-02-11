import React, { useContext, useEffect, useState } from 'react';
import { Form, Dropdown, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '..';
import { createDevice, fetchBrands, fetchTypes } from '../http/deviceApi';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [brand, setBrand] = useState(null);
    const [type, setType] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: "", description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const selectFile = (e) => {
        setFile(e.target.files[0]);
    }
    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => {
            onHide()
        })
    }
    return (
        <>
        <Modal
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Dropdown>
                    <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map((dev) => 
                            <Dropdown.Item onClick={() => device.setSelectedType(dev)} key={dev.id}>{dev.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map((dev) => 
                            <Dropdown.Item onClick={() => device.setSelectedBrand(dev)} key={dev.id}>{dev.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder='Введите название устройства' className='mt-3'></Form.Control>
                <Form.Control value={price} onChange={e => setPrice(Number(e.target.value))} placeholder='Введите цену' className='mt-3' type='number'></Form.Control>
                <Form.Control placeholder='Выберите изображение' onChange={selectFile} className='mt-3' type="file"></Form.Control>
                <hr />
                <Button variant='outline-dark' onClick={() => addInfo()}>Добавить новое устройство</Button>
                {info.map((i) => 
                    <div className='mt-2 d-flex justify-content-between' style={{gap: '10px'}} key={i.number}>
                        <Col md={4}>
                            <Form.Control value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.number)} placeholder='Введите название характеристики'></Form.Control>
                        </Col>
                        <Col md={4}>
                            <Form.Control value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)} placeholder='Введите значение характеристики'></Form.Control>
                        </Col>
                        <Col md={4}>
                            <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>Удалить</Button>
                        </Col>
                    </div>
                )}
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addDevice}>Добаить</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
})

export default CreateDevice;