import React, {Component} from "react";
import "./AppHeader.css";
import Link from "react-router-dom/Link";
import Grid from '@material-ui/core/Grid';

class AppHeader extends Component {
  render() {
    return (
        <Grid container className="AppHeaderContainer">
          <Grid item className="AppHeader">
            <Link to="/">
              <Grid item className="AppLogoPetit"/>
            </Link>
          </Grid>
        </Grid>
    );
  }
}

export default AppHeader;
