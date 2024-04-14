import React from 'react';
import { Card, Typography, CardActions, Button, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

function Sensor({ id, status, name })
{
    console.log({ id, status, name })

    return (
        
        <Link to={`/devices/${id}`}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">See More</Button>
                </CardActions>
            </Card>
        </Link>
    );
}

export default Sensor