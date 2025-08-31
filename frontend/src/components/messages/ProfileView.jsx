import React from 'react';
import { ChevronRight } from 'lucide-react';
import avatar from "../../assets/Avatar.png"
import { connect } from "react-redux"
import { useNavigate } from 'react-router-dom';

const ChatListItem = ({ name, message, isOnline,profilePic,unreadMessages,givenId }) => {
  console.log(isOnline,givenId)
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
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">{name}</h3>
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
const chats = [
  {
    id: 1,
    name: 'Ashish Gupta',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '2 days ago',
    avatar: '../../assets/Avatar.png',
    isOnline: true
  },
  {
    id: 2,
    name: 'Mariya G.',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and i want to offer you my services, However i do have my terms and condition ',
    timeAgo: '3 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: true
  },
  {
    id: 3,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 4,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 5,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 6,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
  {
    id: 7,
    name: 'Hassan Sheikh',
    message: 'Hello maam, I am interested in you job, my offer price is 400 rupees and ...',
    timeAgo: '6 days ago',
    avatar: '/api/placeholder/80/80',
    isOnline: false
  },
];

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