import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import './login.css'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom';


const Login = () => {

    const employees = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = React.useState({
        showPassword: false,
      });

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const handleClick = (e) =>{
        e.preventDefault();

        if(!email || !password){
            return toast.warning("Please fill in all the fields!")
        }

        if(email === 'admin' && password === 'admin'){
            navigate('/', {replace:'true'});
            toast.success("Admin Verified");
        } else{
            const checkEmail = employees.find(employee => employee.email === email && email);

            if(checkEmail){
                const currentEmployee = employees.find(
                    (employee) => employee.email === email
                )
                const checkPassword = currentEmployee.password == password ? true : false;
                if(checkPassword){
                    navigate(`/profile/${currentEmployee.id}`,{replace:'true'});
                    toast.success("Logged In!");
                } else{
                    toast.error("Invalid User Credentials!");
                }
            } else {
                const ids = employees.length == 0 ? 0 : employees[employees.length - 1].id + 1;

                const data = {
                    id: ids,
                    email,
                    password
                }

                dispatch({type:'ADD_EMPLOYEE', payload: data});
                navigate(`/edit/${ids}`,{replace:'true'});
                toast.success("Please fill Details here");
            }
        } 
    }

  return (
    <>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}} className="loginCard">
        <Card className='card-container' variant="outlined">
            <CardContent sx={{paddingTop:'0px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <h5 style={{marginTop:'30px'}}>Employee and Admin login / Signup</h5>
                <TextField sx={{ml: '10px', mr:'10px'}} id="outlined-basic"  label="Email" type='email' variant="outlined" value = {email} onChange={e => setEmail(e.target.value)} />
                <FormControl sx={{marginTop:'20px', ml: '10px', mr:'10px'}}  variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent:'center'}}>
                <Button color="primary" variant="contained" onClick={handleClick}>
                Login / Signup
                </Button>
            </CardActions>
        </Card>
    </div>
    </>
    
  )
}

export default Login
