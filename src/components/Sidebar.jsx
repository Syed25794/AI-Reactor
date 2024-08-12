import { Drawer, List, ListItem, IconButton, Typography, Button } from '@mui/material';
import { Input as InputIcon } from '@mui/icons-material';
import ScienceIcon from '@mui/icons-material/Science';
import { useSelector } from 'react-redux';
import SideBarReaction from './SideBarReaction';

const drawerWidth = 700;

const Sidebar = ({ open, toggleDrawer, setReaction }) => {
  const reactionsHistory = useSelector(state => state.reactions.history);
  const languageStore = useSelector((state) => state.language);
  const { translations } = languageStore;

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
          top: 0,
          left: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            transition: 'width 0.3s',
          },
        }}
      >
        <Typography sx={{marginTop:"5rem",paddingLeft:"1rem",fontWeight:"bold",fontSize:"1.5rem",textDecoration:"underline"}}>{translations.chemicalReactionHistory}</Typography>
        <List sx={{ marginTop: '1rem' }}>
          { reactionsHistory?.map(reactionHistory=> {
            return reactionHistory?.reactions?.map((reaction,index)=> {
              return <ListItem key={index} sx={{':hover': {  backgroundColor: '#d6d7db'},display:"flex",justifyContent:"space-between"}}>
                      <SideBarReaction reactants={reaction.reactants} products={reaction.products} />
                      <Button onClick={()=>setReaction(reactionHistory.id)}  variant='contained'>
                        <ScienceIcon />
                      </Button>
                    </ListItem>
            })
          })}
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
