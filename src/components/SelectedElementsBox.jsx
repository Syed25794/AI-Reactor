import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled, keyframes } from '@mui/system';

const slideUp = keyframes`
  from {
    transform: translateY(400px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SelectedElementBox = styled(Box)(({ theme, bgcolor }) => ({
  position: 'relative',
  display: 'inline-block',
  width: '5rem',
  margin: '0.5rem',
  padding: '1rem',
  backgroundColor: bgcolor || '#f5f5f5',
  borderRadius: '1rem',
  animation: `${slideUp} 1s ease-out`,
}));

const RemoveIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0.5),
  right: theme.spacing(0.5),
}));

const SelectedElementsBox = ({ element, onRemove }) => {
  return (
    <SelectedElementBox bgcolor={element.color}>
      <RemoveIcon size="small" onClick={() => onRemove(element.symbol)}>
        <CloseIcon />
      </RemoveIcon>
      <Typography variant="h6">{`${element.symbol}(${element.state})`}</Typography>
      <Typography variant="subtitle1">{element.name}</Typography>
    </SelectedElementBox>
  );
};

export default SelectedElementsBox;