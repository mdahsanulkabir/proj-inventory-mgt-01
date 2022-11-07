import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useLoadSKU from '../../Hooks/useLoadSKU';

export default function TestApp() {
  const { skus } = useLoadSKU(); 
  const rows = skus.map((sku, index) => {
    return {
      id : sku._id,
      sl:index+1,
      color : sku.color,
      model : sku.model,
      skug : sku.sku
    }

  })
  console.log(rows);

const columns = [
  {field: 'sl', headerName: 'Serial', width: 20},
  {field: 'color', headerName: 'Color', width: 70},
  {field: 'model', headerName: 'Model', width: 100},
  {field: 'skug', headerName: 'SKU', width: 400},
]
  return (
    <div style={{ height: 600, width: '50%', marginInline: 'auto', marginTop: '100px'}}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
