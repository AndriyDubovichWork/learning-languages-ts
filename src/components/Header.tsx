import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import logo from './../imgs/logo.jpg';
import Slide from '@mui/material/Slide';
import theme from '../theme';
import Sidebar from './Sidebar';

function HideOnScroll(props: any) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}
// const drawerWidth = '500px';
const Header = (props: any) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    return;
  };
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar sx={{ backgroundColor: theme.palette.secondary.main }}>
            <Button onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
              <SettingsIcon />
            </Button>
            <img src={logo} style={{ height: '50px', float: 'right' }} />
            <Sidebar
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              // drawerWidth={drawerWidth}
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
};
const MapStateToProps = () => {
  return {};
};
export default connect(MapStateToProps, {})(Header);
