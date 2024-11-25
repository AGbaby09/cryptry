import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

// Styled Components
const PriceCard = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  background: #f9f9f9;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const MotionCard = motion(PriceCard);

// Crypto Price Card
const CryptoPriceCard = ({ name, price }) => (
  <MotionCard whileHover={{ scale: 1.05 }}>
    <span>{name}</span>
    <span>${price}</span>
  </MotionCard>
);

const Landing = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        );

        // Convert object to array
        const formattedPrices = Object.entries(response.data).map(
          ([key, value]) => ({
            id: key,
            name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize name
            price: value.usd,
          })
        );
        setPrices(formattedPrices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <section id="Landing" className="full center">
      {prices.map((crypto) => (
        <CryptoPriceCard
          key={crypto.id}
          name={crypto.name}
          price={crypto.price}
        />
      ))}
    </section>
  );
};

export default Landing;
