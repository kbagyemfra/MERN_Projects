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
import { login } from '../../actions/authActions'


class LoginModal extends Component {
    state = {
        modal: false, // this reps if the modal is open or not
        // form with the modal name
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool, 
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps) {
    // when we map the error state to our props we want to see if it changed at all

        const { error, isAuthenticated } = this.props
        if(error !== prevProps.error) {
            // Check for Login error
            if(error.id === 'LOGIN_FAIL') {
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

        const { email, password } = this.state

        const user = {
            email,
            password
        }

        // Attempt to login
        this.props.login(user)
    }

    // To show the modal
    render() {
        return(
            <div>
                                                {/* # mean no where */}
                <NavLink onClick={this.toggle} href="#">
                    Login
                    </NavLink> 

                <Modal
                // Set equal to whatever the state modal is
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? (<Alert color='danger'>{ this.state.msg }</Alert>) : null }
                      <Form onSubmit={this.onSubmit}>
                          <FormGroup>
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
                              >Login</Button>
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

export default connect(mapStateToProps, { login })(LoginModal)