import { Col, Container, Row , Image , ListGroup , Form , Button , Alert} from "react-bootstrap";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent" ;
import {Rating} from "react-simple-star-rating" ;
import ImageZoom from "js-image-zoom" ;
import { useEffect } from "react";

const ProductDetailsPage = () => {
    var options = {
        scale: 1.7 ,
        offset:{ vertical : 0 , horizontal : 0 },
    }
    useEffect(()=>{
        new ImageZoom(document.getElementById("first"),options) ;
        new ImageZoom(document.getElementById("second"),options) ;
        new ImageZoom(document.getElementById("third"),options) ;
        new ImageZoom(document.getElementById("fo rth"),options) ;
    })
    return (
        <Container>
            <AddedToCartMessageComponent/>
            <Row className="mt-5">
                <Col style={{zIndex:1}} md={4}>
                    <div id="first">
                        <Image crossOrigin="anonymous" fluid src="/images/games-category.png"/>
                    </div>
                    <div id="second">
                        <Image fluid src="/images/monitors-category.png"/>
                    </div>
                    <div id="third">
                        <Image fluid src="/images/tablets-category.png"/>
                    </div>
                    <div id="forth">
                        <Image fluid src="/images/games-category.png"/>
                    </div>

                    
                    
                    
                   
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><h1>Product Name</h1></ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating readonly size={20}
                                    initialValue={4} /> (1)
                                </ListGroup.Item>
                                <ListGroup.Item>Price <span className="fw-bold">$345</span></ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac Porta ac consectetur acPorta ac consectetur acPorta ac consectetur ac Porta ac consectetur ac Porta ac consectetur ac Porta ac consectetur ac</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <ListGroup>
                                <ListGroup.Item>Status: in stock</ListGroup.Item>
                                <ListGroup.Item>Price : <span className="fw-bold">$345</span></ListGroup.Item>
                                <ListGroup.Item><Form.Select size="lg" aria-label="Default select example">
                                    <option>1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                </Form.Select></ListGroup.Item>
                                <ListGroup.Item>
                                    <Button variant="danger">Add to Cart</Button>
                                </ListGroup.Item>
                                
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-5">
                            <h5>REVIEWS</h5>
                            <ListGroup variant="flush">
                                {Array.from({length:10}).map((item,idx)=>(
                                     <ListGroup.Item key={idx}>
                                        John Doe <br/>
                                        <Rating readonly size={20} initialValue={4}/>
                                        <br/>
                                        20-09-2001 <br/>
                                        this Product look good and affordable cheap user friendly and it's worth the cost This is the most powerful Cupra Formentor you can buy. It's the Formentor VZx and it has the same motor you'll find in a Golf R and Audi S3! It's a powerful hot hatch disguised as a small SUV.
                                     </ListGroup.Item>     
                                )
                                )}
                               
                            </ListGroup>
                        </Col>
                    </Row>
                    <hr />
                    send review form
                    <Alert variant="danger">Login first to write a review</Alert>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Write a review</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Select aria-label="Default select example">
                            <option>Your Rating</option>
                            <option value="5">5 very good </option>
                            <option value="4">4 good</option>
                            <option value="3">3 average</option>
                            <option value="2">2 bad</option>
                            <option value="1">1 awful</option>
                        </Form.Select>
                        <Button variant="danger" className="mb-3 mt-3">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        
    );
}

export default ProductDetailsPage ;