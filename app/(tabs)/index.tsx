import React, { useState,useEffect  } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Snackbar,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cart from '../Cart';
import ProductDetail from '../ProductDetail';
import Menu from '../Menu';
import Promotions from '../Promotions';          // Đường dẫn đến Promotions.tsx
import PartyServices from '../PartyServices';    // Đường dẫn đến PartyServices.tsx
import RestaurantSystem from '../RestaurantSystem'; // Đường dẫn đến RestaurantSystem.tsx
import axios from 'axios'; // Import axios
import Slider from '../Slider';
import Footer from '../Footer';
// Sample product data
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  detail: string;
  image: string;
}



// Header component
const Header: React.FC<{ cartItemsCount: number; searchTerm: string; setSearchTerm: (term: string) => void }> = ({
  cartItemsCount,
  searchTerm,
  setSearchTerm,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
// fixed
  return (
    <AppBar position="static"style={{ backgroundColor: '#FFFFFF' }}>
      <Toolbar>
      <Typography variant="h6" style={styles.title}>
  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
  <img
            src="components/imgs/logo.jpg" // Update this with the actual path to your logo image
            alt="Shopee Clone Logo"
            style={{ height: '40px', marginRight: '16px' }} // Adjust the height as needed
          />
  </Link>
</Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search…"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={styles.searchBar}
        />

        <Link to="/Cart" style={{ textDecoration: 'none' }}>
          <IconButton color="inherit">
            <ShoppingCartIcon />
            {cartItemsCount > 0 && <span style={styles.cartBadge}>{cartItemsCount}</span>}
          </IconButton>
        </Link>
      </Toolbar>
      <Slider/>
      <Menu />
    </AppBar>
  );

};

// ProductCard component
const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({
  product,
  onAddToCart,
}) => {
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
        <Typography variant="body1" style={styles.productPrice}>
          {product.price.toLocaleString('vi-VN')} VND
        </Typography>
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


// ProductList component
const ProductList: React.FC<{ onAddToCart: (product: Product) => void; searchTerm: string }> = ({
  onAddToCart,
  searchTerm,
}) => {
  const [products, setProducts] = useState<Product[]>([]); // State to hold products
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/san-pham'); // Replace with your API endpoint
        setProducts(response.data.data); // Assuming response contains data in 'data' field
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box padding={4}>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartMessage, setCartMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(''); // Add state for search term

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Mỗi khi giỏ hàng thay đổi, lưu nó vào localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setCartMessage(`Đã thêm ${product.name} vào giỏ hàng thành công!`);
  };

  const handleIncreaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleCloseSnackbar = () => {
    setCartMessage('');
  };

  return (
    <Router>
      <main style={styles.main}>
        <Header
          cartItemsCount={cartItems.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        

        <Routes>
          <Route
            path="/"
            element={<ProductList onAddToCart={handleAddToCart} searchTerm={searchTerm} />}
          />
          <Route
            path="/product/:slug"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/Cart"
            element={
              <Cart
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            }
          />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/party-services" element={<PartyServices />} />
          <Route path="/restaurant-system" element={<RestaurantSystem />} />
        </Routes>

        <Snackbar
          open={!!cartMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={cartMessage}
        />
        <Footer />
      </main>
    </Router>
  );
};


// Styles similar to React Native StyleSheet
const styles = {
  title: {
    flexGrow: 1,
  },
  searchBar: {
    marginRight: '16px',
    backgroundColor: 'white',
    borderRadius: '4px',
  },
  categoryHeader: {
    margin: '20px 0',
    color: '#FFFFCC', // Change this to your desired color
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Add shadow for depth
    fontSize: '2rem', // Increase the font size for emphasis
  },
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
  productPrice: {
    color: '#ff5722',
    marginBottom: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: '10px',
    flexGrow: 1,
  },
  iconButton: {
    padding: '8px',
  },
  detailButton: {
    marginTop: '10px',
    flexGrow: 0,
    marginLeft: '8px',
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
  },
  main: {
    flex: '1 0 auto',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 64px - 60px)', // Subtract header and footer heights
  },
  cartBadge: {
    backgroundColor: 'red',
    borderRadius: '50%',
    color: 'white',
    padding: '2px 6px',
    position: 'absolute',
    top: '0',
    right: '0',
    fontSize: '12px',
  },
};

export default App;