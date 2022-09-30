import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

export default function TableBookmark(props){
    let bookmarked = localStorage.getItem("bookmarkedCoins") || [];
    const [bookmarkedCoins, setbookmarkedCoins] = useState(bookmarked);
    const [exchangeRate, setExchangeRate] = useState("usd");

    function removeBookmark(coin){
        let bookmarked = localStorage.getItem("bookmarkedCoins");
        bookmarked = JSON.parse(bookmarked);

        for( var i = 0; i < bookmarked.length; i++){ 
            if ( bookmarked[i] === coin) { 
                bookmarked.splice(i, 1); 
                i--; 
            }
        }

        setbookmarkedCoins(bookmarked);
        localStorage.setItem("bookmarkedCoins", JSON.stringify(bookmarked));
    }

    const handleCurrencyChange = (event) => {
        setExchangeRate(event.target.value);
    };

    return (
        <div>
            <nav className='navbar'>
                <h1 className='nav-brand'><a href='/'>CoinSea</a></h1>

                <FormControl className='currency-dropdown'>
                    <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={exchangeRate}
                    label="Currency"
                    onChange={handleCurrencyChange}
                    >
                    <MenuItem value="usd">USD</MenuItem>
                    <MenuItem value="inr">INR</MenuItem>
                    <MenuItem value="eur">EUR</MenuItem>
                    <MenuItem value="jpy">JPY</MenuItem>
                    <MenuItem value="twd">TWD</MenuItem>
                    </Select>
                </FormControl>
            </nav>


            <TableContainer className='table-container' component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    <TableCell className='column-heading' align="center">Coin</TableCell>
                    <TableCell className='column-heading' align="center">Exchange Rate</TableCell>
                    <TableCell className='column-heading' align='center'>Bookmark</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.props.filter((row)=>{
                        if(bookmarkedCoins.includes(row.coin)){
                            return row;
                        }
                    }).map((row) => (
                    <TableRow
                        key={row.coin}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" className='coin-name' align='center'>{row.coin}</TableCell>
                        <TableCell align="center">{row[exchangeRate]}</TableCell>
                        <TableCell align='center'><BookmarkOutlinedIcon onClick={() => removeBookmark(row.coin)} /></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}