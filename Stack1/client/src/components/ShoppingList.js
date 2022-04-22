// Importing 

import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux' // allows us to getState from redux into a react component
import { getItems, deleteItem } from '../actions/itemActions'

// This is part of react
// whenever you component properties you should put them inside of prop types
// which is a form of validation
import PropTypes from 'prop-types'


class ShoppingList extends Component { // < ----- Inheritance

static propTypes = {
    // we have 2 props
    // the action getItems will be a prop
    // when you bring an actions from redux it will be a prop

// setting getItems to proptypes.func.isRequired 
    getItems: PropTypes.func.isRequired,

    // this represents our state so it will be an object
    item: PropTypes.object.isRequired   , 
    
    isAuthenticated: PropTypes.bool

}
    componentDidMount() {

        this.props.getItems();
    
    }

    // The _id from mongoDB gets passed as id in this function 
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
        // we are calling the delete action
    }

render() {



const { items } = this.props.item; 

        return(
            // Wrap everything in the container 
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {/* Inside the transition group we want to map through the MongoDB database for the unique _id */}
                        {items.map(({ _id, name }) => ( // Now we are using MongoDB _id
                        // below CSSTransition is a styling effect
                                    //Id for the item, timeout to 500 ms
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            {/* The ListGroup Items actually displays the item after being looped */}
                            <ListGroupItem>
                                {this.props.isAuthenticated ? (
                                <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={
                                    this.onDeleteClick.bind(this, _id)
                                    // onDeleteClick needs to take in MongoDB _id,
                                    // it needs to know the _id so the way to pass it in is by .bind(this, _id(the MongoDB _id we need))
                                    }>&times;</Button>) : ('') }
                                {name}
                            </ListGroupItem>
                        </CSSTransition>

                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>

        )
    }

}

// Under the Shopping list component





// this is the fxn to change into a componnent
const mapStateToProps = (state) => ({
    // its item because we called in our reducer root(index.js) the object name is 'item'
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);


