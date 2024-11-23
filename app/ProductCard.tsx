import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { Product } from './(tabs)'; // Adjust the path to your Product type definition

const ProductCard: React.FC<{ product?: Product; onAddToCart: (product: Product) => void }> = ({
    product,
    onAddToCart,
  }) => {
    if (!product) {
      return null; // or return a placeholder
    }

  return (
    <Card style={styles.card}>
      <CardMedia
        component="img"
        image={`http://localhost:8000/imgs/products/${encodeURIComponent(product.image)}`}
        alt={product.name}
        style={styles.cardImage}
      />

      <CardContent style={styles.cardContent}>
        <Typography variant="h6" style={styles.productName}>
          {product.name}
        </Typography>
        
        <div style={styles.priceContainer}>
          {/* Display original price with strikethrough if there's a sale */}
          {product.pricesale && (
            <Typography variant="body1" style={styles.originalPrice}>
              {product.price.toLocaleString('vi-VN')} VND
            </Typography>
          )}
          {/* Display sale price below original price */}
          <Typography variant="body1" style={product.pricesale ? styles.salePrice : styles.productPrice}>
            {(product.pricesale || product.price).toLocaleString('vi-VN')} VND
          </Typography>
        </div>
        
        <div style={styles.buttonContainer}>
          <IconButton color="primary" onClick={() => onAddToCart(product)} style={styles.iconButton}>
            <AddShoppingCartIcon />
          </IconButton>
          <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
            <IconButton color="secondary" style={styles.iconButton}>
              <VisibilityIcon />
            </IconButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

// Styles similar to React Native StyleSheet
const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', // Ensure the card takes full height available
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)', // Zoom effect on hover
    },
  },
  cardImage: {
    height: '200px', // Fixed height for images
    objectFit: 'cover', // Ensure the image covers the area without stretching
  },
  cardContent: {
    padding: '16px',
    flexGrow: 1, // Ensure content stretches to fill the remaining space
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: '8px',
    minHeight: '48px', // Add minimum height to keep title areas aligned
  },
  priceContainer: {
    marginBottom: '16px',
  },
  originalPrice: {
    color: '#757575',
    textDecoration: 'line-through', // Strike-through for original price
    fontSize: '0.9rem',
    marginBottom: '4px', // Space between original and sale price
  },
  salePrice: {
    color: '#ff5722', // Highlight sale price
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  productPrice: {
    color: '#ff5722',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: '8px',
  },
};

export default ProductCard;
