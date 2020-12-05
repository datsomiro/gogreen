import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SearchBox = (props) => {
    const classes = useStyles();
    const [searchValue, setSearchvalue] = useState('');
    const [searchErrors, setSearchErrors] = useState(null);

    const handleChange = (e) => {
        setSearchvalue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestURL =
            'https://api.opencagedata.com/geocode/v1/json?q=' + searchValue + '&key=ed5a10c7432142a49297af51590b4709'

        const response = await axios.get(requestURL);
        console.log(response);

        if (response.status === 200) {
            if (response.data.results.length > 0) {
                const centerCoordinates = [response.data.results[0].geometry.lng, response.data.results[0].geometry.lat]
                setSearchErrors(null);

                props.handleSearchInput(centerCoordinates);
            } else {
                setSearchErrors('Nothing found, try to be more specific. We are looking for routes in radius of 50km...');
            }

        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="search"
                    label="Search for any place"
                    name="search"
                    autoComplete="searchValue"
                    autoFocus
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Search
                  </Button>
            </form>
            {
                searchErrors ? (
                    <div className="search-errors">
                        {searchErrors}
                    </div>
                ) : (
                        <div className="search-errors">
                        </div>
                    )
            }
        </Container>
    )
}

export default SearchBox;