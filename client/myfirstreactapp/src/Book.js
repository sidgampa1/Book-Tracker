import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class Book extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            rating: ""
        }
    }
    render() {
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.cjs/100px180" />
            <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>
                Summary of book {this.props.title}
            </Card.Text>
            <Button variant="primary" onClick={() => this.props.addBook(this.props.id, this.props.readStatus)}>Add</Button>
            <Button variant="primary" onClick={() => this.props.deleteBook(this.props.id)}>Delete</Button>
            </Card.Body>
            </Card>
        )
    }
}