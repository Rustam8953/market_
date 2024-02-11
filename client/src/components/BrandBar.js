import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <div className="device-box brand">
            {device.brands.map((brand) => 
                <div key={brand.id} className='brand-item'
                onClick={() => device.setSelectedBrand(brand)}
                active={brand.id === device.selectedBrand.id ? 'active' : 'light'}
                style={{cursor: 'pointer', width: 'auto'}}>
                    {brand.name}
                </div>
            )}
        </div>
    );
})

export default BrandBar;