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
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModeEditOutline from '@mui/icons-material/ModeEditOutline';
import Navbar from './Navbar';


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
    const [email] = useState('');
    const[password] = useState('');
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

        const maxFileSizeLimit = 1024;

        if(newImage.size / 1024 > maxFileSizeLimit){
            toast.warning('Please select a file below 1 MB!');
            return;
        }

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

        let {_email} = '';
        let {_password} = '';

        if(!currentEmployee.email && !currentEmployee.password){
            _email = firstName;
            _password = '123456';
        } else {
            _email = currentEmployee.email;
            _password = currentEmployee.password;
        }

        const data = {
            id: parseInt(id),
            image,
            email : _email,
            password : _password,
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

        // return console.log(data.email , data.password)
    
        dispatch({type:'UPDATE_EMPLOYEE', payload: data});
        navigate(`/profile/${id}`, {replace:'true'});
        toast.success("Employee updated Successfully");
    }

    const handleProfileClick = () => {
        navigate(`/profile/${id}`);
    }

    const handleCancel = (e) => {
        navigate('/', {replace: true});
    }

  return (
    <>
    <div style={{position:'relative'}} className='topnav'>
            <div className='topnav-brand'>
                <Link to='/login' className='link'>Management System</Link>
            </div>
            <div>
                <Avatar className='avatar' sx={{position:'absolute',width:'40px', height:'40px', right:'22px', top:'5px'}} alt= {currentEmployee.firstName} src={currentEmployee.image} onClick={handleProfileClick}/>
            </div>
    </div>
    <div className="row">
            <div className="column">
                <div >
                    <div style={{margin:'5px 5px', display:'flex', flexDirection:'column'}}>
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
                                <Avatar className='box-shadow' sx={{height:'200px', width:'200px',}} alt={currentEmployee.firstName} src={image} sizes='large'>
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
                    <div style={{marginTop:'30px'}}>
                        <div style={{display:'flex', justifyContent:'space-around'}}>
                            <TextField sx={{width:'49%', marginTop:'30px'}} id="outlined-basic" required label="First Name" variant="outlined" value={firstName} onChange={e => setFirstName(e.target.value)} />

                            <TextField sx={{width:'49%', marginTop:'30px'}} id="outlined-basic" required label="Last Name" variant="outlined" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </div>
                        <TextField sx={{marginTop:'30px'}} fullWidth={true} id="outlined-basic" required label="Designation" variant="outlined" value={designation} onChange={e => setDesignation(e.target.value)} />  
                    </div> 
                </div>
                </div>
            </div>
            <div className='divider'>
            </div>         
            <div className="column">
                <div style={{margin:'5px 5px', height:'70vh', display:'flex', flexDirection:'column', justifyContent: 'space-evenly' }}>
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
                    <CardActions sx={{display:'flex', justifyContent:'right'}}>
                    <Button className='box-shadow' color="secondary" variant="contained" disabled={loading} onClick={handleCancel}> 
                        Cancel
                    </Button>
                    <Button className='box-shadow' color="primary" variant="contained" disabled={loading} onClick={handleClick}> 
                        Save
                    </Button>
                    </CardActions>
                </div>
            </div>
        </div>
    </>
  )
}

export default Add