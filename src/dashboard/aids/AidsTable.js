import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRounded from '@material-ui/icons/CancelRounded';
import {FilterType} from './AidsDashboardTypes';

type Props = {
  aids: List ,
  filter: FilterType,
  date: Date,
}

const AidsTable = (props: Props) => {

  const {t} = useTranslation('dashboard');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };

  const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 30));
   setPage(0);
  };

  const getMonthInici = aid => parseInt(aid.data_inici.substring(5,7))

  return (
    <Paper elevation={2}>
      <TableContainer component={Paper}>
        <Table size="small" /*className={classes.table}*/ aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Codi</TableCell>
              <TableCell>Descripció</TableCell>
              <TableCell>Data inici</TableCell>
              <TableCell>Data fi</TableCell>
              <TableCell>Àmbit</TableCell>
              <TableCell>Administració</TableCell>
              <TableCell>Activa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.aids &&
              props.aids.filter(aid => aid.active === (props.filter ? props.filter.active: true))
                        .filter(aid => props.filter && props.filter.admin ? aid.ambit === props.filter.admin : true)
                        .filter(aid => props.filter && !aid.data_fi && aid.data_inici && (props.date.getMonth() + 1 >= getMonthInici(aid)))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((aid) => (
              <TableRow key={aid.code}>
                <TableCell component="th" scope="row">{aid.codi}</TableCell>
                <TableCell component="th" scope="row">{aid.descripcio}</TableCell>
                <TableCell component="th" scope="row">{aid.data_inici ? aid.data_inici : '-'}</TableCell>
                <TableCell component="th" scope="row">{aid.data_fi ? aid.data_fi : '-'}</TableCell>
                <TableCell component="th" scope="row">{aid.tipus}</TableCell>
                <TableCell component="th" scope="row">{aid.ambit}</TableCell>
                <TableCell component="th" scope="row">
                {aid.active ? <CheckCircleRoundedIcon fontSize='inherit' style={{ color: 'green' }}/> :  <CancelRounded fontSize='inherit' style={{ color: 'red' }}/>}
                </TableCell>
              </TableRow>
            ))}
            {!props.aids &&
              <TableRow>
                <TableCell component="th" scope="row">{t('aids_empty')}</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[20, 30, 50]}
          component="div"
          count={props.aids.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
}

export default AidsTable
