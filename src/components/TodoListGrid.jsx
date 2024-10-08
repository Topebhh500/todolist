import { useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import '../TodolistGrid.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function TodolistGrid() {
    const [todo, setTodo] = useState({ 
        description: "", 
        duedate: null,
        priority: "Medium" 
    });

    const gridRef = useRef();

    const [todos, setTodos] = useState([
        { description: "Branch at the Mall for Fast Food", priority: "High", duedate: "2024-09-18" },
        { description: "Book the Hall for Get-Together", priority: "Low", duedate: "2024-09-19" },
        { description: "Make arrangement for the Cake", priority: "Medium", duedate: "2024-09-19" },
    ]);

    // Custom cell renderer for priority
    const PriorityCellRenderer = (params) => {
        const priorityColors = {
            High: '#ff0000',
            Medium: '#ffa500',
            Low: '#008000'
        };
        
        return (
            <span style={{
                backgroundColor: priorityColors[params.value] || '#000000',
                padding: '2px 10px',
                borderRadius: '15px',
                color: 'white'
            }}>
                {params.value}
            </span>
        );
    };

    // Custom date formatter
    const dateFormatter = (params) => {
        return dayjs(params.value).format('MMM D, YYYY');
    };

    const colDefs = [
        { 
            field: "description", 
            headerName: "Description",
            flex: 2,
            filter: true, 
            floatingFilter: true,
            sortable: true
        },
        { 
            field: "priority",
            headerName: "Priority", 
            flex: 1,
            filter: true, 
            floatingFilter: true,
            sortable: true,
            cellRenderer: PriorityCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        { 
            field: "duedate", 
            headerName: "Due Date",
            flex: 1,
            filter: true, 
            floatingFilter: true,
            sortable: true,
            valueFormatter: dateFormatter
        },
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
    };

    const handleDateChange = (newDate) => {
        if (newDate) {
            const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
            setTodo({ ...todo, duedate: formattedDate });
        } else {
            setTodo({ ...todo, duedate: null });
        }
    };

    const HandleAdd = () => {
        if (!todo.description || !todo.duedate) {
            alert("Please enter both description and date");
            return;
        }
        setTodos([todo, ...todos]);
        setTodo({ description: "", duedate: null, priority: "Medium" });
    };

    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => 
                index != gridRef.current.getSelectedNodes()[0].id))
        } else {
            alert('Select a row first!');
        }
    };

    return (
        <div className="todolist-container">
            <div className="todolist-form">
                <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }} mt={2} mb={2}>
                    <TextField 
                        label="Description"
                        value={todo.description}
                        onChange={event => setTodo({ ...todo, description: event.target.value })}
                    />
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={todo.priority}
                            label="Priority"
                            onChange={event => setTodo({ ...todo, priority: event.target.value })}
                        >   <MenuItem value="">Choose</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Due Date"
                            value={todo.duedate ? dayjs(todo.duedate) : null}
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" onClick={HandleAdd}>Add Todo</Button>
                    <Button variant="contained" endIcon={<DeleteIcon/>} color="error" onClick={handleDelete}>Delete</Button>
                </Stack>
            </div>

            <div className="ag-theme-material todolist-grid" style={{ height: 400, width: '100%', marginTop: '20px' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={todos}        
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true} 
                    rowSelection="single"
                    paginationPageSize={5}
                    suppressCellFocus={true}
                />
            </div>
        </div>
    );
}

export default TodolistGrid;