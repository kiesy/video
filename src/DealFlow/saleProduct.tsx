import React from 'react';
import { Img } from 'remotion';

interface DealCardProps {
  deal: {
    brand?: string | null;
    name: string;
    packageSize: string;
    price: number;
    salePrice: number;
    productImage: string;
  };
  frame: number;
}

const DealCard: React.FC<DealCardProps> = ({ deal, frame }) => {
  const savePercentage = (((deal.price - deal.salePrice) / deal.price) * 100).toFixed(0)
  return (
    <div style={styles.card}>
      <Img src={deal.productImage} alt={deal.name} style={styles.image} />
      <div style={styles.details}>
        {deal.brand && <h3 style={styles.brand}>{deal.brand}</h3>}
        <h2 style={styles.name}>{deal.name}</h2>
        <h2 style={styles.percentageStyle}>{savePercentage}% <span style={styles.savePercStyle}>OFF</span></h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={styles.salePrice}>${deal.salePrice.toFixed(2)}</h3>
          <h3 style={styles.price}>${deal.price.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

const styles = {
  savePercStyle: {
    fontSize: '32px'
  },
  brand: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#666666',
    margin: '0 0 4px 0' // This ensures that brand appears just above the product name, adjust spacing as needed
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'left',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden'
  },
  image: {
    width: '40%',
    height: 'auto',
    borderRadius: '12px',
    objectFit: 'cover'
  },
  name: {
    fontSize: '48px',
    color: '#333333',
    margin: '0 0 0 0',
    fontWeight: 'bold'
  },
  percentageStyle: {
    fontSize: '48px',
    marginBottom: '4px'
  },
  details: {
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  salePrice: {
    fontSize: '64px',
    color: '#FF6347',
    fontWeight: 'bold',
    margin: '0 16px 0 0'
  },
  price: {
    fontSize: '36px',
    color: '#777',
    textDecoration: 'line-through'
  }
};

export default DealCard;
