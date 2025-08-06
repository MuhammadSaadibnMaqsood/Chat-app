import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader";

const VITE_STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setchatClient] = useState(null);
  const [channel, setchannel] = useState(null);
  const [loading, setloading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: token } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!token?.token || !authUser) return;
      try {
        const client = StreamChat.getInstance(VITE_STREAM_API_KEY);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            profilePic: authUser.profilePic,
          },
          token.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setchannel(currChannel);
        setchatClient(client);
      } catch (error) {
        console.log("error in stream chat use effect ", error);
      } finally {
        setloading(false);
      }
    };
    initChat();
  }, []);


  if (loading || !chatClient || !channel) return <ChatLoader/>
  return <div>ChatPage</div>;
};

export default ChatPage;
