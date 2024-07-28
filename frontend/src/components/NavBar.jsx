import {
  Avatar,
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import { useAuth } from "../Hooks/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "../State/State_Auth/authSlice";
import { resetWarehouse } from "../State/State_Warehouse/warehouseSlice";


const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const { bars } = useSelector((state) => state.bars);

  const roleToPath = {
    'Bartender': '/bar/dashboard',
    'Warehouse-Assistant': '/warehouse/dashboard',
    'Stockist': '/drop_point/dashboard',
    'Visitor': '/visitor/dashboard',
  };

  const settings = [
    { label: "Profile", path: "/profile" },
    { label: "Account", path: "/account" },
    { label: "Dashboard", path: roleToPath[user?.role] || '/'},
    { label: "Logout", path: "/logout" },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (path) => {
    if (path === "/logout") {
      dispatch(logout());
      dispatch(resetWarehouse());
      navigate("/login");
    } else {
      handleCloseUserMenu();
      navigate(path);
    }
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <Paper elevation={24} sx={{ mt: "20px", mb: "20px" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link
          component={RouterLink}
          to="/"
          passHref
          display={"flex"}
          gap={1}
          sx={{ textDecoration: "none" }}
          alignItems={"center"}
        >
          <img
            src={"/assets/fox.png"}
            width={150}
            height={150}
            alt="Fox Logo"
          />
          <Box sx={{ color: "black", fontWeight: "bold", fontSize: "30px" }}>
            Fox Events
          </Box>
        </Link>
        {" "}
        {user && user.role === "Bartender" ? (
          <Box display={"flex"} gap={4}>
            {bars.map((bar) => (
              <Link
                key={bar._id} // Ensure each link has a unique key
                component={RouterLink}
                to={`bar/bars/${bar.name}`} // Dynamically generate the path
                fontSize={20}
                fontWeight={"bold"}
                sx={{ textDecoration: "none" }}
              >
                {bar.name}
              </Link>
            ))}
          </Box>
        ) : (
          <> </>
        )}
        {" "}
        {isAuthenticated ? (
          <Box gap={2} mr={2}>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => handleMenuClick(setting.path)}
                  >
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        ) : (
          <IconButton onClick={() => handleClickLogin()}>
            <LoginOutlined
              variant="outlined"
              sx={{ fontSize: "50px", color: "orange" }}
            ></LoginOutlined>
            &nbsp;&nbsp; Login
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default NavBar;
