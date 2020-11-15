// MATERIALS
import {
  AppBar, Drawer, Fab, IconButton, List, ListItem, Toolbar, Typography,
  Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button,
  Divider, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

// REACT
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TwitterPicker } from 'react-color';

// ACTIONS
import { createBoard, createPostit, deleteBoard } from '../../actions/actions';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  drawer: {
    flexGrow: 1,
    width: '15rem',
  },
  wallLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  textField: {
    margin: '1rem 0',
  },
}));

function AppToolbar() {
  const classes = useStyles();
  const [showDrawer, setshowDrawer] = useState(false);
  const [showPostitForm, setshowPostitForm] = useState(false);
  const [showWallForm, setShowWallForm] = useState(false);

  // Postit inputs
  const [postitTitle, setPostitTitle] = useState('');
  const [postitContent, setPostitContent] = useState('');
  const [postitColor, setPostitColor] = useState('#7bdcb5');

  // Wall inputs
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
      dispatch(createPostit({
        title: postitTitle,
        content: postitContent,
        color: postitColor,
        index,
      }, { propagate: true }));
      togglePostitForm();
    }
  };

  const handleWallForm = (e) => {
    if (e.key === 'Enter') {
      dispatch(createBoard(wallTitle, { propagate: true }));
      setShowWallForm(false);
      toggleWallForm();
    }
  };

  const deleteWall = (i) => {
    if (index !== i) {
      dispatch(deleteBoard(parseInt(i, 10), { propagate: true }));
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
            <Button color="primary" onClick={toggleWallForm}>Ajouter un mur</Button>
            {
              showWallForm
              && (
                <div>
                  <TextField
                    id="wall-title"
                    label="Titre du mur"
                    autoComplete="off"
                    onChange={(e) => setWallTitle(e.target.value)}
                    onKeyDown={handleWallForm}
                  />
                </div>
              )
            }
            <Divider />
            <List component="nav" aria-label="drawer" className={classes.drawer}>
              {
                boards.map((board, i) => (
                  <Link to={`/board/${i}`} className={classes.wallLink} key={`link-${board.title}`}>
                    <ListItem selected={index === i}>
                      <ListItemText primary={board.title} onClick={toggleDrawer} />
                      {
                        index !== i && (
                          <ListItemSecondaryAction>
                            <Button color="primary" onClick={() => deleteWall(i)}>
                              <DeleteIcon />
                            </Button>
                          </ListItemSecondaryAction>
                        )
                      }
                    </ListItem>
                  </Link>
                ))
              }
            </List>
          </Drawer>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {boards[index] && boards[index].title}
          </Typography>
          {
            boards[index]
            && (
              <Fab color="secondary" aria-label="add" onClick={togglePostitForm}>
                <AddIcon />
              </Fab>
            )
          }
        </Toolbar>
      </AppBar>

      <Dialog open={showPostitForm} onClose={togglePostitForm}>
        <DialogTitle>
          Ajouter un post-it sur
          <strong>{boards[index] && ` ${boards[index].title}`}</strong>
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            id="postit-title"
            label="Titre"
            fullWidth
            autoComplete="off"
            onChange={(e) => setPostitTitle(e.target.value)}
            className={classes.textField}
          />
          <TextField
            required
            id="postit-content"
            label="Contenu"
            fullWidth
            multiline
            rows="3"
            onChange={(e) => setPostitContent(e.target.value)}
            autoComplete="off"
            className={classes.textField}
          />
          <TwitterPicker
            color={postitColor}
            onChangeComplete={(e) => setPostitColor(e.hex)}
          />
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
