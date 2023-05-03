import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
import {Link} from "react-router-dom";

const AddedToCartMessageComponent = () => {
    const [show,setShow] = useState(true) ;
    return (
        <Alert className="mt-3" show={show} variant="success" onClose={()=>setShow(false)} dismissible>
            <Alert.Heading>The Product was added to your cart!</Alert.Heading>
            <p>
                <Button variant="success">Go back</Button>{" "}
                <Link to="/cart">
                    <Button variant="danger">Go to Cart</Button>
                </Link>
            </p>
            
        </Alert>
    );
}

export default AddedToCartMessageComponent ;