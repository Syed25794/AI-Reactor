import { AppBar, Toolbar,  MenuItem, Select, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../context/AuthReducer/action';
import { setLanguage } from '../context/LanguageReducer/action';
import logo from './../assets/images/logo.png';

const Navbar = ({ setLoginModalOpen }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const languageStore = useSelector((state) => state.language);
  const { language, translations } = languageStore;


  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut(language));
  }

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{margin:"2px"}}>
          <img width={'60px'} alt='Logo of Magic Reactor' style={{borderRadius:"30px"}} src={logo} />
        </Box>
        <Box>
          <Select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            sx={{ color: 'white', marginRight: 2 }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">हिंदी</MenuItem>
            <MenuItem value="ur">اردو</MenuItem>
          </Select>
          {isAuthenticated ? <Button onClick={handleLogOut} variant='contained'>{translations.logOut}</Button> : <Button onClick={()=>setLoginModalOpen(true)} variant='contained'>{translations.signIn}</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
