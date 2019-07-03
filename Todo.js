import React, {Component} from 'react';
import {render} from 'react-dom';
import {Popup} from 'semantic-ui-react';

export class Todo extends Component {
  constructor() {
    super(this);
    this.state = {
      'isChecked': false,
      'toDo': "",
      'id': ''
    }
  }

  componentWillMount = () => {
    this.setState({
      'isChecked': this.props.isChecked,
      'toDo': this.props.toDo,
      'id': this.props.checkBoxId
    })
  }

  handleCheckBox = (e) => {
    this.setState({
      'isChecked': !this.state.isChecked
    });
    this.props.onChange(e.target.id, !this.state.isChecked);
  }

  deleteToDo = (e) => {
   this.props.onClick(this.state.id);
  }

  render() {
    return(
      <div className="event">
        <div className="content">
          <div className="summary">
            <div className="ui grid">
              <div class="fourteen wide column">
                <div className="ui checkbox">
                  <input id={this.props.checkBoxId} checked={this.state.isChecked} type="checkbox" onChange={this.handleCheckBox}/>
                  {
                    this.state.isChecked ? 
                    (<label><s>{this.state.toDo}</s></label>) :
                    (<label>{this.state.toDo}</label>)
                  }
                </div>
              </div>
              <div class="one wide column">
                <Popup trigger={<i onClick={this.deleteToDo} class="trash alternate outline icon"></i>} basic>
                  Delete
                </Popup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}