import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom"
import { green } from '@mui/material/colors';
import './Homepage.css'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify";

const Homepage = () => {
    const employees = useSelector(state => state);

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch({type:"DELETE_EMPLOYEE", payload: id});
        toast.success("Deleted Sucessfully!");
    }

  return (
        <div>
            <h1>List of Employees</h1>
            <div className='list-container'>
            {
                employees.map((employee, id) => (
                        <React.Fragment key={id}>
                            <div className='box-container'>
                                <div className='cards'>
                                    <Avatar></Avatar>
                                    <Typography style={{marginTop:'10px'}}>{employee.firstName}</Typography>                
                                    <Typography style={{marginTop:'10px'}}>{employee.designation}</Typography>
                                    <DeleteIcon className='deleteIcon' sx={{display:'flex', alignItems:'center',fontSize: 50, marginBottom:'10px' }} onClick={() => handleDelete(employee.id)}/>
                                </div>
                            </div>
                        </React.Fragment>
                ))
            }
            <React.Fragment>
                <div className='box-container'>
                    <div className='cards'>
                        <Avatar className='avatar' sx={{ bgcolor: green[300]}}>
                            <AddIcon/>
                        </Avatar>
                        <Link to='./Add' style={{textDecoration:'none', color:'black'}}>
                            <Typography style={{marginTop:'10px'}}>Add Employees</Typography>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
            </div>
        </div>
  )
}

export default Homepage