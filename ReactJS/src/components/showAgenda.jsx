import React, { Component } from "react";

class ShowAgenda extends Component {
  render() {
    return (
      <div>
 
        <div className="container" role="viewAgenda">
          <button onClick={()=> this.props.togglePage()} className="btn btn-info" role="goToAdd">Click To Add Agenda</button>
          {/* iterate the agenda details to display */ }
          {this.props.data.map((d)=>{
            return(

            <div key={d.title} className="card my-3" role="cards">
              <div className="card-header">
                {/* {title} */ }
                {d.title}
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {/* iterate the topics to display */ }
                  {d.topics.map((topic)=>{
                    return(
                    <li key={topic} className="list-group-item">
                      {/* {topic} */ }
                      {topic}
                    </li>

                    )
                  })}
                </ul>
              </div>
              <div className="card-footer">
                {/* {description} */ }
                {d.description}
              </div>
          </div>
            )
          })}

        </div>
      </div>
    )
  }
}

export default ShowAgenda;