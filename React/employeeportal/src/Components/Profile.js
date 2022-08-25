import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Avatar from '@mui/material/Avatar';
import { green, red} from '@mui/material/colors';

const Profile = () => {
    const {id} = useParams();
  return (
    <>
        <Navbar/>
        <div>
            <h1>Hello , {id}</h1>
        </div>
        <div style={{position:'absolute', top:'50px', right:'5px'}}>
            <Avatar sx={{ bgcolor: green[500] , m : 2}}>
                        <ModeEditOutlineIcon/>
            </Avatar>
            <Avatar sx={{ bgcolor: red[500] , m : 2}}>
                        <DeleteOutlineIcon/>
            </Avatar>
        </div>
    </>
  )
}

export default Profile