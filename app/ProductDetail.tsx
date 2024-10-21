import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  detail: string;
  image: string;
}

const ProductDetail: React.FC<{ onAddToCart: (product: Product) => void }> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>(); // Use slug instead of id
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product details from the backend using slug
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/chi-tiet-san-pham/${slug}`);
        setProduct(response.data.product); // Assuming the product data is under the "product" field
        setLoading(false);
      } catch (error) {
        setError('Product not found');
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [slug]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!product) {
    return <Typography variant="h6">Product not found!</Typography>;
  }

  return (
    <Box padding={4}>
      <Typography variant="h4" marginBottom={3}>
        Chi tiết sản phẩm
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={`http://localhost:8000/imgs/products/${product.image}`}
            alt={product.name}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {product.price.toLocaleString('vi-VN')} VND
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.detail}
              </Typography>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onAddToCart(product); // Add the product to the cart
                    navigate('/cart'); // Navigate to cart after adding product
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(-1)} // Navigate back to the previous page
                >
                  Quay lại
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
