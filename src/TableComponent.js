import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { useState } from 'react';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

export default function TableComponent(props){
    let bookmarked = localStorage.getItem("bookmarkedCoins") || [];
    const [bookmarkedCoins, setbookmarkedCoins] = useState(bookmarked);
    const [searchTerm, setSearchTerm] = useState("");
    const [exchangeRate, setExchangeRate] = useState("usd");


    function addBookmark(coin){
        let bookmarked = localStorage.getItem("bookmarkedCoins");
        if(bookmarked){
            bookmarked = JSON.parse(bookmarked);
        }else{
            bookmarked = [];
        }

        if(! bookmarked.includes(coin)){
            bookmarked.push(coin);
        }
        setbookmarkedCoins(bookmarked);
        localStorage.setItem("bookmarkedCoins", JSON.stringify(bookmarked));
    }

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
                <TextField className='currency-search' id="outlined-basic" label="Search..." variant="outlined" onChange={(event)=>{setSearchTerm(event.target.value);}} />

                <div className='nav-right'>
                    <Button className='bookmark-btn' variant="outlined"><a href='/bookmark'>Bookmarks</a></Button>

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
                </div>

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
                        if(searchTerm === ""){
                            return row;
                        }else if(row.coin.toLowerCase().includes(searchTerm.toLowerCase())){
                            return row;
                        }
                    }).map((row) => (
                    <TableRow
                        key={row.coin}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row"  className='coin-name' align='center'>{row.coin}</TableCell>
                        <TableCell align="center">{row[exchangeRate]}</TableCell>
                        {bookmarkedCoins.includes(row.coin)?
                            <TableCell align='center'><BookmarkOutlinedIcon onClick={() => removeBookmark(row.coin)} /></TableCell>
                            :
                            <TableCell align='center'><BookmarkBorderOutlinedIcon onClick={() => addBookmark(row.coin)} /></TableCell>
                        }
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}