import React, { useState, useContext } from 'react';
import { UserContext } from '../App/App.jsx';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header: {
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    routeName: {
        color: theme.palette.text.primary,
    },
    data: {
        marginRight: theme.spacing(3),
        color: theme.palette.text.primary,
        fontFamily: theme.typography.h1.fontFamily,
    }

}));

export default function trashCreator(props) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [trashImage, setTrashImage] = useState([]);
    const [redirect, setRedirect] = useState();
    const classes = useStyles();

    const user = useContext(UserContext);

    const user_id = user.id;

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    }

    const handleFileChange = (event) => {
        setTrashImage(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('form submitting', { location, type });

        let trash = new FormData();


        trash.append('trashImage', trashImage, trashImage.location);


        trash.append('location', location);
        trash.append('type', type);

        const response = await axios.post('/api/user/' + user_id + '/trash', trash);

        if (response.status === 200) {
            const { trashes } = props;
            trashes.trashes.push({
                'location': response.data.location,
                'type': response.data.type,
                'image': response.data.file_name,
                'id': response.data.trash_id
            });
            props.setAddNewTrash(false);

            props.setTrashes({ ...trashes });

        }
    }
    return (
        <Container maxWidth="xs">
            <Typography variant="h3"
                className={classes.header}
            >
                Create new trash.
                </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="trash name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={handleNameChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="type"
                    label="type"
                    name="type"
                    autoComplete="type"
                    autoFocus
                    onChange={handleBreedChange}
                />
                <div className="formElement">
                    <label htmlFor="trash-pic">Choose trash picture</label>
                    <input type="file" name="trash-pic" onChange={handleFileChange} />
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Submit
                  </Button>
            </form>
        </Container>
    )

}