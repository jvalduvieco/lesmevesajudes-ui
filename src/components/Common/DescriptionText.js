import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';


class DescriptionText extends Component {
  render() {
    return (
        <Grid item>
          Input seleccionat: {this.props.selectInput}
        </Grid>
    );
  }
}

export default (DescriptionText);
