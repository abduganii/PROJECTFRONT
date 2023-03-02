import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { SvgIcon, Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import { BlockUser, DeleteUser, GetUsers, UserToAdmin } from '../../shared/apis/authApi';
import { useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function UsersList() {
    const navigate = useNavigate()
    const [user, setUser] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchUser = async () => {
            const data = await GetUsers();
            setUser(data.user);
            setIsLoading(false)
        }
        fetchUser()

    }, []);



    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead style={{ backgroundColor: "black", color: "white" }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }}>Name</TableCell>
                        <TableCell style={{ color: "white" }} >email</TableCell>
                        <TableCell style={{ color: "white" }} align="right">blocked</TableCell>
                        <TableCell style={{ color: "white" }} align="right">isAdmin</TableCell>
                        <TableCell style={{ color: "white" }} align="right">icon</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        isLoading ? <span>loading</span> : <>
                            {
                                user && user?.map((e: any) => (
                                    <TableRow
                                        key={e?.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {e?.name}
                                        </TableCell>
                                        <TableCell >{e?.email}</TableCell>
                                        <TableCell align="right"><Switch {...label} checked={e?.blocked} onChange={(elem) => {
                                            BlockUser(e?._id, { blocked: elem.target.checked })
                                            alert("seccesfull ")
                                        }} /></TableCell>
                                        <TableCell align="right"><Switch {...label} checked={e?.isAdmin} onChange={(elem) => {
                                            UserToAdmin(e?._id, { isAdmin: elem.target.checked })
                                            alert("seccesfull ")
                                        }} /></TableCell>
                                        <TableCell align="right"> <SvgIcon component={DeleteIcon} inheritViewBox onClick={() => {
                                            DeleteUser(e?._id)
                                            alert("user Deleted ")
                                        }} />

                                            <Button onClick={() => navigate(routes.USER + `/${e._id}`)}> go to user page</Button>
                                        </TableCell>

                                    </TableRow>
                                ))
                            }</>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
