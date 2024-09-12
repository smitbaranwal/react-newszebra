import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import sourceNews from '../sample.json'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
// import { withRouter } from 'react-router-dom/cjs/react-router-dom'

// read json file as a array of objects

const newskey = "52c97c2d26f94783a34284068c311e35"

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
class News extends Component {
    
    static defaultProps = {
        country: 'us',
        category: 'business'
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

   
     
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
        // let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=52c97c2d26f94783a34284068c311e35"
        console.log(this.props.params)
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.params.category}&apiKey=52c97c2d26f94783a34284068c311e35`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false })
    }

     handleNext = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.params.category}&apiKey=${newskey}&page=${this.state.page + 1}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, page: this.state.page + 1, loading: false })
    }

    handlePrevious = async () => {
      this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.params.category}&apiKey=${newskey}&page=${this.state.page - 1}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, page: this.state.page - 1, loading: false })
    }

  render() {
    const {category} = this.props.params;
    console.log(category);
    return (
      <>
        <div className="container my-3">
            <h1 className='text-center'>NewsZebra - Top US Headlines</h1>
            {this.state.loading && <Spinner />}
            <div className="row">
                {!this.state.loading && this.state.articles.map((element, index) => {
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

export default withParams(News)
