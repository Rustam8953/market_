import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createType } from '../http/deviceApi';

const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('');
  const addType = () => {
    createType({name: value}).then(() => {
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
          <Modal.Title>Добавить новый тип</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder='Введите название типа' />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={() => addType()}>Добаить</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateType;