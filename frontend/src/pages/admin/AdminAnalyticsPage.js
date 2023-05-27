import { Row, Col, Form } from "react-bootstrap"
import AdminLinksComponent from "../../components/admin/AdminLinksComponents";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const AdminAnalyticsPage = () => {
    const data = [
        {
            name: '12:00 AM',
            "2022 year": 4000,
            "2021 year": 4100,
        },
        {
            name: '1:00 AM',
            "2022 year": 4200,
            "2021 year": 4300,
        },
        {
            name: '2:00 AM',
            "2022 year": 4000,
            "2021 year": 4100,
        },
        {
            name: '3:00 AM',
            "2022 year": 4000,
            "2021 year": 4100,
        },
        {
            name: '4:00 AM',
            "2022 year": 4000,
            "2021 year": 4100,
        },
        {
            name: '5:00 AM',
            "2022 year": 4000,
            "2021 year": 4100,
        },
        {
            name: '12:00 AM',
            "2022 year": 4000,
            "2021 year": 4100,
        },
    ];
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>Black Friday Cumulative Revenue 11/26/2022 Vs 11/27/2021</h1>
                
                    <Form.Group controlId="firstDateToCompare">
                        <Form.Label>Select First Date To Compare</Form.Label>
                        <Form.Control type="date" name="firstDateToCompare" placeholder="First Date To Compare" />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="secondDateToCompare">
                        <Form.Label>Select Second Date To Compare</Form.Label>
                        <Form.Control type="date" name="secondDateToCompare" placeholder="Second Date To Compare" />
                    </Form.Group>
                
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" label={{value:"TIME",offset:50,position:"insideBottomRight"}} allowDuplicatedCategory={false}/>
                        <YAxis label={{value:"REVENUE $",angle:-90,position:"insideleft"}}/>
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Line type="monotone" dataKey="2021 year" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={4} />
                        <Line type="monotone" dataKey="2022 year" stroke="#82ca9d" strokeWidth={4} />
                    </LineChart>
                </ResponsiveContainer>
            </Col>
        </Row>
    );
}

export default AdminAnalyticsPage;