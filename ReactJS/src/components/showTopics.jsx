import React, { Component } from "react";

class ShowTopics extends Component {
  render() {
    return (
      <div>
        <div className="card my-3">
          <div className="card-header">Added Topics</div>
          <div className="card-body">
            <ul className="list-group">
              {this.props.topics.map((topic)=>{
                return(
                  <li key={topic} className="list-group-item" role="topicList">{topic}</li>
                )                
              })}            
            </ul>
          </div>
          <div className="card-footer">Refer the topics you added</div>
        </div>
      </div>
    )
  }
}

export default ShowTopics;