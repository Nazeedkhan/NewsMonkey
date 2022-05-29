import React, { useEffect, useState } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News = (props) => {

      const capitalize = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
      }


      const [articles, setArticles] = useState([])
      const [loading, setLoading] = useState(true)
      const [page, setPage] = useState(1)
      const [totalResults, setTotalResults] = useState(0)
      document.title = `NewsMonkey - ${capitalize(props.category)}`



      const updateNews = async () => {
            props.setProgress(10);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
            props.setProgress(30);
            setLoading(true);
            props.setProgress(50);
            let data = await fetch(url);
            let parseData = await data.json();
            props.setProgress(70);
            setArticles(parseData.articles)
            setTotalResults(parseData.totalResults)
            setLoading(false)
            props.setProgress(100);
      }
      useEffect(() => {
            updateNews();
      }, []);

      const handlePrevClick = async () => {
            setPage(page - 1);
            updateNews();
      }

      const handleNextClick = async () => {
            setPage(page + 1);
            updateNews();

      }

      return (
            <div className='container my-3 '>
                  <h1 className='text-center' style={{ marginTop: "5rem" }} >Latest News-Top {capitalize(props.category)}  Headlines</h1>
                  {loading && <Spinner />}

                  <div className="row my-4">
                        {!(loading) && articles.map((element) => {
                              return <div className="col md-4" key={element.url}>
                                    <Newsitems title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                              </div >
                        })}

                  </div>
                  <div className="container d-flex justify-content-between">
                        <button disabled={page <= 1} type='button' className='btn btn-dark' onClick={handlePrevClick} > &larr; Previous</button>
                        <button type='button' className='btn btn-dark' onClick={handleNextClick} >Next &rarr;</button>
                  </div>
            </div>
      )
}


News.defaultProps = {
      country: "in",
      pageSize: 6,
      category: "general"
}
News.propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
}

export default News
