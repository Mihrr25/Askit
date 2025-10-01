import React, { use, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChatInput from '../components/chatInput';
import { connect, useDispatch } from 'react-redux';
import { fetchMessages, sendMessage, sendMessageReset,setMessagesUpdateReset } from '../actions/messagesActions';
import { VerifiedIcon } from '../assets/Icons';


const UserMessagePage = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }

    }, []);
    useEffect(() => {
        if (!props.messages.messages) {
            dispatch(fetchMessages(id))
        }
        else if (props.messages.friendId !== id) {
            dispatch(fetchMessages(id))
        }
    }, []);

    function formatDate(date) {
        date=new Date(date);
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}-${month} ${hours}:${minutes}`;
    }

    const navigate = useNavigate();
    const smoothScrollToBottom = () => {
        console.log("Scrolling to bottom");
        const container = messagesEndRef.current;
        if (!container) return;


        const start = container.scrollTop;
        const end = container.scrollHeight - container.clientHeight;
        const startTime = performance.now();
        // console.log("Start:", start, "End:", end);
        let dif = end - start;
        let duration = 0;
        if (dif < 500) duration = 300;
        else if (dif < 1000) duration = 350;
        else if (dif < 1500) duration = 400;
        else if (dif < 2000) duration = 450;
        else duration = 500;

        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);  // Normalize to 0-1 range
            container.scrollTop = start + (end - start) * progress;  // Linear interpolation

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };
    const handleSendMessage = () => {
        if (message.trim()) {
            console.log("Message Sent:", message);
            smoothScrollToBottom()
            dispatch(sendMessage(id, message));
        }
    };
    useEffect(() => {
        if (props.messages.messageSent) {
            setMessage("");
            dispatch(sendMessageReset())
        }
    }, [props.messages.messageSent]);
    useEffect(() => {
        if (props.messages?.messages?.messages){
            smoothScrollToBottom()
        }
    },[props.messages?.messages?.messages]);

    if (props.messages.loading || (!props.messages.messages)) {
        return (
            <div className="">loading...</div>
        )
    }
    return (
        <div className="h-[100vh] w-full max-w-[500px] bg-black text-white flex flex-col p-4">
            {/* Top Navigation Bar */}
            <div className={`topNavBar flex w-full justify-between items-center mt-4 px-4`}>
                <div className="back-to-main-page flex pt-[0.2rem]">
                    <button style={{ all: 'unset', cursor: 'pointer' }} className="h-full" type="button" onClick={(e) => {dispatch(setMessagesUpdateReset()); navigate("/messages") }} >
                        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="10" height="16" fill="none " />
                            <g id="App Icons">
                                <rect width="663" height="1904" transform="translate(-118 -536)" fill="none" />
                                <g id="Iconly/Light/Arrow - Left 4">
                                    <g id="Iconly/Light/Arrow - Left 4_2">
                                        <g id="Arrow - Left 2">
                                            <path id="Stroke 1" d="M8.5 15L1.5 8L8.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </button>
                    <div className="text-white text-3xl ml-5 font-semibold">Messages</div>
                </div>

            </div>
            <div className="flex-grow min-h-0 w-full mt-8 rounded-t-4xl flex flex-col bg-[#1a1a1a]">
                <div className="flex items-center w-full gap-x-3 ml-4 mt-6">
                    <div className="w-13 h-13 bg-pink-400 rounded-full flex justify-center items-center text-xl">
                        {props.messages.messages.userDetails.firstName.charAt(0)}
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <div className="text-[#a7a7a7] text-xl font-semibold flex items-center gap-1">{`${props.messages.messages.userDetails.firstName} ${props.messages.messages.userDetails.lastName ? props.messages.messages.userDetails.lastName : ""}`} {props.messages.messages.userDetails.verified && <VerifiedIcon h={18} w={18} />}</div>
                        {props.userChat.onlineUsers.includes(props.messages.messages.userDetails.givenId.toString()) && <div className="text-[#348a15] text-m font-medium flex">
                            ● Online</div>}
                    </div>
                </div>
                <div className="h-0.5 w-full bg-[#2b2b2b] mt-4"></div>

                <div className="MAINNNN flex flex-col w-full p-1 pt-3 overflow-y-auto"
                    ref={messagesEndRef}
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#2b2b2b #1a1a1a"
                    }}
                >
                    {props.messages.messages.messages.map((message) => (
                        message.senderId !== props.user.givenId ? (
                            <div key={message._id} className="flex w-full justify-start mt-2">
                                <div className="bg-[#f2f2f7] px-4 pb-1 pt-2 max-w-7/9 rounded-t-xl rounded-bl-sm rounded-br-xl flex flex-col">
                                    <div className="text-[#090909] text-md break-words pr-1">{message.message}</div>
                                    <div className="text-xs text-[#555557] self-end"> {formatDate(message.createdAt)}</div>
                                </div>
                            </div>
                        ) : (<div key={message._id} className="flex w-full justify-end mt-2">
                            <div className="bg-[#007aff] px-4 pb-1 pt-2 max-w-7/9 rounded-t-xl rounded-br-sm rounded-bl-xl flex flex-col">
                                <div className="text-[#ffffff] text-md break-words pr-1">{message.message}</div>
                                <div className="text-xs self-end font-light"> {formatDate(message.createdAt)}</div>
                            </div>
                        </div>)


                    ))}



                </div>
                <div className="input w-full p-5.5 mt-auto">
                    <ChatInput scroll={smoothScrollToBottom} sendMessage={handleSendMessage} message={message} setMessage={setMessage} />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        socket: state.socket,
        messages: state.message,
        userChat: state.userChat,
    }
}

export default connect(mapStateToProps)(UserMessagePage)