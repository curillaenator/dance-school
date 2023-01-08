import React, { FC, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

import RemoveIcon from '@mui/icons-material/Delete';

import { Heading } from './Heading';
import { PaginationActions } from './PaginationActions';
import { SingleApplication } from './SingleApplication';

import { useTableData } from './hooks/useTableData';
import { Context } from '@src/context';
import { getDate, processLongName } from './helpers';

export const Applications: FC = () => {
  const { isMobile } = useContext(Context);

  const {
    applications,
    page,
    rowsPerPage,
    selected,
    updateCalled,
    remove,
    handleChangePage,
    handleChangeRowsPerPage,
    selectApplication,
  } = useTableData();

  const applicationsMaped = Object.values(applications).reverse();
  const tableData =
    rowsPerPage > 0 ? applicationsMaped.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : applicationsMaped;

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 120,
          backgroundColor: '#121212',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        }}
      />
      <TableContainer
        component={Paper}
        sx={{
          padding: '0 32px 32px',
          minHeight: 'calc(100vh - 120px)',
          maxHeight: 'calc(100vh - 120px)',
        }}
      >
        <Table stickyHeader aria-label="simple table">
          <Heading isMobile={isMobile} />

          <TableBody>
            {tableData.map((application) => (
              <TableRow key={application.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {!isMobile ? (
                    processLongName(application.name)
                  ) : (
                    <Button
                      onClick={() => selectApplication(application.id)}
                      color={application.called ? 'secondary' : 'primary'}
                      fullWidth
                      sx={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                      }}
                    >
                      {processLongName(application.name)}
                    </Button>
                  )}
                </TableCell>

                <TableCell>{getDate(application.created)}</TableCell>

                {!isMobile && (
                  <>
                    <TableCell>{application.tel}</TableCell>

                    <TableCell align="right" style={{ maxWidth: '360px' }}>
                      {application.comment}
                    </TableCell>

                    <TableCell align="right" style={{ width: '64px' }}>
                      <Checkbox checked={application.called} onChange={() => updateCalled(application)} />
                    </TableCell>

                    <TableCell align="right" style={{ width: '64px' }}>
                      <IconButton onClick={() => remove(application.id)}>
                        <RemoveIcon />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                colSpan={isMobile ? 2 : 6}
                count={applicationsMaped.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={isMobile ? '' : 'Заявок на странице'}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Заявок на странице',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={PaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {isMobile && (
        <SingleApplication
          selected={selected}
          applications={applications}
          handleClose={() => selectApplication(null)}
          remove={remove}
          updateCalled={updateCalled}
        />
      )}
    </>
  );
};
