import React, { Component } from "react";
import {
    Button, 
    Modal, 
    ModalHeader,
    ModalBody,
    Form, 
    FormGroup,
    Label, 
    Input
} from 'reactstrap'

import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions' // Importing the action addItem

import PropTypes from 'prop-types'

class ItemModal extends Component {
    state = {
        modal: false, // this reps if the modal is open or not
        
        // form with the modal name
        name: '' 
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    // Just like the Navbar
    toggle = () => {
        this.setState({
            // setting the modal value to whatever it is not
            modal: !this.state.modal
        })
    }

    // e = event parameter
    onChange = (e) => {
                // e.target.name will be whatever the input value is for name
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name // when we type in the UI it updates the state.name
        }

        // Add item via addItem action
        this.props.addItem(newItem)

        // close the Modal
        this.toggle()
    }

    // To show the modal
    render() {
        return(
            <div>
                { this.props.isAuthenticated ? (
                <Button
                color='dark'
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Add Item</Button> ) : ( <h4 className="mb-3 ml-4">Please Login to manage Items</h4> )}


                <Modal
                // Set equal to whatever the state modal is
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={this.onSubmit}>
                          <FormGroup>
                              <Label for="item">Item</Label>
                              <Input 
                              type="text"
                              name="name"
                              id="item"
                              placeholder="Add shopping item"
                            //   w/ react when you have an input you want to set onChange to a fxn
                                //  When we type inside the input the onChange will fire off 
                                // We then want to set the state of name to whatever in typed into input 
                              onChange={this.onChange}
                              />
                              <Button
                              color="dark"
                              style={{marginTop: '2rem'}}
                              block
                              >Add Item</Button>
                          </FormGroup>
                          </Form>  
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal)