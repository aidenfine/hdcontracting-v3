import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'jobNumber', headerName: 'Job Number', width: 50 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { jobNumber: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { jobNumber: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { jobNumber: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { jobNumber: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { jobNumber: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { jobNumber: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { jobNumber: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { jobNumber: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { jobNumber: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function JobsTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // getRowId={() => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}