import React from 'react';

const SKU = ({sku}) => {
    return (
        <div>
            <p>{sku._id} {sku.model} {sku.color} {sku.sku}</p>
        </div>
    );
};

export default SKU;