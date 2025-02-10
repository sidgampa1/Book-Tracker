import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Rating } from 'react-simple-star-rating';



export default function Book (props) {
        console.log(props)
        const [rating, setRating] = useState(props.rating)

        const handleRating = (rate) => {
            try {
                props.addBook(props.id, props.readStatus, rate)
            }
            catch (err) {
                console.log(err)
            } 
            finally {
               setRating(rate)
            }
            }


        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.cjs/100px180" />
            <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                Summary of book {props.title}
            </Card.Text>
            <Button variant="primary" onClick={() => props.addBook(props.id, props.readStatus)}>Add</Button>
            <Button variant="primary" onClick={() => props.deleteBook(props.id)}>Delete</Button>
            <Rating onClick={handleRating} initialValue={props.rating} />
            </Card.Body>
            </Card>
        )
    }
