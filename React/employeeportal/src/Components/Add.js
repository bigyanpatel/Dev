import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import {useSelector} from 'react-redux';


import './Add.css'

const employees = useSelector((state) = state);

const Add = () => {

  return (
    <>
        <div>
            <h3>Image size should be less then 1MB</h3>
            <Avatar className='avatar' alt="Profile Picture" src="" />
        </div>
        <div className="row">
            <div className="column">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <div className='sbs'>
                        <TextField id="outlined-basic" required label="First Name" variant="outlined" />
                        <TextField id="outlined-basic" required label="Last Name" variant="outlined" />
                    </div>
                        <TextField id="outlined-basic" required label="Designation" variant="outlined" />
            </Box>            
            </div>
            <div className="column">
            <div className='form'>
            <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <TextField type="date" id="outlined-basic" label="" variant="outlined" />
                        <TextField type="address" id="outlined-basic" label="Address" variant="outlined" />
                        <TextField type="address" id="outlined-basic" label="City" variant="outlined" />
                        <TextField type="address" id="outlined-basic" label="State" variant="outlined" />
                        <TextField type="number" maxwidth='6' id="outlined-basic" label="Zip Code" variant="outlined" />
                        <TextField type="address" id="outlined-basic" label="Country" variant="outlined" />
                           
            </Box>
            </div>
            </div>
        </div>
        
    </>
    
  )
}

export default Add