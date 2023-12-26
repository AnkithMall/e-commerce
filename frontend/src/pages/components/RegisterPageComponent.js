import { Col, Container, Row , Form  , Button , Spinner, Alert} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPageComponent = ({ registerUserApiRequest , reduxDispatch , setReduxUserState}) => {
    const [validated, setValidated] = useState(false);

    const [registerUserResponseState,setRegisterUserResponseState] = useState({
        success:"",
        error: "",
        loading: false
    }) ;

    const [passwordsMatchState,setPasswordsMatchState] = useState(true) ;

    const onChange = () => {
        const password = document.querySelector("input[name=password]") ;
        const confirmPassword = document.querySelector("input[name=confirmPassword]") ;
        if(confirmPassword.value === password.value){
            setPasswordsMatchState(true) ;
        }else{
            setPasswordsMatchState(false) ;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const email = form.email.value ;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const password = form.password.value;
        if (event.currentTarget.checkValidity() === true && email && name && lastName && password && form.password.value === form.confirmPassword.value) {
            setRegisterUserResponseState({loading:true}) ;
            registerUserApiRequest(name,lastName,email,password)
            .then(res => {
                setRegisterUserResponseState({success:res.success,loading:false}) ;
                reduxDispatch(setReduxUserState(res.userCreated)) ;
                
            })
            .catch(err => console.log(err))
        }

        setValidated(true);
    };
    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h1>Register</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>Enter your name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Your name"
                                    name="name"
                                />
                                <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Your Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Your Last name"
                                    name="lastName"
                                />
                                <Form.Control.Feedback type="invalid">Please Enter Your Last Name</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                name="email"
                                    required
                                    type="email"
                                    placeholder="Enter email"
                                />
                                <Form.Control.Feedback type="invalid">Please Enter a Valid Email Address</Form.Control.Feedback>
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
                            <Row className="pb-2">
                                <Col>
                                Do you have an account already?
                                <Link to={"/login"}>Login</Link>
                                </Col>
                            </Row>
                        <Button type="submit">
                            {
                                registerUserResponseState && registerUserResponseState.loading === true ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : ("")
                            }
                            Submit</Button>
                            <Alert show={
                                registerUserResponseState && registerUserResponseState.error === "User Already Exists!"
                            } variant="danger">
                                User with that email already exists!
                            </Alert>
                            <Alert show={
                                registerUserResponseState && registerUserResponseState.success === "User Created"
                            } variant="info">
                                User created
                            </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPageComponent;