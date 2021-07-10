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
import { Delete,Edit } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditDialog from './Edit';


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

export default function CustCard({edit, resubmit, det, timestamp, handleDelete, handleResubmit}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    console.log(det.docId)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <EditDialog det={det} showDialog={showDialog} setShowDialog={setShowDialog}/>
    <Card style={{margin:10}} className={classes.root}>  
      <CardContent >
        <Typography variant="body2" style={{fontSize:24}} color='textPrimary' component="p">
        <img style={{width:'40px', height:'40px', marginRight:5}} src={'https://www.maxpixel.net/static/photo/1x/Time-Of-Clock-Time-Indicating-Time-Icon-1606153.png'}></img>
          {timestamp}
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
                          <MenuItem onClick={() => {handleClose();setShowDialog(true)}}><Edit/>Edit</MenuItem>
                          <MenuItem onClick={()=>{handleDelete(det.docId,det.docName)}}><Delete/>Delete</MenuItem>
                          {resubmit > 0 && <MenuItem onClick={() => {handleClose();handleResubmit(det.docId)}}>Resubmit</MenuItem>}
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
          <Typography>Subject: {det.subject}</Typography>
          <Typography>Description: {det.desc}</Typography>
          <Typography>Url(s): {det.url}</Typography>
          <Typography> Attachment: {det.attName}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}
