import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Context } from '..';

const TypeBar = observer(() => {
    const {device} = useContext(Context);
    const filterFunc = (type) => {
        device.setSelectedType(type);
    }
    return (
        <ListGroup>
            {device.types.map(type =>
                <div
                style={{cursor: 'pointer'}}
                onClick={() => filterFunc(type)}
                key={type.id}
                className={type.id === device.selectedType.id ? 'type-bar active' : 'type-bar'}>
                    {type.name}
                </div>
            )}
        </ListGroup>
    );
})

export default TypeBar;