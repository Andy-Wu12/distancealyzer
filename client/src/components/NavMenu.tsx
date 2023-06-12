import { useState } from 'react';

import LightModeButton from './LightModeButton';
import SPARedirectButton from './SPARedirectButton';

import { Button, MenuItem, Menu } from '@mui/material';

interface NavMenuProps {
  isLight: boolean,
  setIsLight: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavMenu({isLight, setIsLight}: NavMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div className='NavMenu'>
      <Button onClick={handleOpen}>
        Menu
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem>
          <SPARedirectButton onClick={handleClose} text="Home" location="/" color="secondary" variant="contained" />
        </MenuItem>
        <MenuItem>
          <SPARedirectButton onClick={handleClose} text="Calculator" location="/calc" color="primary" variant="outlined" />
        </MenuItem>
        <MenuItem>
          <LightModeButton isLight={isLight} setIsLight={setIsLight} />
        </MenuItem>
      </Menu>
    </div>
  )
}