import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

// Define menu items and paths
const menuItems = [
  { label: 'Thực đơn', path: '/' },
  { label: 'Khuyến mãi', path: '/promotions' },
  { label: 'Dịch vụ tiệc', path: '/party-services' },
  { label: 'Hệ thống nhà hàng', path: '/restaurant-system' },
];

const DropdownMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        {/* Change icon color to black */}
        <IconButton color="default" onClick={handleMenuClick}>
          <MenuIcon style={{ color: 'black' }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              backgroundColor: '#777777', // Dark background for dropdown
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', // Box shadow like the footer
              borderRadius: '8px', // Rounded corners
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={handleMenuClose}
              style={{
                padding: '10px 20px',
                transition: 'background-color 0.3s',
                borderBottom: '1px solid #444', // Subtle separator between items
              }}
              className="menu-item" // Add a custom class to handle hover effects
            >
              <Link to={item.path} style={{ textDecoration: 'none', color: '#ddd' }}>
                <Typography variant="body1" style={{ color: '#ddd' }}>
                  {item.label}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DropdownMenu;
