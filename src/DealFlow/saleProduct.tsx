// DealCard.tsx
import React from 'react';
import { Img } from 'remotion';

interface DealCardProps {
  deal: {
    name: string;
    packageSize: string;
    price: number;
    salePrice: number;
    productImage: string;
  };
  frame: number;
}

const DealCard: React.FC<DealCardProps> = ({ deal, frame }) => {


  return (
    <div style={styles.card}>
      <Img src={deal.productImage} alt={deal.name} style={styles.image} />
      <div style={styles.details}>
        <h2 style={styles.name}>{deal.packageSize}</h2>

      </div>
    </div>
  );
};

const styles = {
  card: {

    padding: '32px',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center' as const,
    zIndex: 10

  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: '16px',
  },
  details: {
    marginTop: '-24px',
    float: 'left'
  },
  name: {
    fontSize: '3em',
    margin: '0 0 16px 0',
    color: 'yellow',
    fontFamily: 'Arial',
    fontWeight: 700,
  }
};

export default DealCard;
