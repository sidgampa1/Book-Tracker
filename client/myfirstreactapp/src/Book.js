import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Rating } from 'react-simple-star-rating';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import statusMap from './statusMap';

const statusMap = {
    0: "Completed",
    1: "Currently Reading",
    2: "Want to Read"
}
export default function Book (props) {
        console.log(props)
        const [rating, setRating] = useState(props.rating)
        // const [status, setStatus] = useState(props.readStatus)

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
        
        // const handleStatus = (state) => {
        //     try {
        //         props.addBook(props.id, state)
        //     }
        //     catch (err) {
        //         console.log(err)
        //     } 
        //     finally {
        //         setStatus(state)
        //     }
        // }
        
        

        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.cjs/100px180" />
            <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                Summary of book {props.title}
            </Card.Text>
            {/* <Button variant="primary" onClick={() => props.addBook(props.id, props.readStatus)}>Add</Button>
            <Button variant="primary" onClick={() => props.deleteBook(props.id)}>Delete</Button> */}
            <DropdownButton id="dropdown-basic-button" title={statusMap[props.readStatus]}>
            <Dropdown.Item onClick={() => {console.log("Update to 0")}}>{statusMap[0]}</Dropdown.Item>
            <Dropdown.Item onClick={() => {console.log("Update to 1")}}>{statusMap[1]}</Dropdown.Item>
            <Dropdown.Item onClick={() => {console.log("Update to 2")}}>{statusMap[2]}</Dropdown.Item>
            </DropdownButton>
            <Rating onClick={handleRating} initialValue={props.rating} />
            </Card.Body>
            </Card>
        )
    }
