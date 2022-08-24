import React from 'react'
import {Link} from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='topnav'>
        <Link to =  "/" className='topnav-brand'>
            Management System
        </Link>
        <Link to =  "/" className='topnav-profile'>
            Profile
        </Link>
    </div>
  )
}

export default Navbar