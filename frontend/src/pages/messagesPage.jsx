import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import arrowback from '../assets/arrowback.svg';
import ProfileView from "../components/messages/ProfileView"
import { connect } from 'react-redux';

function MessagesPage(props) {
    const navigate = useNavigate();
    if (props.userChat.loading) {
        return (
            <div className="">Loading..</div>
        )
    }




    return (
        <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col py-4 ">
            {/* Top Navigation Bar */}
            <div className={`topNavBar flex w-full justify-between items-center mt-4 px-4`}>
                <div className="back-to-main-page flex pt-[0.2rem]">
                    <button style={{ all: 'unset', cursor: 'pointer' }} className="h-full" type="button" onClick={() => navigate('/')}>
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
            <div className="w-full bg-[#2f2f2f] h-0.25 mt-6"></div>
            {props.userChat.chats&& 
                <ProfileView chats={props.userChat.chats}/>}
            
            {/* Login Content */}

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        socket: state.socket,
        messages: state.messages,
        userChat: state.userChat,
    }
}

export default connect(mapStateToProps)(MessagesPage);