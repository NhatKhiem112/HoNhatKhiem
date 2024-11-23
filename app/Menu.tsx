import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Component for Categories
const Category: React.FC<{ categories: any[] }> = ({ categories }) => {
  return (
    <Box style={{ padding: '10px' }}>
      <Typography variant="h6" style={{ color: '#ddd', marginBottom: '10px' }}>DANH MỤC</Typography>
      {categories.map((item) => (
        <Link key={item.id} to={`/category/${item.slug}`} style={{ textDecoration: 'none', color: '#ddd' }}>
          <MenuItem style={{ justifyContent: 'space-between' }}>
            <img
              src={`http://localhost:8000/imgs/categorys/${item.image}`}
              alt={item.name}
              style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
            />
            <Typography variant="body1">{item.name}</Typography>
          </MenuItem>
        </Link>
      ))}
    </Box>
  );
};

const DropdownMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Open the menu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#FFFFFF' }}>
      <Toolbar>
        <IconButton color="default" onClick={handleMenuClick}>
          <MenuIcon style={{ color: 'black' }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              backgroundColor: '#777777',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
            },
          }}
        >
          <Category categories={categories} />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DropdownMenu;
