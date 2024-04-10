import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

function VirtualizedList({ sensorData }) {

  function renderRow(props) {
    const { index, style } = props;
    const sensor = sensorData[index]; 

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`${sensor.name} - ${sensor.status}`} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={sensorData.length} 
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}

export default VirtualizedList;