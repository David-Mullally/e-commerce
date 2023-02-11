import { Col, Form, Row } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminAnalyticsPage = () => {
  const data = [
    { name: "9am", 2021: 1000, 2022: 1200 },
    { name: "10am", 2021: 1050, 2022: 1300 },
    { name: "11am", 2021: 1100, 2022: 1200 },
    { name: "12pm", 2021: 1400, 2022: 1300 },
    { name: "1pm", 2021: 1700, 2022: 1800 },
    { name: "2pm", 2021: 1050, 2022: 1200 },
  ];
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Black Friday Cumulative Revenue 26/11/2022 vs 27/11/2021</h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date To Compare</Form.Label>
          <Form.Control
            type="date"
            name="firstDateToCompare"
            placeholder="First Date To Compare"
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date To Compare</Form.Label>
          <Form.Control
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date To Compare"
          />
        </Form.Group>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "TIME",
                offset: 50,
                position: "insideBottomRight",
              }}
              allowDuplicateCategory={false}
            />
            <YAxis
              label={{ value: "REVENUE $", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="2021"
              stroke="#8884d8"
              strokeWidth={4}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="2022"
              stroke="#82ca9d"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default AdminAnalyticsPage;
