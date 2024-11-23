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
import axios from 'axios'; // Import axios
import Slider from '../Slider';
import CategoryDetail from '../CategoryDetail'; // Import your CategoryDetail component
import ProductCard from '../ProductCard';

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
        const response = await axios.get('http://localhost:8000/san-pham');
        console.log(response.data.data); // Log the fetched data
        setProducts(response.data.data);
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
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
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
           <Route path="/category/:slug" element={<CategoryDetail />} />
  
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
        </Routes>

        <Snackbar
          open={!!cartMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={cartMessage}
        />
      
      </main>
    </Router>
  );
};


// Styles similar to React Native StyleSheet
const styles = {
  container: { flex: 1, backgroundColor: '#000' },
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