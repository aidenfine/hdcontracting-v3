import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import getAllJobs from 'api/getAllJobs';
import { useEffect } from 'react';

const columns = [
  { field: 'jobNumber', headerName: 'Job #', width: 115 },
  { field: 'comp', headerName: 'Comp?', width: 130 },
  { field: 'invoiceNumber', headerName: 'Invoice Number', type: 'number', width: 130 },
  {
    field: 'estNumber',
    headerName: 'Estimate',
    type: 'number',
    width: 120,
  },
  {
    field: 'assignedTo',
    headerName: 'Assigned To',
    sortable: true,
    width: 250,
  },
  {
    field: 'description',
    headerName: 'description',
    width: 250,
    sortable: false,
  },
  {
    field: 'complete',
    headerName: 'Complete?',
    width: 150,
  },
];

export default function JobsTable() {
  const token = localStorage.getItem('token');

  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs(token);
        const data = response.data;
        const formatData = data.map((job) => ({
          jobNumber: job.jobNumber,
          comp: job.comp,
          estNumber: job.estNumber,
          invoiceNumber: job.invoiceNumber,
          assignedTo: job.assignedTo,
          description: job.description,
          complete: 'false',
          id: job._id,
        }));
        setRows(formatData);
        // setLoading(false);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchJobs();
  }, [token]);

  return (
    <div style={{ height: 400, width: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
