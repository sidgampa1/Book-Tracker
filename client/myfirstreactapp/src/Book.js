import React from 'react'

export default class Book extends React.Component{
    apiLink = process.env.REACT_APP_BOOKS_LINK;

    constructor(props) {
        super(props);
        this.state = {
            rating: ""
        }
    }
    render() {
        return (
            <div>{this.props.title}</div>
        )
    }
}