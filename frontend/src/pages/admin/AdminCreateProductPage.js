import { Col, Container, Form, Row, Button, CloseButton, Table , Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminCreateProductPage = () => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={2}>
                    <Link to="/admin/products" className="btn btn-info my-3">
                        Go Back
                    </Link>
                </Col>
                <Col md={6}>
                    <h1>Create new product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTextarea">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" required as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control name="count" required type="number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category
                                <CloseButton />{<small>Remove Selected</small>}
                            </Form.Label>
                            <Form.Select
                                required
                                name="category"
                                aria-label="Default Select"
                            >
                                <option value="">Choose Category</option>
                                <option value="1">Laptops</option>
                                <option value="2">TV</option>
                                <option value="3">Games</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNewCategory">
                            <Form.Label>
                                Or Create New Category
                            </Form.Label>
                            <Form.Control name="newCategory" type="text" />
                        </Form.Group>

                        <Row className="mt-5">
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributes">
                                    <Form.Label>Choose attribute and set values</Form.Label>
                                    <Form.Select name="attrKey" aria-label="Default select example" >
                                        <option>Chosse attribute</option>
                                        <option value="red">Color</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                                    <Form.Label>Attribute value</Form.Label>
                                    <Form.Select name="attrKey" aria-label="Default select example" >
                                        <option>Chosse attribute value</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Value</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>attr key</td>
                                        <td>attr Value</td>
                                        <td>
                                            <CloseButton/>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                                    <Form.Label>Create New Attribute</Form.Label>
                                    <Form.Control disabled={false} placeholder="first chodse or create category" name="newAttrValue" type="text" />
                                    
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                                    <Form.Label>Attribute Value</Form.Label>
                                    <Form.Control disabled={false} placeholder="first chodse or create category" required={true} name="newAttrValue" type="text" />
                                    
                                </Form.Group>
                            </Col>
                        </Row>

                        <Alert variant="primary">

                        </Alert>

                        <Form.Group className="mb-3 mt-3" controlId="formBasicImages">
                            <Form.Label>Images</Form.Label>
                            <Form.Control required type="file" multiple />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminCreateProductPage;