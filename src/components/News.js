import React, { Component } from 'react'
import NewsItem from './NewsItem'
import sourceNews from '../sample.json'

// read json file as a array of objects

const newskey = ""

export default class News extends Component {
     fakedescription = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas obcaecati nam quidem. Ea minus perferendis aliquam facere quidem in magnam id, modi voluptas, assumenda ratione et eum tenetur vel praesentium ipsa impedit nostrum magni soluta veritatis? Hic error consectetur velit voluptate laborum nulla quia deleniti sint itaque aliquid blanditiis perspiciatis, ratione beatae ducimus in animi porro facilis similique impedit eveniet? Nobis deleniti minima temporibus eos."
    //  articles = sourceNews.articles
     
     constructor() {
            super();
            console.log("Hello I am a constructor from News Component");
            // console.log(this.articles);
            this.state = {
                articles: [],
                loading: true,
                page: 1,
                totalArticles: 0
            }
        }
    
    async componentDidMount() {
        // let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey="
        let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey="
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false })
    }

     handleNext = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newskey}&page=${this.state.page + 1}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, page: this.state.page + 1, loading: false })
    }

    handlePrevious = async () => {
      this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newskey}&page=${this.state.page - 1}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, page: this.state.page - 1, loading: false })
    }

  render() {
    return (
      <>
        <div className="container my-3">
            <h1>NewsZebra - Top US Headlines</h1>
            {this.state.loading && <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            <div className="row">
                {this.state.articles.map((element, index) => {
                    return (
                        <div className="col-md-4 my-3" key={index}>
                            <NewsItem title={element.title?.slice(0,45)} imageUrl={element.urlToImage?.length > 0 ? element.urlToImage : "https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0="} description={element.description?.slice(0, 88)} newsUrl={element.url} source={element?.source} />
                        </div>
                    )
                })}
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className="btn btn-success" onClick={this.handlePrevious}> &larr; Previous</button>
            
            <button disabled={(this.state.totalArticles / 20) <= this.state.page} className="btn btn-success" onClick={this.handleNext}>Next &rarr; {(this.state.totalArticles / 20) >= this.state.page}</button>
            </div>
        </div>
        
      
      
      </>

    )
  }
}
