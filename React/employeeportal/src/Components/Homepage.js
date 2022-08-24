import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import './Homepage.css'

const Homepage = () => {
    const onClick = () => {

    }
  return (
    <>
        <div>
            <h1>List of Employees</h1>
            <React.Fragment>
                <div className='box-container'>
                    <div className='cards'>
                        <Avatar className='avatar' sx={{ bgcolor: green[300]}}>
                            <AddIcon/>
                        </Avatar>
                        <Typography style={{marginTop:'10px'}}>Add Employees</Typography>
                    </div>
                </div>
                
            </React.Fragment>
        </div>
    </>
  )
}

export default Homepage