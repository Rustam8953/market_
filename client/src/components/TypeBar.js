import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Context } from '..';

const TypeBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                style={{cursor: 'pointer'}}
                active={type.id === device.selectedType.id}
                onClick={() => {
                    device.setSelectedType(type)
                    console.log(device.selectedType)
                }}
                key={type.id}>{type.name}</ListGroup.Item>
            )}
        </ListGroup>
    );
})

export default TypeBar;