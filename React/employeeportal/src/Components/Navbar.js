import React from 'react'
import {Link, useParams} from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
  const {id} = useParams();

  return (
    <div className='topnav'>
        <Link to =  "/home" className='topnav-brand'>
            Management System
        </Link>
        <Link to =  "/home" className='topnav-profile'>
            {id === 0 ? 'Admin' : 'profile'}
        </Link>
    </div>
  )
}

export default Navbar