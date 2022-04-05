// Importing React and its properties into the file
import React, { Component, Fragment } from 'react';
import {
    Collapse, // To have a toggler, hamburgr menu
    Navbar,   // Actual Navbar or menu bar
    NavbarToggler, // ^^^
    NavbarBrand, // Actual Brnd on the Navbar
    Nav,        // Will wrap around all the links
    NavItem,    // Will wrap the NavLink
    NavLink,    // Nav Link will hav the href 
    Container   // contain everything to the middle
} from 'reactstrap'

import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import RegisterModal from './Auth/RegisterModal';
import LoginModal from './Auth/LoginModal';
import Logout from './Auth/Logout';

class AppNavbar extends Component {
    // need the is open state 
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    // Now the toggle we will change what ever the state is to the opposite
    // If it isOpen then we use in toggle is not open or --> !this.state.isOpen
    // Not equal to isOpen

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    // create the render

    render() {
        // pulling out from props
        const { isAuthenticated, user } = this.props.auth

        // user that are logged in
        const authLinks = (
            <Fragment>
                <NavItem>
                    <Logout />
                </NavItem>
                <NavItem>
                    <span className="navbar-text mr-c">
                        <strong>{user ? `WELCOME ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
            </Fragment>
        )

        // users that are guest
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )

        return (

            // We want to render our NavBar using the companents above

            <div>
                {/*     *color is the color of the bar
                    *dark gives the writing in a light color so you can read words
                    *expand lets you expand or respond depending on the screen size
                     it depending on the device, you can use sm, md or lg
                     sm is for small screens
                    *className is margin bottom 5 which moves everything under the Navbar       */}
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoppingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>)

    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
