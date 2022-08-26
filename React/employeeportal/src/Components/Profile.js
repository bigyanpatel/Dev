import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Avatar from '@mui/material/Avatar';
import { green, red} from '@mui/material/colors';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {useNavigate,Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import './profile.css'

const Profile = () => {

    const {id} = useParams();
    const employees = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentEmployee = employees.find(
        (employee) => employee.id === parseInt(id)
    )

    const handleEdit = (id) => {
        navigate(`/edit/${id}`, {replace:'true'});
        toast.success('Now you can make changes');
    }

    const handleProfileClick = () => {
        navigate(`/profile/${id}`);
    }

    const handleDelete = (id) => {
        dispatch({type:"DELETE_EMPLOYEE", payload: id});
        navigate(`/`, {replace:'true'});
        toast.success("Account Deleted Sucessfully!");
    }

  return (
    <>
        <div style={{position:'relative'}} className='topnav'>
                <div className='topnav-brand'>
                    <Link to='/' className='link'>Management System</Link>
                </div>
                <div>
                    <Avatar className='avatar' sx={{position:'absolute',width:'40px', height:'40px', right:'22px', top:'5px'}} alt= {currentEmployee.firstName} src={currentEmployee.image} onClick={handleProfileClick}/>
                </div>
        </div>
        <div style={{position:'absolute', top:'50px', right:'5px'}}>
            <Avatar className='avatar' sx={{ bgcolor: green[500] , m : 2}} onClick={() => handleEdit(currentEmployee.id)}>
                        <ModeEditOutlineIcon/>
            </Avatar>
            <Avatar className='avatar' sx={{ bgcolor: red[500] , m : 2}} onClick={() => handleDelete(currentEmployee.id)}>
                        <DeleteOutlineOutlinedIcon/>
            </Avatar>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin:'40px',marginTop:'100px'}}>
            <Avatar className='avatar' sx={{width:'150px', height:'150px'}} src={currentEmployee.image}/>
        </div>
        <div>
            <Typography variant='h4'>{currentEmployee.firstName} {currentEmployee.lastName}</Typography>
            <Typography variant='h6' color='#607d8b'>{currentEmployee.designation}</Typography>
        </div>
        <div style={{display:'flex', justifyContent:'center',marginTop:'30px'}}>
            <div>
                <Typography variant='subtitle1' sx={{m:1}} color='#607d8b'>Gender</Typography>
                <Typography variant='h6' sx={{m:1}}>{currentEmployee.gender}</Typography>
            </div>
            <div>
                <Typography variant='subtitle1' sx={{m:1}}color='#607d8b'>DOB</Typography>
                <Typography variant='h6' sx={{m:1}}>{currentEmployee.date}</Typography>
            </div>
            <div>
                <Typography variant='subtitle1' sx={{m:1}} color='#607d8b'>Nationality</Typography>
                <Typography variant='h6' sx={{m:1}}>{currentEmployee.country}</Typography>
            </div>
        </div>
    </>
  )
}

export default Profile