import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { toast } from "react-hot-toast";
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
import CallButton from "../components/CallButton";
import useToken from "../hooks/useToken";

const VITE_STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setchatClient] = useState(null);
  const [channel, setchannel] = useState(null);
  const [loading, setloading] = useState(true);

  const { authUser } = useAuthUser();


  const {token} = useToken();
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
        toast.error("Could not connect to chat, please try again");
      } finally {
        setloading(false);
      }
    };
    initChat();
  }, [token, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Joim me here: ${callUrl}`,
      });

      toast.success("Video call link send successfully");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;
  return (
    <div className="h-[94vh] ">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
