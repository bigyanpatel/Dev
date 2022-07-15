import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddComment({userData,postData}) {
    const [text,setText] = useState('')
    return (
        <div style={{width:'100%'}}>
            <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{width:'70%'}} value={text} onChange={(e)=>setText(e.target.value)}/>
            <Button variant="contained">Post</Button>
        </div>
    )
}

export default AddComment