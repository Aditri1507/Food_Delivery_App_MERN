import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { category } from "../utils/data";
import HeaderImage from "../utils/Images/Header.png";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductsCard from "../components/cards/ProductsCard";
import { getAllProducts } from "../api";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 0px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
const Img = styled.img`
  width: 100%;
  max-width: 1200px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 760px) {
    gap: 16px;
  }
`;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Section>
        <Img src={HeaderImage} />
      </Section>
      <Section>
        <Title>Food Categories</Title>
        <CardWrapper>
          {category.map((category) => (
            <ProductCategoryCard category={category} />
          ))}
        </CardWrapper>
      </Section>

      <Section>
        <Title>Most Popular</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {products.map((product) => (
              <ProductsCard product={product} />
            ))}
          </CardWrapper>
        )}
      </Section>
      <div
        style={{
          width: "100%",
          padding: "40px 30px",
          textAlign: "center",
          background: "#111827",
          color: "white",
          marginTop: "50px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Foodeli</h2>

        <p style={{ color: "#D1D5DB" }}>
          Email: support@foodeli.com | Phone: +91 9876543210
        </p>

        <p
          style={{
            marginTop: "20px",
            color: "#9CA3AF",
            fontSize: "14px",
          }}
        >
          © 2026 Foodeli. All rights reserved.
        </p>
      </div>
    </Container>
  );
};

export default Home;
