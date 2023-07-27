import React, { useState, useEffect } from 'react';
import { fetchSneakers } from '../api/api';

function SneakersList() {
  const [sneakersData, setSneakersData] = useState({ count: 0, sneakers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSneakers = async () => {
      try {
        const data = await fetchSneakers();
        setSneakersData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sneakers", error);
        setLoading(false);
      }
    };

    getSneakers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Total Sneakers: {sneakersData.count}</h1>
      {sneakersData.sneakers.map((sneaker, index) => (
        <div key={index}>
          <h2>{sneaker.title}</h2>
          <h3>Brand: {sneaker.brand}</h3>
          <p>Product Type: {sneaker.productType}</p>
          <a href={sneaker.request.url}>View Sneaker</a>
        </div>
      ))}
    </div>
  );
}

export default SneakersList;