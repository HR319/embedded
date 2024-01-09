import React, { Component } from 'react'

export class Newsitem extends Component {

    
  render() {
    let {title, description, imgurl, url} = this.props;
    return (
      <div >
        <div className="card" style={{width: '22rem'}}>
  <img src={imgurl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={url} target="_blank" className="btn btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
