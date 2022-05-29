import React from 'react'

const Newsitems = (props) => {
      let { title, description, imageurl, newsurl, author, date, source } = props;
      return (
            <div container="my-3" id='margin'>

                  <div className="card" style={{ width: "18rem" }}>
                        <div>
                              <span className="badge rounded-pill bg-danger" id='badge'>
                                    {source}
                              </span>
                        </div>
                        <img src={!imageurl ? "https://images.moneycontrol.com/static-mcnews/2021/07/Airline-770x433.jpg" : imageurl} className="card-img-top" alt="..." />
                        <div className="card-body">
                              <h5 className="card-title">{title}...</h5>
                              <p className="card-text">{description}...</p>
                              <p className="card-text"><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                              <a href={newsurl} target="_main" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                  </div>
            </div>
      )
}

export default Newsitems


