import React from 'react'

export default class Book extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            rating: ""
        }
    }
    render() {
        return (
            <div>
            <div>{this.props.title}</div>
            <div><button onClick={() => this.props.deleteBook(this.props.id)}>Delete</button></div>
            <div><button onClick={() => this.props.addBook(this.props.id, this.props.readStatus)}>Add</button></div>
            </div>
        )
    }
}