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
import {Link, useNavigate} from "react-router-dom"
import { green , red } from '@mui/material/colors';
import './Homepage.css'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify";
import Navbar from './Navbar';

const Homepage = () => {
    const employees = useSelector(state => state);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch({type:"DELETE_EMPLOYEE", payload: id});
        toast.success("Deleted Sucessfully!");
    }

    const handleAdd = () => {
        const id = employees.length == 0 ? 0 : employees[employees.length - 1].id + 1;
        const data = {
            id: id
        }
        dispatch({type:'ADD_EMPLOYEE', payload: data});
        navigate(`/add/${id}`, {replace:'true'});
        toast.success('Please add details!');
    }


  return (
        <div>
            <div className='topnav'>
                    <div className='topnav-brand'>
                        <Link to='/login' className='link'>Management System</Link>
                    </div>
                    <Link to =  "/" className='topnav-profile'>
                        Admin
                    </Link>
            </div>
            <div style={{display:'flex', marginLeft:'35px'}}>
                <h1 style={{left:'30px'}}>List of Employees</h1>
            </div>
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
                        <Avatar className='avatar' sx={{ bgcolor: green[300], height:'100px', width:'100px'}} onClick={handleAdd}>
                            <AddIcon sx={{height:'50px', width:'50px'}}/>
                        </Avatar>
                        <Typography style={{marginTop:'10px'}}>Add Employees</Typography>
                    </div>
            </React.Fragment>
            </div>
        </div>
  )
}

export default Homepage