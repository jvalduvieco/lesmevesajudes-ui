import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Grid, AppBar,Toolbar,IconButton,Typography} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AidsDashboard from './aids/AidsDashboardComponent';
import SimulationsDashboard from './simulations/SimulationsDashboardComponent';
import AnalysisDashboard from './analysis/AnalysisDashboardComponent';

type Props = {
  allResults: any,
  dispatch: Function,
  retrieveDashboard: any
};

export const DashboardPage = (props :Props) => {

  const [open, setOpen] = useState(false);
  const [componentPanel, setComponent] = useState(<AidsDashboard />);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const showAidsDashboard = (event) => {
    setComponent(<AidsDashboard/>);
    handleClose(event);
  }

  const showSimulationsDashboard = (event) => {
    setComponent(<SimulationsDashboard />);
    handleClose(event);
  }

  const showAnalysisDashboard = (event) => {
    setComponent(<AnalysisDashboard />);
    handleClose(event);
  }

  const prevOpen = React.useRef(open);
  useEffect(() => {
    //setFilterModalVisible(props.filtersVisible);
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Grid>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
            <IconButton ref={anchorRef} onClick={handleToggle} edge="start" color="secondary" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={showAidsDashboard}>Ajudes</MenuItem>
                  <MenuItem onClick={showSimulationsDashboard}>Simulacions</MenuItem>
                  <MenuItem onClick={showAnalysisDashboard}>Anàlisis de dades</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
          )}
        </Popper>
          <Typography variant="h6" color="inherit">Quadre de comandament</Typography>
        </Toolbar>
      </AppBar>
    <Grid xs={12} container>
      {componentPanel}
    </Grid>
  </Grid>);
}

function mapStateToProps(state) {
  var props = {
	  allResults: state.dashboard.results
  };
  return props;
}

export default connect(mapStateToProps)(DashboardPage);
