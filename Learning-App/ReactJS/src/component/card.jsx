import React, { Component } from "react";

class Card extends Component {

  render() {
    
    return (
      <div className="card">
        <ul>
          <div className="header">
            <li>{ this.props.obj.courseName }</li>
            <li>{ this.props.obj.courseDept }</li>
            <li>{ this.props.obj.description }</li>
            { (this.props.obj.isApplied )?
              <li>
                {(!this.props.obj.isRated) &&
                <li>Rate:
                  <select onChange={(e)=> this.props.handleRating(e)} className="rating" name="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  <button onClick={() => this.props.handleAddRating(this.props.obj._id)} className="rate">Add</button>
                </li>                
                }
                <button onClick={() => this.props.handleDrop(this.props.obj._id)} className="drop">Drop Course</button>
              </li>
              :
              <li><button onClick={() => this.props.handleApply(this.props.obj._id)} className="btn">Apply</button></li>
            }

          </div>
          <div className="footer">
            <li></li>
          </div>
        </ul>
      </div>
    )
  }
}

export default Card;