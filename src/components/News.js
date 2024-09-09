import React, { Component } from 'react'
import NewsItem from './NewsItem'
import sourceNews from '../sample.json'

// read json file as a array of objects

export default class News extends Component {
     fakedescription = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas obcaecati nam quidem. Ea minus perferendis aliquam facere quidem in magnam id, modi voluptas, assumenda ratione et eum tenetur vel praesentium ipsa impedit nostrum magni soluta veritatis? Hic error consectetur velit voluptate laborum nulla quia deleniti sint itaque aliquid blanditiis perspiciatis, ratione beatae ducimus in animi porro facilis similique impedit eveniet? Nobis deleniti minima temporibus eos."
     articles = sourceNews.articles
     
     constructor() {
            super();
            console.log("Hello I am a constructor from News Component");
            // console.log(this.articles);
            this.state = {
                articles: [],
                loading: false
            }
        }

  render() {
    return (
      <>
        <div className="container my-3">
            <h2>NewsZebra - Headlines</h2>
            <div className="row">
                {this.articles.map((element, index) => {
                    return (
                        <div className="col-md-4 my-3" key={index}>
                            <NewsItem title={element.title?.slice(0,45)} imageUrl={element.urlToImage} description={element.description?.slice(0, 88)} newsUrl={element.url} source={element?.source} />
                        </div>
                    )
                })}
            </div>
        </div>
        
      
      
      </>

    )
  }
}
