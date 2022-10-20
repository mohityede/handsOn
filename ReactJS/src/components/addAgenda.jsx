import React, { Component } from "react";
import ShowTopics from "./showTopics";

class AddAgenda extends Component {
  constructor() {
    super();
    this.state = {
      addTopicBtn: false,
      submitAgendaBtn: false,
      topicsAdded:[],
      input: {
        title: "",
        description: "",
        topic: ""
      }
    }
  }

  render() {
    const checkSubmitBtn = ()=>{
      if(this.state.input.title !== "" && this.state.input.description !== "" && this.state.topicsAdded.length > 0) 
        this.setState({submitAgendaBtn: true}) 
      else this.setState({submitAgendaBtn:false})
    }
    const checkTopicBtn = ()=>{
      if(this.state.input.topic !== "") 
        this.setState({addTopicBtn: true}) 
      else this.setState({addTopicBtn:false})
    }
    const changeTitle = (e) => { 
      var val=e.target.value;
      if(val.trim() === "") val = val.trim();     
      this.setState({ input: {...this.state.input, title: val } },()=> checkSubmitBtn());
    } 
    const changeDes = (e) => {      
      var val=e.target.value;
      if(val.trim() === "") val = val.trim();
      this.setState({ input: {...this.state.input , description: val } },()=>checkSubmitBtn());     
    } 
    const changeTopic = (e) =>{
      var val=e.target.value;
      if(val.trim() === "") val = val.trim();
      this.setState({ input: {...this.state.input, topic: val } },()=> checkTopicBtn());
    }
    const handleAddTopicBtn = (e)=>{
      e.preventDefault();
      this.setState({topicsAdded: [...this.state.topicsAdded,this.state.input.topic]},()=> checkSubmitBtn());
      this.setState({ input: {...this.state.input, topic: "" } },()=> checkTopicBtn());
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      this.setState({topicsAdded:[],input:{title:"",description:"",topic:""}},()=>{
        checkSubmitBtn();
        checkTopicBtn();
      })
      var obj={
        title: this.state.input.title,
        description: this.state.input.description,
        topics: this.state.topicsAdded
      }
      this.props.onSubmit(obj);

    }
    return (
      <div>
        {/* <h3>AddAgenda component</h3> */ }
        <div className="container" role="addAgenda">
          <button onClick={(e)=> this.props.togglePage(e)} className="btn btn-info" role="goToView">Click To View Agenda</button>
          <form>
            <div className="my-3">
              <label className="form-label">Title</label>
              {/* title */ }
              <input value={ this.state.input.title } onChange={ (e) => changeTitle(e) } type="text" name="newTitle" placeholder="Enter the title" className="form-control" role="inputTitle" />
              <small className="text-danger" data-testid="invalidTitle">
                {(this.state.input.title === "") ?"Title is required":""}
                {/**
                         * show empty string if title input is valid
                         * else show 'Title is required'
                         */}
              </small>
            </div>
            <div className="my-3">
              <label className="form-label">Description</label>
              {/* description */ }
              <input value={ this.state.input.description } onChange={ (e) => changeDes(e) }  type="text" name="newDescription" placeholder="Enter the description" className="form-control" role="inputDescription" />
              <small className="text-danger" data-testid="invalidDescription">
                {(this.state.input.description === "") ?"Description is required":""}
                {/**
                         * show empty string if description input is valid
                         * else show 'Description is required'
                         */}
              </small>
            </div>
            <div className="my-3 w-50">
              <label className="form-label">Enter topic</label>
              {/* topic */ }
              <input value={ this.state.input.topic } onChange={ (e) => changeTopic(e) } type="text" name="newTopic" placeholder="Enter the topic" className="form-control" role="inputTopic" />
              <small className="text-danger" data-testid="invalidTopic">
                {(this.state.input.topic === "" && this.state.topicsAdded.length < 1) ?"Topic is required":""}
                {/**
                            * show empty string if topic input is valid
                            * else show 'Topic is required'
                            */}
              </small>
            </div>
            {/* on click should add topics and disable the button if invalid topic */ }
            <button onClick={(e)=> handleAddTopicBtn(e)} disabled={ !this.state.addTopicBtn } className="btn btn-success addAlign" role="addTopicBtn">+ Add Topic</button>
            {/* on click should add agenda details and disable the button if invalid inputs */ }
            <button onClick={(e)=> handleSubmit(e)} disabled={ !this.state.submitAgendaBtn } className="btn btn-success submitAlign" role="submitAgendaBtn">Submit Agenda</button>
          </form>
          {/* show if no topics added yet */ }
          {
            (this.state.topicsAdded.length === 0) ?
            <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
              No Topics Added
            </div>
            :
            <ShowTopics topics={this.state.topicsAdded}></ShowTopics>
          }
          
          {/* display the list of topics added using li */ }
          
        </div>
      </div>
    )
  }
}

export default AddAgenda;