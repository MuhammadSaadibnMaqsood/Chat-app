import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setclient] = useState(null);
  const [call, setcall] = useState(null);
  const [isConnecting, setisConnecting] = useState(true);
  const { authUser, isLoading } = useAuthUser();

  const { data: token } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = () => {
      if (!token.token || !authUser || !callId) return;

      try {


      } catch (error) {
        console.log("error in stream video call use effect ", error);
        toast.error("Could not connect to video call, please try again");
      }
    };

    initCall();
  }, []);
  return <div></div>;
};

export default CallPage;
