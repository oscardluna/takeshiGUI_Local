import styles from './modal.module.css';
import { Modal, Box, Typography } from '@mui/material';
import Image from 'next/image';

import { useState } from 'react';
import { text } from 'stream/consumers';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '95%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 12,
    p: 0.1,

};

const styleNoBkg = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height: '85%',
    bgcolor: 'transparent',
    border: 'none',
    boxShadow: 0,
    p: 0,
};

const textstyle = {
    
    height: '100%',
    fontSize: "80px",
    overflowWrap: "break-word",
    hyphens: "auto",
    display: "inline",
    textAlign: 'center',
      
    
}


export function MyModal({ isOpen, onClose, modalString = ""}) {
      
    return (
        <>
            <Modal
                open={false}         // for debugging with HSR change to isOpen
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{backdropFilter: "blur(10px)"}}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3">
                        Robot said (talk when LED color is WHITE):
                    </Typography>
                    <hr />
                    {/*<Typography id="modal-modal-description" sx={{ mt: 2 }} variant='h1' whiteSpace={'pre-line'}>
                        {modalString}
    </Typography>*/}
                    <Box sx={{...textstyle,maxHeight: "75%"}}>
                    Si:{modalString}
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export function EmergencyModal({ isOpen }) {
    return (
        <>
            <Modal
                open={false}        // for debugging with HSR change to isOpen
                // onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{backdropFilter: "blur(10px)"}}
            >
                <Box sx={{ ...styleNoBkg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography id="modal-modal-title" variant="h3">
                        Emergency Button Enable
                    </Typography>
                    <hr />
                    <Box sx={{ position: 'relative', width: '90%', height: '90%' }}>
                        <Image
                            src="/imgs/emergency.gif"
                            alt="Description"
                            fill
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export function MicrophoneModal({ data }) {


    return (
        <>
            <Modal
                open={false}        // for debugging with HSR change to data
                // onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{backdropFilter: "blur(10px)"}}
            >
                <Box sx={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography id="modal-modal-title" variant="h3">
                        Microphone is Listening, talk NOW
                    </Typography>
                    <hr />
                    <Box sx={{ position: 'relative', width: '90%', height: '90%' }}>
                        <Image
                            src="/imgs/microphone.png"
                            alt="Description"
                            fill
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export function ImageModal({ imageTopicName = " ", hostName = " "}) {
    var url = `http://${hostName}:8901/stream?topic=${imageTopicName}&type=ros_compressed`;
    //var newURL = `/${imageTopicName}`;

    var newURL = "/imgs/pointingBAG.gif";
    //var dataStart = data == 'Start'
    var titleTEXT = "TEST";
    var isOpen = false;
    if (imageTopicName != "") {
        isOpen = true
    }

    if (imageTopicName =="pointingBAG.gif"){
        titleTEXT = "Point at the bag, please"
    }
    
    if (imageTopicName =="drinkingPose.gif"){
        titleTEXT = "If possible, stay like this:"
    }

    if (imageTopicName =="trashPick.gif"){
        titleTEXT = "Please pickup the trash, thanks!"
    }
    
    return (
        <>
            <Modal
                open={false}        // for debugging with HSR change to isOpen
                // onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{backdropFilter: "blur(10px)"}}
            >
                <Box sx={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' ,fontSize: 5}}>
                    <Typography id="modal-modal-title" variant="h3">
                        Robot: {isOpen}
                    </Typography>
                    <hr />
                    <Box sx={{ position: 'relative', width: '90%', height: '90%', textAlign: 'center' }}>
                        <Image 
                            src={newURL} 
                            alt="dev logo" 
                            //style={{ display: 'inline-block', verticalAlign: 'middle' }} 
                            fill
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
