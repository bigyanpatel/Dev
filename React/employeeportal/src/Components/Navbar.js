import React from 'react'
import {Link, useParams} from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
  const {id} = useParams();

  return (
    <div className='topnav'>
        <Link to =  "/" className='topnav-brand'>
            Management System
        </Link>
        <Link to =  "/" className='topnav-profile'>
            {id === 0 ? 'Admin' : 'profile'}
        </Link>
    </div>
  )
}

export default Navbar