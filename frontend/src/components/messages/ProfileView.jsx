import React from 'react';
import { ChevronRight } from 'lucide-react';
import avatar from "../../assets/Avatar.png"
import { connect } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { VerifiedIcon } from '../../assets/Icons';

const ChatListItem = ({ name, message, isOnline,profilePic,unreadMessages,givenId,verified }) => {
  // console.log(isOnline,givenId)
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full p-4 border-b border-[#2f2f2f] hover:bg-gray-800/50 cursor-pointer transition-colors" onClick={() => navigate(`/messages/${givenId}`)}>
      <div className="flex items-center gap-3 w-full">
        <div className="relative">
          <img src={avatar} alt={`${name}'s avatar`} className="w-12 h-12 rounded-full object-cover" />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
          )}
        </div>
        <div className='max-w-3/4 ml-1'>
          <div className="flex items-center gap-1">
            <h3 className="text-white font-medium">{name}</h3>
            {verified && <VerifiedIcon h={16} w={16} />}
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">{message}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {unreadMessages==0?<ChevronRight className="text-gray-500" size={20} />:<>
          <div className="w-6 h-6 text-center bg-green-500 text-[12px] flex items-center justify-center rounded-full">{unreadMessages}</div>
        </>}
      </div>
    </div>
  );
};


const ChatList = (props) => {
  console.log(props.userChat.chats)
  return (
    <div className="w-full bg-black text-white rounded-lg">
      
      {Object.entries(props.userChat.chats)
  .sort(([, a], [, b]) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
  .map(([key, chat]) => (
    <ChatListItem
      key={key}
      name={chat.userDetails.firstName}
      message={chat.message}
      isOnline={props.userChat.onlineUsers.includes(key)}
      profilePic={chat.userDetails.profilePic}
      unreadMessages={chat.unreadMessages}
      givenId={key}
      verified={chat.userDetails.verified}
    />
))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    socket: state.socket,
    messages: state.messages,
    userChat: state.userChat,
  }
}

export default connect(mapStateToProps)(ChatList);