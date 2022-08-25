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
import { styled } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify'
import './Add.css'
import { createUseStyles } from 'react-jss';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


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
            margin:5,
            width:'47.5%'
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


    const handleCancel = (e) => {
        navigate('/', {replace: true});
    }

  return (
       <div className="row">
            <div className="column">
            <div>
            <CardContent>
                <div>
                    <Typography className={classes.text1} variant="subtitle1">
                        Image size should be less then 1MB!
                    </Typography>
                    <label htmlFor="avatar-image-upload">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                            <SmallAvatar alt="Remy Sharp" src="" onClick={handleProfilePicUpload}>
                                {image ? <DeleteOutlineIcon mr={5} /> : <ModeEditOutlineIcon mr={5} />}
                            </SmallAvatar>
                            }
                        >
                            <Avatar sx={{height:'200px', width:'200px', border:'black solid 1px'}} alt={currentEmployee.firstName} src={image} sizes='large'/>
                        </Badge>
                    </label>
                    <input
                        ref={inputFileRef}
                        accept="image/*"
                        hidden
                        id="avatar-image-upload"
                        type="file"
                        onChange={handleOnChange}
                    />            
                </div>
                <div style={{marginTop:'10px'}}>
                    <TextField className={classes.sidebyside} id="outlined-basic" required label="First Name" variant="outlined" value={firstName} onChange={e => setFirstName(e.target.value)} />

                    <TextField className={classes.sidebyside} id="outlined-basic" required label="Last Name" variant="outlined" value={lastName} onChange={e => setLastName(e.target.value)}/>

                    <TextField className={classes.input} fullWidth={true} id="outlined-basic" required label="Designation" variant="outlined" value={designation} onChange={e => setDesignation(e.target.value)} />  

                </div> 
            </CardContent>
            </div>   
            </div>         
            <div className="column">
                <div>
                    <CardContent> 
                        <Grid>
                            <TextField className={classes.sidebyside} type="date" required id="outlined-basic" label="" variant="outlined" value={date} onChange={e => setDate(e.target.value)}/>
                            <TextField className={classes.sidebyside} required id="outlined-basic" label="Gender" variant="outlined" value={gender} onChange={e => setGender(e.target.value)}/>
                        </Grid>
                    <TextField className={classes.input} fullWidth={true} type="number" required id="outlined-basic" label="Phone Number" variant="outlined" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

                    <TextField className={classes.input} fullWidth={true} type="address" required id="outlined-basic" label="Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)}/>

                    <TextField className={classes.sidebyside} fullWidth={true} type="address" required id="outlined-basic" label="City" variant="outlined" value={city} onChange={e => setCity(e.target.value)}/>

                    <TextField className={classes.sidebyside} fullWidth={true} type="address" required id="outlined-basic" label="State" variant="outlined" value={state} onChange={e => setState(e.target.value)} />

                    <TextField className={classes.sidebyside} fullWidth={true} type="number" required id="outlined-basic" label="Zip Code" variant="outlined" value={zipCode} onChange={e => setZipCode(e.target.value)} />

                    <TextField className={classes.sidebyside} fullWidth={true} type="address" required id="outlined-basic" label="Country" variant="outlined" value={country} onChange={e => setCountry(e.target.value)} />
                    </CardContent>
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