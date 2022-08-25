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
import { useSelector } from 'react-redux';

const Homepage = () => {
    const employees = useSelector(state => state);

    const handleDelete = () => {
        
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
                                    <DeleteIcon onClick={handleDelete}/>
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