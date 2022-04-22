import React, { Component } from "react";
import {
    Button, 
    Modal, 
    ModalHeader,
    ModalBody,
    Form, 
    FormGroup,
    Label, 
    Input, 
    NavLink,
    Alert
} from 'reactstrap'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'


class RegisterModal extends Component {
    state = {
        modal: false, // this reps if the modal is open or not
        
        // form with the modal name
        name: '' ,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool, 
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
    // when we map the error state to our props we want to see if it changed at all

        const { error, isAuthenticated } = this.props
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL') {
            this.setState({ msg: error.msg.msg})
            } else {
                this.setState({ msg: null })
            }
        }

        // If authenticated, close modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle()
            }
        }
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

        const { name, email, password } = this.state

        // Create a user object
        const newUser = {
            name, 
            email,
            password
        }

        // Attempt to register
        this.props.register(newUser)
    }

    // To show the modal
    render() {
        return(
            <div>
                                                {/* # mean no where */}
                <NavLink onClick={this.toggle} href="#">
                    Register
                    </NavLink> 

                <Modal
                // Set equal to whatever the state modal is
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? (<Alert color='danger'>{ this.state.msg }</Alert>) : null }
                      <Form onSubmit={this.onSubmit}>
                          <FormGroup>
                              <Label for="name">Name</Label>
                              <Input 
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Add Name Here"
                            //   w/ react when you have an input you want to set onChange to a fxn
                                //  When we type inside the input the onChange will fire off 
                                // We then want to set the state of name to whatever in typed into input 
                              onChange={this.onChange}
                              />
                               <Label for="email">Email</Label>
                              <Input 
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Add Email"
                              onChange={this.onChange}
                              /> <Label for="password">Password</Label>
                              <Input 
                              type="text"
                              name="password"
                              id="password"
                              placeholder="Add Password"
                              onChange={this.onChange}
                              />
                              <Button
                              color="dark"
                              style={{marginTop: '2rem'}}
                              block
                              >Register</Button>
                          </FormGroup>
                          </Form>  
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // to close the state once you get authentication from token
    isAuthenticated: state.auth.isAuthenticated,
    error: state.er // from index.js in reducer
})

export default connect(mapStateToProps, { register })(RegisterModal)