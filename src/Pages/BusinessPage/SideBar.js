import React from 'react';
import ButtonsComponent from './ButtonsComponent';
import { Dialog } from '@material-ui/core';
import './SideBar.css';
import { Modal } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const SideBar = ({showBar, setShowBar}) => {
    
    const handleClose = () => {
        setShowBar(false);
      };

    return(
        <Modal
            Transition={Transition}
            className='side-bar'
            open={showBar}
            onClose={handleClose}>
        <div>
            <ButtonsComponent/>
        </div>
        </Modal>
    );
}

export default SideBar;