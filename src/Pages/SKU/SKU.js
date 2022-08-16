import React from 'react';

const SKU = ({sku}) => {
    return (
        <div>
            <p>{sku._id} {sku.Model} {sku.Color} {sku.SKU}</p>
        </div>
    );
};

export default SKU;