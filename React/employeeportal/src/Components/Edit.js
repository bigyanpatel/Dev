import React, {createRef,useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify'
import './Add.css'
import { createUseStyles } from 'react-jss';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModeEditOutline from '@mui/icons-material/ModeEditOutline';


const Add = () => {
  const useStyles = createUseStyles({
        text1: {
            color:'gray',
            textAlign:"center"
          },
        card1:{
            marginTop:'2%'
        },
        card2:{
            height:'100vh',
            marginTop:'2%'
        },
        input:{
            margin: 5
        },
        sidebyside:{
            width:'49%'
        }
      });

      const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 50,
        height: 50,
        border: `2px solid ${theme.palette.background.paper}`,
      }));

    const {id} = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const employees = useSelector((state) => state);
    const dispatch = useDispatch();

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [designation,setDesignation] = useState('');
    const [date,setDate] = useState('');
    const [gender,setGender] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [zipCode,setZipCode] = useState('');
    const [country,setCountry] = useState('');
    const [image, _setImage] = useState(null);
    const inputFileRef = createRef(null);
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

    const currentEmployee = employees.find(
      (employee) => employee.id === parseInt(id)
    )

    useEffect(() => {
      if(currentEmployee){
        _setImage(currentEmployee.image);
        setFirstName(currentEmployee.firstName);
        setLastName(currentEmployee.lastName);
        setDesignation(currentEmployee.designation);
        setDate(currentEmployee.date);
        setGender(currentEmployee.gender);
        setPhoneNumber(currentEmployee.phoneNumber);
        setAddress(currentEmployee.address);
        setCity(currentEmployee.city);
        setState(currentEmployee.state);
        setZipCode(currentEmployee.zipCode);
        setCountry(currentEmployee.country);
      }
    },[currentEmployee]);

    const cleanup = () => {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
        cleanup();
        }
        _setImage(newImage);
    };

    const handleOnChange = (event) => {
        const newImage = event.target?.files?.[0];

        if (newImage) {
        setImage(URL.createObjectURL(newImage));
        }
    };

    const handleProfilePicUpload = (event) => {
        if (image) {
        event.preventDefault();
        setImage(null);
        }
        setOpen(null);
    };

    const handleClick = (e) =>{
        e.preventDefault();

        if(!firstName || !lastName || !designation || !date || !phoneNumber || !address || !city || !state || !zipCode || !country){
            return toast.warning("Please fill in all the fields!")
        }

        // const checkEmail = employees.find(employee => employee.id !== id && employee.email === email);
        // const checkPassword = employees.find(employee => employee.password === password && password);

        const data = {
            id: parseInt(id),
            image,
            firstName,
            lastName,
            designation,
            date,
            gender,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            country
        }
    
        dispatch({type:'UPDATE_EMPLOYEE', payload: data});
        navigate(`/profile/${id}`, {replace:'true'});
        toast.success("Employee updated Successfully");
    }

    const handleModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(null);
    };


    const handleCancel = (e) => {
        navigate('/', {replace: true});
    }

  return (
       <div className="row">
            <div className="column">
            <div style={{margin:'5px 5px' }}>
                <div style={{height:'300px'}}>
                    <Typography className={classes.text1} variant="subtitle1">
                        Image size should be less then 1MB!
                    </Typography>
                        <Badge sx={{marginTop:'30px'}}
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                            <label htmlFor="avatar-image-upload">
                            <SmallAvatar alt="Remy Sharp" src="" onClick={handleProfilePicUpload}>
                                {image ? <DeleteOutlineIcon mr={5} /> : <ModeEditOutlineIcon mr={5} />}
                            </SmallAvatar>
                            </label>
                            }
                        >
                            <Avatar sx={{height:'200px', width:'200px',}} alt='' src={image} sizes='large'>
                            </Avatar>
                        </Badge>
                    <input
                        ref={inputFileRef}
                        accept="image/*"
                        hidden
                        id="avatar-image-upload"
                        type="file"
                        onChange={handleOnChange}
                    />
                            
                </div>
                <div style={{marginTop:'20px'}}>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <TextField sx={{width:'49%'}} id="outlined-basic" required label="First Name" variant="outlined" value={firstName} onChange={e => setFirstName(e.target.value)} />

                        <TextField sx={{width:'49%'}} id="outlined-basic" required label="Last Name" variant="outlined" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </div>

                    <TextField sx={{marginTop:'10px'}} fullWidth={true} id="outlined-basic" required label="Designation" variant="outlined" value={designation} onChange={e => setDesignation(e.target.value)} />  

                </div> 
            </div>
                
            </div>         
            <div className="column">
                <div style={{margin:'5px 5px' }}>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <TextField sx={{width:'49%'}} type="date" required id="outlined-basic" label="" variant="outlined" value={date} onChange={e => setDate(e.target.value)}/>
                        
                        <TextField sx={{width:'49%'}} required id="outlined-basic" label="Gender" variant="outlined" value={gender} onChange={e => setGender(e.target.value)}/>

                    </div>

                    
                    <TextField sx={{marginTop:'10px'}} fullWidth={true} type="number" required id="outlined-basic" label="Phone Number" variant="outlined" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

                    <TextField sx={{marginTop:'10px'}} fullWidth={true} type="address" required id="outlined-basic" label="Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)}/>
                    
                    <div style={{display:'flex', justifyContent:'space-around', marginTop:'10px'}}>
                        
                        <TextField sx={{width:'49%'}} fullWidth={true} type="address" required id="outlined-basic" label="City" variant="outlined" value={city} onChange={e => setCity(e.target.value)}/>

                        <TextField sx={{width:'49%'}} fullWidth={true} type="address" required id="outlined-basic" label="State" variant="outlined" value={state} onChange={e => setState(e.target.value)} />

                    </div>

                    <div style={{display:'flex', justifyContent:'space-around', marginTop:'10px'}}>
                        <TextField sx={{width:'49%'}} fullWidth={true} type="number" required id="outlined-basic" label="Zip Code" variant="outlined" value={zipCode} onChange={e => setZipCode(e.target.value)} />

                        <TextField sx={{width:'49%'}} fullWidth={true} type="address" required id="outlined-basic" label="Country" variant="outlined" value={country} onChange={e => setCountry(e.target.value)} />
                    </div>
                    <CardActions>
                    <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleCancel}> 
                        Cancel
                    </Button>
                    <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}> 
                        Update
                    </Button>
                    </CardActions>
                </div>
            </div>
        </div>
  )
}

export default Add