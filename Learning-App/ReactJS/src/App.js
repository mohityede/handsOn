import React, { Component } from 'react';
import "./App.css"
// import Card from './component/card';

class Home extends Component {
  constructor(){
    super()
    // console.log("consotructor")
  }

  state = {
    show: false,
    data: [],
    rating: 1,
  }
  componentDidMount = async () => {
    // Write your code here
    // console.log("CDM")
    const d = await this.handleGetData();
    // console.log(d);
    this.setState({ data: d });
  }

  handleGetData = async () => {
    // Write your code here
    try {
      // console.log("handleGetData");
      const data = await fetch('http://localhost:8001/courses/get')
      return data.json();
    } catch (err) {
      console.log("error while getting data", err);
    }
  }

  handleApply = async (id) => {
    // Write your code here
    try {
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      await fetch(`http://localhost:8001/courses/enroll/${id}`, options)
        .then((res) => {
          return res.json();
        }).then((json) => {
          alert(json.message)
          // console.log("data: ",json)
          this.componentDidMount();
        })
    } catch (err) {
      console.log("error while rating course", err);
    }
  };

  handleRating = (e) => {
    // Write your code here
    this.setState({ rating: parseInt(e.target.value) })
    // console.log(this.state);
  }

  handleAddRating = async (id) => {
    // Write your code here
    // console.log("rating:",this.state,"id:",id);
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: this.state.rating }),
      };
      await fetch(`http://localhost:8001/courses/rating/${id}`, options)
        .then((res) => {
          return res.json();
        }).then((json) => {
          alert(json.message)
          // console.log("data: ",json)
          this.componentDidMount();
        })
    } catch (err) {
      console.log("error while rating course", err);
    }
  }

  handleDrop = async (id) => {
    // Write your code here
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      await fetch(`http://localhost:8001/courses/drop/${id}`, options)
        .then((res) => {
          return res.json();
        }).then((json) => {
          alert(json.message)
          // console.log("data: ",json)
          this.componentDidMount();
        })
    } catch (err) {
      console.log("error while dropping course", err);
    }
  }

  render() {
    // console.log("render")
    return (
      <div className="home">
        <header>
          <h2>ABC Learning</h2>
        </header>
        {/* write your code here */ }
        <div className="cardContainer">
          {
            this.state.data.map((course) => {
              return (
                <div key={course._id} className="card">
                  <ul>
                    <div className="header">
                      <li>{ course.courseName }</li>
                      <li>{ course.courseDept }</li>
                      <li>{ course.description }</li>
                      { (course.isApplied) ?
                        <li>
                          { (!course.isRated) &&
                            <li>Rate:
                              <select onChange={ (e) => this.handleRating(e) } className="rating" name="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                              <button onClick={ () => this.handleAddRating(course._id) } className="rate">Add</button>
                            </li>
                          }
                          <button onClick={ () => this.handleDrop(course._id) } className="drop">Drop Course</button>
                        </li>
                        :
                        <li><button onClick={ () => this.handleApply(course._id) } className="btn">Apply</button></li>
                      }

                    </div>
                    <div className="footer">
                      <li>{`${course.duration} hrs . ${course.noOfRatings} Ratings . ${course.rating}/5`}</li>
                    </div>
                  </ul>
                </div>
                // <Card key={course._id} handleRating={this.handleRating} handleAddRating={this.handleAddRating} handleDrop = {this.handleDrop} handleApply = {this.handleApply} obj={course} /> 
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Home;