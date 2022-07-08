import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Movies extends Component {
  render() {
    return (
      <>
      {
        movies.length === 0 ?
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div> :
        <div>
        <h3 className="text-center"><strong>Trending</strong></h3>
        <div className="movies-list">
            {
                this.state.movies.map((movieObj)=>(
                    <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  alt={movieObj.title} className="card-img-top movies-img"/>
                        {/* <div className="card-body"> */}
                            <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                            {/* <p class="card-text movies-text">{movieObj.overview}</p> */}
                            <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                            {
                                this.state.hover === movieObj.id &&
                                <a href='_' className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to favourites"}</a>
                            }
                            </div>
                        {/* </div> */}
                    </div>
                ))
            }
        </div>
        <div className="infinite-loader"style={{display:'flex',justifyContent:'center'}}>
            <h2>Load More Movies .........................</h2>
        </div>
        {/* <div style={{display:'flex',justifyContent:'center'}}> */}
        {/* <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                {
                    this.state.parr.map((value)=>(
                        <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                    ))
                }
                <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
            </ul>
        </nav> */}
        {/* </div> */}
    </div>
      }
      </>
    )
  }
}
