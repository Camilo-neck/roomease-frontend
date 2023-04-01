// React
import * as React from 'react';

// Material UI
import { Button, ToggleButton, ToggleButtonGroup, IconButton, ListItem } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';


const MediaCard= ({ name, description, address, picture}: { name: string; description: string, address: string, picture: string }) => {
    return (
        <Card className='shadow-lg rounded-lg' sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 150 }}
            image={picture}
          />
          <CardContent > 
            <Typography className='text-center leading-5 font-semibold text-lg' gutterBottom component="div">
                {name}
            </Typography>
            <Typography className='text-sm text-center line-clamp-1' gutterBottom component="div"  color="text.secondary">
              {address}
            </Typography>
            <Typography className='line-clamp-3 leading-5 text-sm'>
              {description}
            </Typography>
          </CardContent>
          <CardActions className='items-center p-1'>
            <Button className='w-full self-auto' size="small">Editar</Button>
          </CardActions>
        </Card>
    );
}

export default MediaCard;