import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createBrand } from '../http/deviceApi';

const CreateBrand = ({show, onHide}) => {
  const [value, setValue] = useState('');
  const addBrand = () => {
    createBrand({name: value}).then(() => {
      setValue('')
      onHide();
    })
  }
  return (
    <>
      <Modal
      show={show}
      onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавиь бренд</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder='Введите название бренда' />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={() => addBrand()}>Добаить</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateBrand;