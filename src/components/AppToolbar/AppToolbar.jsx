// MATERIALS
import {
  AppBar, Drawer, Fab, IconButton, List, ListItem, Toolbar, Typography,
  Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button,
  Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

// REACT
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { createBoard, createPostit } from '../../actions/index';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  drawer: {
    flexGrow: 1,
    width: '15rem',
  },
}));

function AppToolbar() {
  const classes = useStyles();
  const [showDrawer, setshowDrawer] = useState(false);
  const [showPostitForm, setshowPostitForm] = useState(false);
  const [showWallForm, setShowWallForm] = useState(false);

  const [postitTitle, setPostitTitle] = useState('');
  const [postitContent, setPostitContent] = useState('');

  const [wallTitle, setWallTitle] = useState('');

  const boards = useSelector((state) => state.boards);
  const index = useSelector((state) => state.index);
  const dispatch = useDispatch();
  const toggleDrawer = () => {
    setshowDrawer(!showDrawer);
  };

  const togglePostitForm = () => {
    setshowPostitForm(!showPostitForm);
  };

  const toggleWallForm = () => {
    setShowWallForm(!showWallForm);
  };

  const handlePostitForm = () => {
    if (postitTitle !== '' || postitContent !== '') {
      dispatch(createPostit(postitTitle, postitContent, index));
      togglePostitForm();
    }
  };

  const handleWallForm = (e) => {
    if (e.key === 'Enter') {
      dispatch(createBoard(wallTitle));
      setShowWallForm(false);
      toggleWallForm();
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
            <List component="nav" aria-label="drawer" className={classes.drawer}>
              {
                boards.map((board, i) => (
                  <Link to={`/${i}`} key={`link-${board.title}`}>
                    <ListItem button selected={index === i} onClick={toggleDrawer}>
                      { board.title }
                    </ListItem>
                  </Link>
                ))
              }
            </List>
            <Divider />
            {
              showWallForm
              && (
              <div>
                <TextField
                  id="wall-title"
                  label="Titre du mur"
                  onChange={(e) => setWallTitle(e.target.value)}
                  onKeyDown={handleWallForm}
                />
              </div>
              )
            }
            <Button color="primary" onClick={toggleWallForm}>Ajouter un mur</Button>
          </Drawer>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {boards[index].title}
          </Typography>
          <Fab color="secondary" aria-label="add" onClick={togglePostitForm}>
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>

      <Dialog open={showPostitForm} onClose={togglePostitForm}>
        <DialogTitle>
          Ajouter un post-it sur
          <strong>{boards[index].title}</strong>
        </DialogTitle>
        <DialogContent>
          <TextField id="postit-title" label="Titre" fullWidth onChange={(e) => setPostitTitle(e.target.value)} />
          <TextField id="postit-content" label="Contenu" fullWidth multiline rows="3" onChange={(e) => setPostitContent(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={togglePostitForm}>Annuler</Button>
          <Button color="primary" onClick={handlePostitForm}>Créer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppToolbar;
