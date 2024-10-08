'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { Box, Link, Grid, Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ROSLIB from "roslib";
import { RosInterface } from './scripts/ros';
import { MyModal, EmergencyModal, ImageModal,MicrophoneModal} from "./_components/modal";
import BasicSpeedDial from './_components/speeddial';

const hostNname = process.env.NEXT_PUBLIC_MASTER_HOSTNAME

console.log("get from env-> ", process.env.NEXT_PUBLIC_MASTER_HOSTNAME)

export default function Home() {
  //const arr = [...new Array(100).keys()];

  // settings for modal
  var timeoutId: string | number | NodeJS.Timeout | null | undefined = null;
  var timeout = 10000;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(true);
  const [modalString, setModalString] = useState("");
  const [imageTopicName, setImageTopicName] = useState("");
  const [isMicTopicOpen, setIsMicTopicOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    clearTimeout(timeoutId);
  };

  useEffect(() => {

    const ros_interface = new RosInterface(hostNname)

    const robotTTSSub = new ROSLIB.Topic({ ros: ros_interface.ros, name: '/talking_sentence', messageType: 'std_msgs/String' });
    robotTTSSub.subscribe(message => {
      console.log("receive robot tts-> ", message);
      if (message.data == "") {
        return
      }
      setModalString(message.data);
      openModal()

      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(closeModal, timeout);
        console.log("update to ", timeoutId)
      } else {
        console.log('generate new one')
        timeoutId = setTimeout(closeModal, timeout)
      }
      console.log(timeoutId)
    });

    // ROS settings for EMERGENCY SUB
    /*const emergencySub = new ROSLIB.Topic({ ros: ros_interface.ros, name: '/hsrb/runstop_button', messageType: 'std_msgs/Bool' })
    emergencySub.subscribe(message => {
      setIsEmergencyModalOpen(message.data);
    })
    */
    const imageTopicNameSub = new ROSLIB.Topic({ ros: ros_interface.ros, name: '/image_topic_name', messageType: 'std_msgs/String' });
    imageTopicNameSub.subscribe(message => {
      console.log("receive image topic name -> ", message.data)
      setImageTopicName(message.data);
    })

    const micTopicNameSub = new ROSLIB.Topic({ ros: ros_interface.ros, name: '/talk_now', messageType: 'std_msgs/Bool' });
    micTopicNameSub.subscribe(message => {
      console.log("receive image topic name -> ", message.data)
      setIsMicTopicOpen(message.data);
      
    })



    return () => {
      robotTTSSub.unsubscribe();
      //emergencySub.unsubscribe();
      imageTopicNameSub.unsubscribe();
      micTopicNameSub.unsubscribe();
    };
  }, []);

  return (
    <>
      <MyModal isOpen={isModalOpen} onClose={closeModal} modalString={modalString} />
      <EmergencyModal isOpen={isEmergencyModalOpen} />
      <ImageModal imageTopicName={imageTopicName} hostName={hostNname} />
      <MicrophoneModal data={isMicTopicOpen} />
      <main className={styles.fullPageBackground}>
        <div className={styles.backgroundBlur}>

          <Box>
            <Grid container direction="column" sx={{ minHeight: "100vh" }}>

              <Grid item>
                <Box p={3}>
                  {/* 
                  <Link href={"/dashboard"}>
                    <img src="/aibot-logo.png" />
                  </Link>
                  */}
                  <img src="/imgs/aibot-logo.png" />
                </Box>
              </Grid>

              <Grid item xs overflow={"auto"}>
                <Box>
                  {/*
                    arr.map((ind) => (
                      <div key={ind}>{ind}</div>
                    ))
                    */}
                </Box>
              </Grid>
              <BasicSpeedDial />
              <Grid bgcolor={"white"} textAlign={"center"} borderRadius={"10px"}>
                <hr />
                <Typography>PUMAS Team, by eR@sers</Typography>
              </Grid>

            </Grid>
          </Box>
        </div>
      </main>

    </>
  )
}