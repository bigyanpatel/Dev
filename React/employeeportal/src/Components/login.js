import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material'
import './login.css'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom';

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

        const data = {
            email,
            password
        }

        const checkEmail = employees.find(employee => employee.email === email && email);
        const checkPassword = employees.find(employee => employee.password === password && password);

        if(data.email == 'admin' && data.password === 'admin'){
            navigate('/', {replace:'true'});
            toast.success("Admin Verified");
        } else if(checkEmail && checkPassword){
            toast.success('User Found');
        } else {
            navigate('/add',{replace:'true'});
            toast.error("Please fill Details here");
        }
    }

  return (
    <div className="loginCard" sx={{width: '50vw', marginTop: '25%', marginLeft: '25%'}}>
        <Card variant="outlined">
            <CardContent> 
                <TextField id="outlined-basic" sx={{m : 1}} label="Email" type='email' variant="outlined" fullWidth={true} value = {email} onChange={e => setEmail(e.target.value)} />
                <FormControl fullWidth={true} sx={{m : 1}} variant="outlined">
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
            <CardActions>
                <Button color="primary" fullWidth={true} variant="contained" onClick={handleClick}>
                Login / Signup
                </Button>
            </CardActions>
        </Card>
    </div>
  )
}

export default Login
