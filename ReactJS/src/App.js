/* eslint-disable jsx-a11y/aria-role */
import React, { Component } from "react";
import AddAgenda from "./components/addAgenda";
import ShowAgenda from "./components/showAgenda";

class App extends Component {

  /**
 * keep this following data as default data in agenda details as it is required for testing
 * [
      {
        title: "Angular",
        description: "Some description about the angular",
        topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
      },
      {
        title: "Vue",
        description: "Some description about the vue",
        topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
      },
    ],
 */
  
  state = {
    // your data goes here
    isShowAgenda: false,
    data:[
      {
        title: "Angular",
        description: "Some description about the angular",
        topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
      },
      {
        title: "Vue",
        description: "Some description about the vue",
        topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
      },
    ]
  }

  togglePage = ()=>{
    this.setState({isShowAgenda: (this.state.isShowAgenda ? false: true)});
  }
  onSubmit= (d)=>{
    this.setState({data:[...this.state.data,d]});
  }
  render() {
    return (
      <div>
        <h1 className="mx-5 mb-5">Agenda Manager</h1>
        {/* show/hide this following add agenda template */ }
        { (this.state.isShowAgenda) ? <ShowAgenda data={this.state.data} togglePage={this.togglePage}/> : <AddAgenda onSubmit={this.onSubmit} togglePage={this.togglePage}/> }
        {/* show/hide this following view agenda template */ }
      </div>
    );
  }

}

export default App;
