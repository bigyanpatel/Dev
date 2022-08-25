import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {Link} from "react-router-dom"
import { green , red } from '@mui/material/colors';
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
            <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap'}} className='list-container'>
            {
                employees.map((employee, id) => (
                        <React.Fragment key={id}>
                                <div style={{margin: 30, display:'flex', flexDirection:'column', position:'relative'}} className='cards'>
                                    <Avatar className='avatar' sx={{width:'150px', height:'150px'}} src={employee.image}/>
                                    <Typography style={{marginTop:'10px'}} variant='h5'>{employee.firstName}</Typography>                
                                    <Typography style={{marginTop:'10px'}}>{employee.designation}</Typography>
                                    <Avatar className='avatar' sx={{height:'50px', width:'50px', position:'absolute', bottom:'10px', right:'10px', bgcolor: red[500]}} onClick={() => handleDelete(employee.id)}>
                                                <DeleteOutlineOutlinedIcon/>
                                    </Avatar>
                                </div>
                        </React.Fragment>
                ))
            }
            <React.Fragment>
                    <div style={{margin: 30, display:'flex', flexDirection:'column'}} className='cards'>
                        <Avatar className='avatar' sx={{ bgcolor: green[300], height:'100px', width:'100px'}}>
                            <AddIcon sx={{height:'50px', width:'50px'}}/>
                        </Avatar>
                        <Link to='./Add' style={{textDecoration:'none', color:'black'}}>
                            <Typography style={{marginTop:'10px'}}>Add Employees</Typography>
                        </Link>
                    </div>
            </React.Fragment>
            </div>
        </div>
  )
}

export default Homepage