import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '97%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function CustCard({edit, docName, t, timestamp, url, att, handleDelete}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{margin:10}} className={classes.root}>  
      <CardContent >
        <Typography variant="body2" style={{fontSize:24}} color='textPrimary' component="p">
        <img style={{width:'40px', height:'40px', marginRight:5}} src={'https://www.maxpixel.net/static/photo/1x/Time-Of-Clock-Time-Indicating-Time-Icon-1606153.png'}></img>
          {timestamp}
           <IconButton style={{float:'right'}} onClick={()=>{handleDelete(t,docName)}}>
             <Delete/>
           </IconButton>
           {edit > 0 && <><Button style={{float:'right', marginRight:10}} variant='contained' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          Options<ExpandMoreIcon/>
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>Edit</MenuItem>
                          <MenuItem onClick={handleClose}>Resubmit</MenuItem>
                        </Menu></>}
        </Typography>
        </CardContent>
        <IconButton
            style={{float:'right', marginRight:15}}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> 
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Url(s): {url}</Typography>
          <Typography> Attachment: {docName}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
