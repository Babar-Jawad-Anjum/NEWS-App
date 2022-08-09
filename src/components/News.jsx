import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    pageSize: 5,
    category: 'general'
  } 

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }

  constructor(){
    super();
    // console.log("Cons from news comp");

    this.state = {
      articles: [], 
      loading: false,
      page: 1,
    }
  }

  async componentDidMount(){
        this.props.setProgress(30);
        let url =`https://newsapi.org/v2/top-headlines?country=de&category=${this.props.category}&apiKey=74f4daedca31416e98e60eb437d30203&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        
        this.setState({
          articles: parseData.articles, 
          totalResults: parseData.totalResults,
          loading: false,
        });
        this.props.setProgress(100);
  }

  handlePreviousClick = async () =>
  {
    this.props.setProgress(30);
    let url = `https://newsapi.org/v2/top-headlines?country=de&category=${this.props.category}&apiKey=74f4daedca31416e98e60eb437d30203&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`; 
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      page: this.state.page - 1, 
      articles: parseData.articles, 
      loading: false 
    });
    this.props.setProgress(100);
    
  }
  handleNextClick = async () =>
  {
    this.props.setProgress(30);
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    {
      let url = `https://newsapi.org/v2/top-headlines?country=de&category=${this.props.category}&apiKey=74f4daedca31416e98e60eb437d30203&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; 
      this.setState({loading: true});
      let data = await fetch(url);
      let parseData = await data.json();

  
      this.setState({
        page: this.state.page + 1, 
        articles: parseData.articles, 
        loading: false 
        });
    }
    this.props.setProgress(100);
    
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='my-3'>News - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4 p-0" key={element.url}>
          <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
        </div>
        })}
          
        </div>

        <div className="container d-flex justify-content-between bg-dark p-1">
        <button disabled={this.state.page<=1} type="button" onClick={this.handlePreviousClick} className="btn btn-sm btn-light m-1"> &lt; Prev</button>
        <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-sm btn-light m-1">Next&gt;</button>
        </div>
      </div>
    )
  }
}

export default News
