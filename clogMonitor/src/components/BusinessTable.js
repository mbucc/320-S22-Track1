import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

/*
* Author: @wilsonnexus This a modified example from MUI, this could be either temporary or for the project
*/


function createRow(EAI_TRANSACTION_ID, EAI_DOMAIN, PUBLISHING_BUSINESS_DOMAIN,
    BUSINESS_PROCESS,EAI_TRANSACTION_CREATE_TIME_STRING, KEY1_APP_CONTEXT_NAME,
    KEY1_APP_CONTEXT_VALUE, KEY2_APP_CONTEXT_NAME, KEY2_APP_CONTEXT_VALUE,
    GLOBAL_INSTANCE_ID, BUSINESS_DOMAIN, APPLICATION, ACTIVITY, SEVERITY) {
  const EAI_TRANSACTION_CREATE_TIME = makeDateTime(EAI_TRANSACTION_CREATE_TIME_STRING)
  const SEVERITY_NAME = severityNamer(SEVERITY)
  return {
    EAI_TRANSACTION_ID,
    EAI_DOMAIN,
    PUBLISHING_BUSINESS_DOMAIN,
    BUSINESS_PROCESS,
    EAI_TRANSACTION_CREATE_TIME,
    KEY1_APP_CONTEXT_NAME,
    KEY1_APP_CONTEXT_VALUE,
    KEY2_APP_CONTEXT_NAME,
    KEY2_APP_CONTEXT_VALUE,
    GLOBAL_INSTANCE_ID,
    BUSINESS_DOMAIN,
    APPLICATION,
    ACTIVITY,
    SEVERITY,
    SEVERITY_NAME,
  };
}

const makeDateTime = (date) => {
  const dateTimeTokens = date.split(/[-\s.]+/);
  const day = dateTimeTokens[0];
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const m = months.indexOf(dateTimeTokens[1].toLowerCase()) + 1;
  const month = m < 10 ? '0' + m.toString() : m.toString();
  const year = '20' + dateTimeTokens[2];
  const h12 = dateTimeTokens[3];
  let h24;
  const ampm = dateTimeTokens[7].toLowerCase();
  if (ampm === 'am') {
    h24 = h12;
  } else if (h12 === '12') {
    h24 = '00';
  } else {
    h24 = (parseInt(h12) + 12).toString();
  }
  const hour = h24;
  const minute = dateTimeTokens[4];
  const second = dateTimeTokens[5];
  const millisecond = dateTimeTokens[6].substring(0, 3);
  const dateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + '.' + millisecond + 'Z'
  return new Date(dateTime).toUTCString();
}

const severityNamer = (severity) => {
    if (severity < 20){
        return 'Info'
    }
    else if (severity >= 20 && severity < 30) {
        return 'Success'
    }
    else if (severity >= 30 && severity < 50) {
        return 'Warning'
    }
    else if (severity >= 50) {
        return 'Error'
    }
}

const rows = [
  createRow('eai_crm_server_111111', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '02-APR-22 12.45.03.480000 AM', 'Customer_Id', '123456', 'Effective_Date', '01/01/2022 05:00:00', 'crm_server_000001', 'CRM', 'CRM_Adapter', 'Customer Update Started', 10),
  createRow('eai_crm_server_111111', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.45.03.480000 AM', 'Customer_Id', '123456', 'Effective_Date', '01/01/2022 05:00:00', 'crm_server_000002', 'CRM', 'CRM_Adapter', 'Customer Update Published', 10),
  createRow('eai_crm_server_111111', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.45.03.480000 AM', 'Customer_Id', '123456', 'Effective_Date', '01/01/2022 05:00:00', 'accounting_server_000001', 'ACCOUNT', 'ACCOUNT_Adapter', 'Customer Update Received', 10),
  createRow('eai_crm_server_111111', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.45.03.480000 AM', 'Customer_Id', '123456', 'Effective_Date', '01/01/2022 05:00:00', 'accounting_server_000002', 'ACCOUNT', 'ACCOUNT_Adapter', 'Customer Update Persisted', 10),
  createRow('eai_crm_server_111111', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-MAY-22 12.45.03.480000 AM', 'Customer_Id', '123456', 'Effective_Date', '01/01/2022 05:00:00', 'operations_server_000001', 'OPER', 'OPER_Adapter', 'Customer Update Received', 10),
  createRow('eai_crm_server_111111', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.45.03.480000 AM', 'Customer_Id', '123456', 'Effective_Date', '01/01/2022 05:00:00', 'operations_server_000002', 'OPER', 'OPER_Adapter', 'Customer Update Persisted', 10),

  createRow('eai_crm_server_111112', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.55.03.480000 AM', 'Customer_Id', '234567', 'Effective_Date', '02/01/2022 05:00:00', 'crm_server_000003', 'CRM', 'CRM_Adapter', 'Customer Update Started', 10),
  createRow('eai_crm_server_111112', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-APR-22 12.55.03.480000 AM', 'Customer_Id', '234567', 'Effective_Date', '02/01/2022 05:00:00', 'crm_server_000004', 'CRM', 'CRM_Adapter', 'Customer Update Published', 10),
  createRow('eai_crm_server_111112', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.55.03.480000 AM', 'Customer_Id', '234567', 'Effective_Date', '02/01/2022 05:00:00', 'accounting_server_000003', 'ACCOUNT', 'ACCOUNT_Adapter', 'Customer Update Received', 10),
  createRow('eai_crm_server_111112', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.55.03.480000 AM', 'Customer_Id', '234567', 'Effective_Date', '02/01/2022 05:00:00', 'accounting_server_000004', 'ACCOUNT', 'ACCOUNT_Adapter', 'Customer Update Persisted', 30),
  createRow('eai_crm_server_111112', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.55.03.480000 AM', 'Customer_Id', '234567', 'Effective_Date', '02/01/2022 05:00:00', 'operations_server_000003', 'OPER', 'OPER_Adapter', 'Customer Update Received', 10),
  createRow('eai_crm_server_111112', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 12.55.03.480000 AM', 'Customer_Id', '234567', 'Effective_Date', '02/01/2022 05:00:00', 'operations_server_000004', 'OPER', 'OPER_Adapter', 'Customer Update Persisted', 10),

  createRow('eai_crm_server_111113', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 01.55.03.480000 AM', 'Customer_Id', '345678', 'Effective_Date', '03/01/2022 05:00:00', 'crm_server_000005', 'CRM', 'CRM_Adapter', 'Customer Update Started', 10),
  createRow('eai_crm_server_111113', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 01.55.03.480000 AM', 'Customer_Id', '345678', 'Effective_Date', '03/01/2022 05:00:00', 'crm_server_000006', 'CRM', 'CRM_Adapter', 'Customer Update Published', 10),
  createRow('eai_crm_server_111113', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 01.55.03.480000 AM', 'Customer_Id', '345678', 'Effective_Date', '03/01/2022 05:00:00', 'accounting_server_000005', 'ACCOUNT', 'ACCOUNT_Adapter', 'Customer Update Received', 10),
  createRow('eai_crm_server_111113', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 01.55.03.480000 AM', 'Customer_Id', '345678', 'Effective_Date', '03/01/2022 05:00:00', 'accounting_server_000006', 'ACCOUNT', 'ACCOUNT_Adapter', 'Customer Update Persisted', 10),
  createRow('eai_crm_server_111113', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 01.55.03.480000 AM', 'Customer_Id', '345678', 'Effective_Date', '03/01/2022 05:00:00', 'operations_server_000005', 'OPER', 'OPER_Adapter', 'Customer Update Received', 10),
  createRow('eai_crm_server_111113', 'EAI_DOMAIN_1', 'CRM', 'Customer_Update', '01-JAN-22 01.55.03.480000 AM', 'Customer_Id', '345678', 'Effective_Date', '03/01/2022 05:00:00', 'operations_server_000006', 'OPER', 'OPER_Adapter', 'Customer Update Persisted', 50),
];

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'EAI_TRANSACTION_CREATE_TIME') {
    return descendingDateComparator(a, b, orderBy);
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function descendingDateComparator(a, b, orderBy) {
  if (new Date(b[orderBy]) < new Date(a[orderBy])) {
    return -1;
  }
  if (new Date(b[orderBy]) > new Date(a[orderBy])) {
    return 1;
  }
  return 0;
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'SEVERITY',
    numeric: true,
    disablePadding: true,
    label: 'Severity',
  },
  {
    id: 'EAI_TRANSACTION_CREATE_TIME',
    dateTime: true,
    disablePadding: false,
    label: 'Created Date',
  },
  {
    id: 'BUSINESS_DOMAIN',
    numeric: true,
    disablePadding: false,
    label: 'Business Domain',
  },
  {
    id: 'APPLICATION',
    numeric: true,
    disablePadding: false,
    label: 'Application',
  },
  {
    id: 'ACTIVITY',
    numeric: true,
    disablePadding: false,
    label: 'Activity',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  // You can change the numbers of rows that appear
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.SEVERITY);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, severity) => {
    const selectedIndex = selected.indexOf(severity);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, severity);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (severity) => selected.indexOf(severity) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.SEVERITY);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                  //This section is used to display our Data on the table
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.SEVERITY)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.GLOBAL_INSTANCE_ID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.SEVERITY_NAME}
                      </TableCell>
                      <TableCell align="right">{row.EAI_TRANSACTION_CREATE_TIME}</TableCell>
                      <TableCell align="right">{row.BUSINESS_DOMAIN}</TableCell>
                      <TableCell align="right">{row.APPLICATION}</TableCell>
                      <TableCell align="right">{row.ACTIVITY}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
