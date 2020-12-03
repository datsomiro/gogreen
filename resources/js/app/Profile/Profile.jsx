import React, { useState, useEffect, useContext } from 'react';
import CreateTrash from '../Trash/CreateTrash.jsx';
import TrashView from '../Trash/TrashView.jsx';
import ProfilePicture from '../Register/ProfilePicture.jsx';
import UserOwnedRoutes from '../UserOwnedRoutes/UserOwnedRoutes';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { UserContext } from '../App/App.jsx';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cont: {
        maxWidth: 250,
        minWidth: 250,
        margin: 10,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    trashFrom: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function Profile(props) {

    const user = useContext(UserContext);
    const [addNewTrash, setAddNewTrash] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [trashes, setTrashes] = useState(null);
    const [activeTab, setActiveTab] = useState();
    const classes = useStyles();

    const loadData = async () => {
        if (user) {
            const id = user.id;
            const url = `/api/trash/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            setTrashes(data);
            setProfilePicture(user.photo);
            setActiveTab('trashes');
        }
    }

    useEffect(() => {
        loadData();
    }, [user])

    useEffect(() => {
        props.fetchUser();
    }, [profilePicture])

    const handleTab = (e) => {
        setActiveTab(e.target.innerHTML);
    }

    let tabElm;
    let trasInput;
    console.log(trashes);
    if (activeTab == 'the Trash') {

        if (addNewTrash) {
            trashInput = (
                <div className="create-trash-form">
                    <CreateTrash setTrashes={setTrashes} trashes={trashes} setAddNewTrash={setAddNewTrash} />
                </div>
            )
        }
        tabElm = (
            <div className={classes.trashForm}>
                <Button variant="contained" color="primary" onClick={() => { setAddNewTrash(!addNewTrash) }}>
                    Add new trash here
                </Button>
                <trashView trashes={trashes} />
            </div>
        )
    } else if (activeTab == 'Your routes') {
        tabElm = (
            <UserOwnedRoutes userID={user.id} />
        )
    }

    if (user === null) {
        return ('Loading...')
    } else {

        return (

            <div>
                <Container maxWidth="xs" className={classes.cont}>
                    <Typography gutterBottom variant="h3" component="h2">
                        {user.name} {user.surname}
                    </Typography>
                    <ProfilePicture userPhoto={profilePicture} setProfilePicture={setProfilePicture} />
                </Container>

                <div className="tabs">
                    <ButtonGroup color="secondary" variant="text" aria-label="outlined primary button group">
                        <Button onClick={handleTab}>Your routes</Button>
                        <Button onClick={handleTab}>Your trashes</Button>
                    </ButtonGroup>
                </div>
                { tabElm}
                { trashInput}


            </div>
        )
    }
}