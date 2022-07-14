import React, { useState,useEffect } from 'react'
import {database} from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video'
import './Post.css'
import Avatar from '@mui/material/Avatar';

function Post({userData}) {
    const [posts,setPosts] = useState(null);

    useEffect(()=>{
        let parr = []
        const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
            parr = []
            querySnapshot.forEach((doc)=>{
                let data = {...doc.data(),postId:doc.id}
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    },[])
  return (
    <div>
        {
            posts==null || userData==null ? <CircularProgress /> :
            <div className="video-container">
                {
                    posts.map((post, index) => (
                        <React.Fragment key={index}>
                            <div className="videos">
                                <Video src={post.pUrl} id={post.pId}/>
                                <div className="fa" style={{display:'flex'}}>
                                    <Avatar src={post.uProfile} />
                                    <h4>{post.uName}</h4>
                                </div>
                                
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        }

    </div>
  )
}

export default Post