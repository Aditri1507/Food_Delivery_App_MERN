import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { getOrders } from "../api";

const Container = styled.div`
  padding: 30px;
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 25px;
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
`;

const OrderDate = styled.div`
  font-size: 14px;
  color: gray;
  margin-bottom: 16px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 80px 100px;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 80px 100px;
  align-items: center;
  margin-bottom: 12px;
`;

const ProductImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
`;

const Total = styled.div`
  text-align: right;
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
`;

const Empty = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("foodeli-app-token");

      const res = await getOrders(token);

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      <Title>My Orders</Title>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : orders.length === 0 ? (
        <Empty>No Orders Found</Empty>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderDate>
              Ordered on:{" "}
              {new Date(order.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </OrderDate>

            <Header>
              <div>Image</div>
              <div>Product Name</div>
              <div>Qty</div>
              <div>Price</div>
            </Header>

            {order.products?.map((item, index) => (
              <ItemRow key={index}>
                <ProductImage
                  src={item.product?.img}
                  alt={item.product?.name}
                />

                <div>{item.product?.name}</div>

                <div>{item.quantity}</div>

                <div>
                  ₹{(item.product?.price?.org || 0) * item.quantity}
                </div>
              </ItemRow>
            ))}

            <Total>Total: ₹{order.total_amount}</Total>
          </OrderCard>
        ))
      )}
    </Container>
  );
};

export default Orders;
