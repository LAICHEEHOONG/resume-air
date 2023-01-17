import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


const Wallpaper = () => {

  return (
    <Card>
      <CardMedia
        component="img"
        height={`${window.screen.height - 120}px`}
        image="https://picsum.photos/1080"
        alt="Paella dish"
      />
    </Card>
  );
}

export default Wallpaper;