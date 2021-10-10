import React, { useState } from "react";
import { DataGrid, GridColDef, GridSelectionModel } from '@material-ui/data-grid'
import { server_calls } from "../../api/server";
import { useGetData } from "../../custom-hooks";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import { CarForm } from "../../components";



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 110 },
    {
        field: 'name',
        headerName: 'Car name',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Cost',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 110,
        editable: true,
    },
    {
        field: 'car_model',
        headerName: 'Car Model',
        description: 'This is how good the camera is.',
        sortable: false,
        width: 160
    },
];

/*onst rows = [
/*   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
/*   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
/*   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
/*   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
/*   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
/*   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
/*   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
/*   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
/*   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
/*/;



export const DataTable = () => {
    let { CarData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }
    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = () => {
        server_calls.delete(`${gridData[0]}`)
        getData()
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>Cars in Collection</h2>
            <DataGrid rows={CarData} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={(newSelectionModel) => {
                setData(newSelectionModel);
            }}
                selectionModel={gridData}
                {...CarData} />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color='secondary' onClick={deleteData}>Delete</Button>

            {/**Dialog Pop up starts here */}
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Update Your Car </DialogTitle>
                <DialogContent>
                    <DialogContentText>Car: {gridData[0]}</DialogContentText>
                    <CarForm id={`${gridData[0]}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}