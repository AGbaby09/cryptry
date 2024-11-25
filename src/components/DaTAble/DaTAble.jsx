import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import { fixedHeight } from "../../Functions";

const TableContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 5%;
  height: auto;
  top: 0;
  padding-top: ${fixedHeight(10)}px;
`;

const CryptoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  @media (max-width: 768px) {
    display: none; /* Hide the table on small screens */
  }
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;

  button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const CryptoCardContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background: #f4f4f4;
`;

const TableRow = motion(styled.tr`
  border: 1px solid #ddd;
  &:hover {
    background: #f9f9f9;
  }
`);

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;

  @media (max-width: 768px) {
    display: none; /* Hide specific columns on small screens */
  }
`;

const CryptoCard = motion(styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`);

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CardButton = styled(Button)`
  margin-top: 10px;
  width: 100%; /* Full-width buttons in cards */
`;

const CryptoDataTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filters, setFilters] = useState({
    minPrice: 0,
    positiveChange: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCryptoData = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 150, // Fetch more data for pagination
            page: 1,
            sparkline: false,
          },
        }
      );
      setCryptoData(response.data);
    };

    fetchCryptoData();
  }, []);

  const sortedData = [...cryptoData].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (direction === "asc") {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });

  const filteredData = sortedData.filter((coin) => {
    const meetsPrice = coin.current_price >= filters.minPrice;
    const meetsChange =
      !filters.positiveChange || coin.price_change_percentage_24h > 0;
    return meetsPrice && meetsChange;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <TableContainer>
      <div>
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Positive Change:
          <input
            type="checkbox"
            name="positiveChange"
            checked={filters.positiveChange}
            onChange={() =>
              setFilters((prev) => ({
                ...prev,
                positiveChange: !prev.positiveChange,
              }))
            }
          />
        </label>
      </div>
      {/* Table for larger screens */}
      <CryptoTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Symbol</TableHeader>
            <TableHeader>Price (USD)</TableHeader>
            <TableHeader>24h Change</TableHeader>
            <TableHeader>Market Cap</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <motion.tbody
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {paginatedData.map((coin) => (
            <TableRow
              key={coin.id}
              variants={tableRowVariants}
              whileHover={{ scale: 1.03 }}
            >
              <TableCell>{coin.name}</TableCell>
              <TableCell>{coin.symbol.toUpperCase()}</TableCell>
              <TableCell>${coin.current_price.toLocaleString()}</TableCell>
              <TableCell
                style={{
                  color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
              <TableCell>
                <Button>View</Button> <Button>Buy</Button>
              </TableCell>
            </TableRow>
          ))}
        </motion.tbody>
      </CryptoTable>

      {/* Card layout for small screens */}
      <CryptoCardContainer>
        {cryptoData.map((coin) => (
          <CryptoCard
            key={coin.id}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            variants={cardVariants}
            transition={{ duration: 0.3 }}
          >
            <h3>
              {coin.name} ({coin.symbol.toUpperCase()})
            </h3>
            <p>Price: ${coin.current_price.toLocaleString()}</p>
            <p
              style={{
                color: coin.price_change_percentage_24h > 0 ? "green" : "red",
              }}
            >
              24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            <CardButton>View</CardButton>
            <CardButton>Buy</CardButton>
          </CryptoCard>
        ))}
      </CryptoCardContainer>
      {/* Pagination */}
      <PaginationControls>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </PaginationControls>
    </TableContainer>
  );
};

export default CryptoDataTable;
