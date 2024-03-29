import { Col, Container, Row , Form  , Button , Alert} from "react-bootstrap";
import { useState } from "react";


const UserProfilePageComponent = ({updateUserApiRequest}) => {
    const [validated, setValidated] = useState(false);
    const [updateUserResponseState,setUpdateUserResponseState] = useState({
        success:"", error:""
    }); 
    const [passwordsMatchState, setPasswordsMatchState] = useState(true) ;

    const onChange = () => {
        const password = document.querySelector("input[name=password]") ;
        const confirmPassword = document.querySelector("input[name=confirmPassword]") ;
        if(confirmPassword.value === password.value){
            setPasswordsMatchState(true) ;
        }else{
            setPasswordsMatchState(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value ;
        const lastName = form.lastName.value ;
        const phoneNumber = form.phoneNumber.value ;
        const address = form.address.value ;
        const country = form.country.value ;
        const zipCode = form.zipCode.value ;
        const city = form.city.value ;
        const state = form.state.value ;
        const password = form.password.value ;
        if (event.currentTarget.checkValidity() === true && form.password.value === form.confirmPassword.value) {
            updateUserApiRequest(name,lastName,phoneNumber,address,country,zipCode,city,state,password).then(data => {
                setUpdateUserResponseState({success:data.success,error:""}) ;     
            }).catch(err => {
                setUpdateUserResponseState({error: err.response.data.message ? err.response.data.message : err.response.data})
            }) ;
        }

        setValidated(true);
    };
    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h1>User Profile</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>Enter your name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue="John"
                                    name="name"
                                />
                                <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Your Last name</Form.Label>
                                <Form.Control
                                   
                                    required
                                    type="text"
                                    defaultValue="Doe"
                                    name="lastName"
                                />
                                <Form.Control.Feedback type="invalid">Please Enter Your Last Name</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                 disabled
                                value="john@doe.com if you want to change email, remove account and create new one with new email address"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                               type="text"
                                placeholder="Enter your phone number"
                                defaultValue=""
                                name="phoneNumber"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                               type="text"
                                placeholder="Enter your street name and house number"
                                defaultValue=""
                                name="address"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                               type="text"
                                placeholder="Enter your country"
                                defaultValue=""
                                name="country"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicZip">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                               type="text"
                                placeholder="Enter your Zip code"
                                defaultValue=""
                                name="zipCode"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                               type="text"
                                placeholder="Enter your city"
                                defaultValue=""
                                name="city"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicState">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                               type="text"
                                placeholder="Enter your state"
                                defaultValue=""
                                name="state"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                name="password"
                                    required
                                    type="password"
                                    placeholder="Password"
                                    minLength={6}
                                    onChange={onChange}
                                    isInvalid={!passwordsMatchState}
                                />
                                <Form.Control.Feedback type="invalid">Please Enter a Valid password</Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Password should have at least 6 characters
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control
                                name="confirmPassword"
                                    required
                                    type="password"
                                    placeholder="Repeat Password"
                                    minLength={6}
                                    onChange={onChange}
                                    isInvalid={!passwordsMatchState}
                                />
                                <Form.Control.Feedback type="invalid">Both password should match</Form.Control.Feedback>
                            </Form.Group>
                        <Button variant="primary" type="submit">
                            
                            Update</Button>
                            <Alert className="mt-3" show={updateUserResponseState && updateUserResponseState.error !== ""} variant="danger">
                                User with that email already exists!
                            </Alert>
                            <Alert show={updateUserResponseState && updateUserResponseState.success === "User Updated"} variant="info">
                                User updated
                            </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfilePageComponent ;