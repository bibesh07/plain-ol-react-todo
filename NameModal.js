import React, {Component} from 'react'
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'

export class NameModal extends Component {
  constructor() {
    super(this);
    this.state = {
      'name': '',
      'disabled': true,
      'isModalOpen': false
    }
  }

  componentWillMount = () =>{
    this.setState({
      'isModalOpen': this.props.isModalOpen
    })
  }

  onChange = (e) => {
    let newName = e.target.value;
    let shouldDisable = true;
    this.setState({
      [e.target.name]: newName,
    });

    if (newName.length > 0) {
      shouldDisable = false;
    }

    this.setState({
        'disabled': shouldDisable,
      });
  }

  saveNameAndClose = () => {
    localStorage.setItem('userName', this.state.name);
    this.setState({'isModalOpen': false});
    this.props.onChange(this.state.name);
  }

  render() {
    return (
      <Modal open={this.state.isModalOpen} size='mini' closeOnEscape={true} closeOnDimmerClick={false}>
      <Header icon='archive' content={'Todo List for ' + this.state.name} />
      <Modal.Content>
        <Input name="name" icon='user' iconPosition='left' placeholder='Enter your name' onChange={this.onChange}/>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={this.saveNameAndClose} disabled={this.state.disabled} color='green' inverted>
          <Icon name='checkmark' /> I'm Ready
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}