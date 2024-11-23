import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Rating,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import Carousel from 'react-material-ui-carousel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

interface Product {
  id: number;
  name: string;
  price: number;
  pricesale?: number;
  description: string;
  detail: string;
  image: string;
  slug: string;
  updated_at: string;
}

const ProductDetail: React.FC<{ onAddToCart: (product: Product, quantity: number) => void }> = ({ onAddToCart }) => {  
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [openModal, setOpenModal] = useState(false);
  const [wishlistSnackbar, setWishlistSnackbar] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/chi-tiet-san-pham/${slug}`);
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts || []);
        setListProduct(response.data.listproduct.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity);
      setOpenModal(true); // Open the confirmation modal
    }
  };

  const handleAddToWishlist = () => {
    setWishlistSnackbar(true);
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleCloseWishlistSnackbar = () => setWishlistSnackbar(false);

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
          <Carousel autoPlay={false} indicators>
            <CardMedia
              component="img"
              image={`http://localhost:8000/imgs/products/${product.image}`}
              alt={product.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </Carousel>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {product.pricesale
                  ? `${product.pricesale.toLocaleString('vi-VN')} VND`
                  : `${product.price.toLocaleString('vi-VN')} VND`}
              </Typography>
              <Rating
                name="product-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.detail}
              </Typography>

              <Box display="flex" alignItems="center" justifyContent="center" marginY={2}>
  <Button
    variant="outlined"
    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
    sx={{ minWidth: '40px', padding: '0 8px', fontSize: '1.2rem' }}
  >
    -
  </Button>
  <TextField
    type="number"
    value={quantity}
    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
    inputProps={{
      min: 1,
      style: { textAlign: 'center', fontSize: '1.2rem', padding: '8px 0' },
    }}
    sx={{
      width: '60px',
      '& .MuiInputBase-root': {
        textAlign: 'center',
      },
      mx: 1, // Add margin horizontally
    }}
  />
  <Button
    variant="outlined"
    onClick={() => setQuantity((prev) => prev + 1)}
    sx={{ minWidth: '40px', padding: '0 8px', fontSize: '1.2rem' }}
  >
    +
  </Button>
</Box>


              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
                <IconButton color="secondary" onClick={handleAddToWishlist}>
                  <FavoriteIcon />
                </IconButton>
                <IconButton color="primary">
                  <ShareIcon />
                </IconButton>
                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon /> Quay lại
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add to Cart Confirmation Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>{`"${product.name}" đã được thêm vào giỏ hàng.`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/cart')} color="primary">
            Đi tới giỏ hàng
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Tiếp tục mua sắm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Wishlist Snackbar */}
      <Snackbar
        open={wishlistSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseWishlistSnackbar}
        message={`"${product.name}" đã được thêm vào danh sách yêu thích.`}
      />

      {/* Related Products */}
      <Box marginTop={8}>
        <Typography variant="h5" align="center" marginBottom={4}>
          Sản phẩm tương tự
        </Typography>
        <Grid container spacing={2}>
          {relatedProducts.map((productItem) => (
            <Grid item xs={6} md={3} key={productItem.id}>
              <ProductCard product={productItem} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* List of Products */}
      <Box marginTop={8}>
        <Grid container spacing={2}>
          {listProduct.map((productItem) => (
            <Grid item xs={6} md={3} key={productItem.id}>
              <ProductCard product={productItem} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetail;
