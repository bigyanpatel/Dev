import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Avatar from '@mui/material/Avatar';
import { green, red} from '@mui/material/colors';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = () => {

    const {id} = useParams();
    const employees = useSelector((state) => state);

    const currentEmployee = employees.find(
        (employee) => employee.id === parseInt(id)
    )

  return (
    <>
        <Navbar/>
        <div style={{position:'absolute', top:'50px', right:'5px'}}>
            <Avatar sx={{ bgcolor: green[500] , m : 2}}>
                        <ModeEditOutlineIcon/>
            </Avatar>
            <Avatar sx={{ bgcolor: red[500] , m : 2}}>
                        <DeleteOutlineIcon/>
            </Avatar>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin:'40px'}}>
            <Avatar sx={{width:'150px', height:'150px'}} src={currentEmployee.image}/>
        </div>
        <div>
            <Typography variant='h4'>{currentEmployee.firstName} {currentEmployee.lastName}</Typography>
            <Typography variant='h6' color='#607d8b'>{currentEmployee.designation}</Typography>
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
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