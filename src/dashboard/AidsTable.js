import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type Props = {
  aids: List  ,
}

/*
const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };
*/

const AidsTable = (props: Props) => {

  //const [page, setPage] = React.useState(0);
  //const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
      <TableContainer component={Paper}>
        <Table size="small" /*className={classes.table}*/ aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Codi</TableCell>
              <TableCell>Descripció</TableCell>
              <TableCell>Tipus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.aids.map((aid) => (
              <TableRow key={aid.code}>
                <TableCell component="th" scope="row">{aid.codi}</TableCell>
                <TableCell component="th" scope="row">{aid.descripcio}</TableCell>
                <TableCell component="th" scope="row">{aid.tipus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      /*<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.aids.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />*/
    );
}

export default AidsTable
