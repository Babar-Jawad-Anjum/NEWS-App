import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    
    let {title, description, imageUrl, newsUrl, author, date} = this.props; //method to access Props 

    return (

      <div className='m-2 my-2'>
        <div className="card">
          <img className="card-img-top" src={imageUrl?imageUrl:"https://img.welt.de/img/politik/deutschland/mobile239948795/2331356977-ci16x9-w1200/Bundesjustizminister-Buschmann.jpg"} alt="Card cap"/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
