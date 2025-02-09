import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Rating } from 'react-simple-star-rating';



export default function Book (props) {
        console.log(props)
        const [rating, setRating] = useState(props.rating)

        const handleRating = (rate) => {
            setRating(rate)
        }


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
            <Rating onClick={handleRating} />
            </Card.Body>
            </Card>
        )
    }
