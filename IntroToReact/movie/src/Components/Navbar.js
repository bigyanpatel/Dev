import React, { Component } from 'react'

export default class navBar extends Component {
  render() {
    return (
      <div style={{display:'flex', background:'grey', padding: '0.5'}}>
        <h1>Movies App</h1>
        <h4 style={{marginLeft:'2rem', marginTop: '2rem'}}>Favourites</h4>
      </div>
    )
  }
}
