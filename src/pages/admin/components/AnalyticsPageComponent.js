import { Col, Form, Row } from "react-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
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
import { useState, useEffect } from "react";

const AnalyticsPageComponent = ({
  fetchOrdersForFirstDate,
  fetchOrdersForSecondDate,
  socketIOClient
}) => {
  const [firstDateToCompare, setFirstDateToCompare] = useState(
    new Date().toISOString().substring(0, 10)
  );
  var previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);
  const [secondDateToCompare, setSecondDateToCompare] = useState(
    new Date(previousDay).toISOString().substring(0, 10)
  );

  const [dataForFirstSet, setDataForFirstSet] = useState([]);
  const [dataForSecondSet, setDataForSecondSet] = useState([]);

  useEffect(() => {
    const socket = socketIOClient();
    let today = new Date().toDateString();
    const handler = (newOrder) => {
      var orderDate = new Date(newOrder.createdAt).toLocaleString("en-US", { hour: "numeric", hour12: true, timeZone: "UTC" });
      if (new Date(newOrder.createdAt).toDateString() === today) {
        if (today === new Date(firstDateToCompare).toDateString()) {
          setDataForFirstSet((prev) => {
            if (prev.length === 0) {
              return [{name: orderDate, [firstDateToCompare]: newOrder.orderTotal.cartSubtotal}]
            }
            const length = prev.length;
            if (prev[length - 1].name === orderDate) {
              prev[length - 1][firstDateToCompare] += newOrder.orderTotal.cartSubtotal;
              return [...prev];
            } else {
              var lastElm = { name: orderDate, [firstDateToCompare]: prev[length - 1][firstDateToCompare].newOrder.orderTotal.cartSubtotal }
              return [...prev, lastElm];
            }
          })
        } else if (today === new Date(secondDateToCompare).toDateString()) {
          setDataForSecondSet((prev) => {
            if (prev.length === 0) {
              return [{name: orderDate, [secondDateToCompare]: newOrder.orderTotal.cartSubtotal}]
            }
            const length = prev.length;
            if (prev[length - 1].name === orderDate) {
              prev[length - 1][secondDateToCompare] += newOrder.orderTotal.cartSubtotal;
              return [...prev];
            } else {
              var lastElm = { name: orderDate, [secondDateToCompare]: prev[length - 1][secondDateToCompare].newOrder.orderTotal.cartSubtotal }
              return [...prev, lastElm];
            }
          })
        };
      }
    }
    socket.on("newOrder", handler);
    return () => socket.off("newOrder", handler);
  }, [setDataForFirstSet, setDataForSecondSet, firstDateToCompare, secondDateToCompare, socketIOClient])

  useEffect(() => {
    const abctrl = new AbortController();
    fetchOrdersForFirstDate(abctrl, firstDateToCompare)
      .then((data) => {
        let ordersSum = 0;
        const orders = data.map((order) => {
          ordersSum += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZome: "UTC",
          });
          return { name: date, [firstDateToCompare]: ordersSum };
        });
        setDataForFirstSet(orders);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    fetchOrdersForSecondDate(abctrl, secondDateToCompare)
      .then((data) => {
        let ordersSum = 0;
        const orders = data.map((order) => {
          ordersSum += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZome: "UTC",
          });
          return { name: date, [secondDateToCompare]: ordersSum };
        });
        setDataForSecondSet(orders);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    return () => abctrl.abort();
  }, [firstDateToCompare, secondDateToCompare, fetchOrdersForFirstDate,
    fetchOrdersForSecondDate]);

  const firtsDateHandler = (e) => {
    setFirstDateToCompare(e.target.value);
  };

  const secondDateHandler = (e) => {
    setSecondDateToCompare(e.target.value);
  };

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Black Friday Cumulative Revenue {firstDateToCompare} vs{" "}
          {secondDateToCompare}
        </h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date To Compare</Form.Label>
          <Form.Control
            onChange={firtsDateHandler}
            type="date"
            name="firstDateToCompare"
            placeholder="First Date To Compare"
            defaultValue={firstDateToCompare}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date To Compare</Form.Label>
          <Form.Control
            onChange={secondDateHandler}
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date To Compare"
            defaultValue={secondDateToCompare}
          />
        </Form.Group>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            width={500}
            height={300}
            //data={data}
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
            {dataForFirstSet.length > dataForSecondSet.length ? (
              <>
                <Line
                  data={dataForFirstSet}
                  type="monotone"
                  dataKey={firstDateToCompare}
                  stroke="#8884d8"
                  strokeWidth={4}
                  activeDot={{ r: 8 }}
                />
                <Line
                  data={dataForSecondSet}
                  type="monotone"
                  dataKey={secondDateToCompare}
                  stroke="#82ca9d"
                  strokeWidth={4}
                />
              </>
            ) : (
              <>
                <Line
                  data={dataForSecondSet}
                  type="monotone"
                  dataKey={secondDateToCompare}
                  stroke="#8884d8"
                  strokeWidth={4}
                  activeDot={{ r: 8 }}
                />
                <Line
                  data={dataForFirstSet}
                  type="monotone"
                  dataKey={firstDateToCompare}
                  stroke="#82ca9d"
                  strokeWidth={4}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default AnalyticsPageComponent;
