import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Button } from '@mui/material';
import { Home, Settings, Input as InputIcon } from '@mui/icons-material';
import ScienceIcon from '@mui/icons-material/Science';
import { useSelector } from 'react-redux';
import SideBarReaction from './SideBarReaction';

const drawerWidth = 340;

const Sidebar = ({ open, toggleDrawer }) => {
  const reactionsHistory = useSelector(state => state.reactions.history);

  console.log('reaction history-------->', reactionsHistory)
  return (
    <>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          zIndex: 1300, 
          position: 'absolute', 
          top: 0,
          left: 0,
          height: '100vh', 
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            transition: 'width 0.3s',
            position: 'absolute',
            height: '100vh', 
          },
        }}
      >
        <Typography sx={{padding:"1.5rem 1rem"}}>Chemical Reaction History</Typography>
        <List sx={{ marginTop: '3rem' }}>
          { reactionsHistory.map(reactionHistory=> (
            reactionHistory.reactions.map((reaction,index)=> {
              console.log('reaction history-------->',reaction);
              return <ListItem key={index} sx={{':hover': {  backgroundColor: 'gray'},display:"flex",justifyContent:"space-between"}}>
                      <SideBarReaction reactants={reaction.reactants} products={reaction.products} />
                      <Button variant='contained'>
                        <ScienceIcon />
                      </Button>
                    </ListItem>
            })
          ))}
        </List>
      </Drawer>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          top: '4.5rem',
          left: open ? `${drawerWidth - 32}px` : '-1rem', 
          zIndex: 1301, 
          transition: 'left 0.3s, transform 0.3s',
          transform: open ? 'rotate(180deg)' : 'none', 
          width: '3rem',
          height: '3rem',
        }}
      >
        <InputIcon sx={{ width: '2rem', height: '2rem' }} />
      </IconButton>
    </>
  );
};

export default Sidebar;
