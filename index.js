import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import {Todo} from './Todo.js';
import {NameModal} from './NameModal.js';
import {Popup} from 'semantic-ui-react';

const tempList = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      userName: localStorage.getItem('userName'),
      openModal: false,
      newToDoButton: true,
      list:localStorage.getItem('list') == null ? [] : JSON.parse(localStorage.getItem('list'))
    };
  }

  componentWillMount = () => {
    if (this.state.userName == null) {
      this.setState({'openModal' : true});
    }
  }

  initiateList = () => {
    return this.state.list.map((x, i) => {
       return(
          <Todo key={x.id} onClick={this.delete} checkBoxId={x.id} onChange={this.updateList} isChecked={x.done} toDo={x.toDo}/>
       );
    })
  }

  LogOut = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('list');
    window.location.reload();
  }

  handleCheckBox = (e) => {
    console.log(e.target);
  }

  setUserName = (name) => {
    this.setState({'userName': name});
  }

  updateList = (id, what) => {
    tempList = this.state.list;
    tempList[tempList.findIndex(x => x.id == id)].done = what;
    this.setState({
      'list': tempList
    });
    localStorage.setItem('list', JSON.stringify(this.state.list));
  }

  addNewToDo = () => {
    tempList = this.state.list;
    tempList.push({
      'id' : this.state.list.length + 1,
      'toDo': document.getElementById('newToDo').value,
      'done': false
    });
    document.getElementById('newToDo').value = '';
    this.setState({'newToDoButton': true, 'list': tempList});
    localStorage.setItem('list', JSON.stringify(this.state.list));
  }

  onChangeNewToDo = (e) => {
    if (e.target.value != "") {
      this.setState({'newToDoButton': false});
    } else {
      this.setState({'newToDoButton': true});
    }
  }

  delete = (id) => {
    tempList = this.state.list.filter(x => x.id != id);
    this.setState({
      'list': tempList
    });
    localStorage.setItem('list', JSON.stringify(this.state.list));
  }

  render() {
    return (
        <div className="ui centered card" id="to-do-list">
          <NameModal isModalOpen={this.state.openModal} onChange={this.setUserName}/>
          <div className="content">
              <Popup trigger={<i onClick={this.LogOut} class="right floated logout icon" id="logOut"></i>} basic>
                Logout!
              </Popup>
            <div className="header">To do List For {this.state.userName} </div>
            <div class="ui grid">
                <div class="eight wide column">
                  <small>
                    <i className="icon check circle green"></i>Completed: {this.state.list.filter(x => x.done == true).length}
                  </small>
                </div>
                <div class="eight wide column">
                  <small>
                    <i className="icon exclamation circle red"></i>Remaining: {this.state.list.filter(x => x.done == false).length}
                  </small>
                </div>
            </div>
          </div>
          <div className="content">
            <h4 className="ui sub header">Activity</h4>
              <div className="ui small feed">
                {this.initiateList()}
            </div>
          </div>
          <div class="extra content">
            <div class="ui form">
            <div class="field">
              <label>New To-do</label>
              <textarea rows="3" id="newToDo" onChange={this.onChangeNewToDo}></textarea>
            </div>
            <button onClick={this.addNewToDo} className="ui button blue right" disabled={this.state.newToDoButton}> <i className="icon add"></i> Add new to-do</button>
          </div>
          </div>
        </div>
    );
  }
}

render(<App />, document.getElementById('root'));
