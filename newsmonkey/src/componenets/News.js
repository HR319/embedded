import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

 

  constructor(){
    super();
    this.state = {
      articles : []
    }
}

   async componentDidMount(){
    let furl = "https://newsapi.org/v2/top-headlines?country=in&apiKey=81e7f3f1a6f04970915cde206c4c28ff";
    let data = await fetch(furl);
    let parsedData = await data.json()
    this.setState({articles : parsedData.articles})
    // console.log(parsedData);
  }


  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top headlines</h2>
        <div className="row">
        {this.state.articles.map(  (element)=> { 
          return <div className="col-md-4" key={element.url} >
            <Newsitem  title={element.title?element.title:""} description={element.description?element.description:""} imgurl={element.urlToImage?element.urlToImage:"https://cdn.ndtv.com/common/images/ogndtv.png"} url={element.url} />
            </div>
            }
            )}
          
        </div>
        
      </div>
    )
  }
}

export default News
