import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import Instagram from '../Assets/Instagram.JPG'
import { createUseStyles } from 'react-jss';
import Alert from '@mui/material/Alert';
// import { border } from '@mui/system';
import TextField from '@mui/material/TextField';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link } from 'react-router-dom';
// import { ClassNames } from '@emotion/react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';

export default function Login() {
  const useStyles = createUseStyles({
    text1:{
        color:'grey',
        textAlign:'center'
    },
    text2:{
        textAlign:'center'
    },
    card2:{
        height:'6vh',
        marginTop:'2%'
    }
  });
  const classes = useStyles();;
  
  return (  
    <div className="loginWrapper">
          <div className="imgcar" style={{backgroundImage:'url('+bg+')',backgroundSize:'cover'}}>
            <div className="carousel-wrapper">
                <Carousel autoPlay infiniteLoop showArrows={false} showIndicators={false} showStatus={false} showThumbs={false}>
                    <div>
                        <img src={img1} alt=""/>
                    </div>
                    <div>
                        <img src={img2} alt=""/>
                    </div>
                    <div>
                        <img src={img3} alt=""/>
                    </div>
                    <div>
                        <img src={img4} alt=""/>
                    </div>
                    <div>
                        <img src={img5} alt=""/>
                    </div>
                </Carousel>
            </div>
          </div>
          <div className="loginCard">
            <Card variant="outlined">
                <div className="insta-logo">
                    <img src={Instagram} alt="" />
                </div>
                <CardContent>
                    {true && <Alert severity="error">This is an error alert — check it out!</Alert>}    
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                    <Typography className={classes.text2} color="primary" variant="subtitle1">
                        Forget Password ?
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" fullWidth={true} variant="contained">
                    Log in
                    </Button>
                </CardActions>
            </Card>
            <Card variant="outlined" className={classes.card2}>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        Don't have an account ? <Link to="/signup" style={{textDecoration:'none'}}>Signup</Link>
                    </Typography>
                </CardContent>
            </Card>
          </div>
      </div>
  );
}
