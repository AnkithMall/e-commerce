import ProductCarouselComponent from "../components/ProductCarouselComponent";
import CategoryCardsCoponent from "../components/CategoryCardsComponent";
import Row from 'react-bootstrap/Row';
import { Container } from "react-bootstrap";

const HomePage = () => {
    const category = [
        "Tablet",
        "Monitors",
        "Games",
        "Printers",
        "Software",
        "Cameras",
        "Books",
        "Videos"
    ] ;
    return (
        <>
       
        <ProductCarouselComponent/>
        <Container>
        <Row xs={1} md={2} className="g-4 mt-5"> 
        {
            category.map((category,idx)=><CategoryCardsCoponent key={idx} category={category} idx={idx} />)
        }
        </Row>
        </Container>
        </>
    );
}

export default HomePage ;