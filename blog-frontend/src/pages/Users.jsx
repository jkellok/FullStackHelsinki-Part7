import { Link } from 'react-router-dom'
import { Typography, tableCellClasses, styled, TableHead, TableContainer, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Users = ({ users }) => {
  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h5">
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>user</StyledTableCell>
              <StyledTableCell>blogs created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
            <StyledTableRow key={user.id}>
              <StyledTableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </StyledTableCell>
              <StyledTableCell>
                {user.blogs.length}
              </StyledTableCell>
            </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default Users