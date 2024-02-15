import {
    Stack,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    TableCell,
    TableBody
} from "@mui/material";
import { getLocaleDateString, spiltUnderLine } from "utils/helpers/main";
import { Contract } from 'types/contractManagment'

const Verification = ({ data }: { data?: Contract }) => {
    return (
      <Stack mt={2}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Verify At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={"fdg"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Landlord
                </TableCell>
                <TableCell align="right">
                  {spiltUnderLine(data?.landlordVerification?.status)}
                </TableCell>
                <TableCell align="right">
                  {getLocaleDateString(data?.landlordVerification?.verifiedAt)}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow
                key={"fdg"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tenant
                </TableCell>
                <TableCell align="right">
                  {spiltUnderLine(data?.tenantVerification?.status)}
                </TableCell>
                <TableCell align="right">
                  {getLocaleDateString(data?.tenantVerification?.verifiedAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
}

export default Verification
