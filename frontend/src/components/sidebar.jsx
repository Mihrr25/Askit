import React, { useState } from 'react';
import { X, User, Wallet, FileText, Star, HelpCircle, Info, HeadphonesIcon, LogOut } from 'lucide-react';
import { CloseSquare, MyAccnt, Support, Logout, MyTasks,PostTask,Alerts,Messages } from '../assets/Icons';
import { logout } from '../actions/authActions';
import { useDispatch,connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ toggleSidebar, isOpen,...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(props)
  return (
    <div className={`absolute h-full z-45 transform ${isOpen ? 'translate-x-0' : '-translate-x-2    0'} transition-transform duration-100 ease-in-out ${isOpen ? "" : "invisible"}`}>


      <div className={`top-0 left-0 h-full w-64 bg-black text-white z-50`}>
        <div className="flex justify-end items-center p-4 my-">
          {/* <div className="invisible">Placeholder</div> */}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300 focus:outline-none cursor-pointer"

          >
            <CloseSquare />
          </button>
        </div>

        <div className="flex items-center pl-4 my-3">
          <div className="w-14 h-14 rounded-full border-2 border-white bg-pink-500 flex items-center justify-center mr-3">
            <span className="text-white">{props.user.firstName.charAt(0).toUpperCase()}</span>
          </div>
          <div className='max-w-35'>
            <p className="font-semibold">Hi, {props.user.firstName}</p>
            <p className="text-xs text-[#777777] mt-1 line-clamp-1">{props.user.email}</p>
          </div>
        </div>
        <div className="ml-4 h-0.25 w-full bg-[#77777733]"></div>

        <div className="px-4 py-2">
          <ul>

            <li className="mb-2" onClick={(e)=>{e.preventDefault();navigate("/profile/"+props.user.givenId)}}>
              <a href="#" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded`}>
                <span className="mr-3"><MyAccnt h={"18px"} w={"18px"} /></span>
                <span>My Account</span>
              </a>
            </li>
            <div className="h-0.25 w-full bg-[#77777733]"></div>

            {/* <li className="mb-2">
              <a href="#" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded`}>
                <span className="mr-3"><HelpCircle size={18}/></span>
                <span>How it works</span>
              </a>
            </li>
            <div className="h-0.25 w-full bg-[#77777733]"></div>


            <li className="mb-2">
              <a href="#" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded `}>
                <span className="mr-3"><Support /></span>
                <span>Support</span>
              </a>
            </li>
            <div className="h-0.25 w-full bg-[#77777733]"></div> */}

            <li className="mb-2" onClick={(e)=>{e.preventDefault();navigate("/mytasks")}}>
              <a href="#" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded `}>
                <span className="mr-3"><MyTasks /></span>
                <span>My Tasks</span>
              </a>
            </li>

            <div className="h-0.25 w-full bg-[#77777733]"></div>
            <li className="mb-2 " onClick={(e)=>{e.preventDefault();navigate("/post")}}>
              <a href="#" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded `}>
                <span className="mr-3"><PostTask /></span>
                <span>Post Task</span>
              </a>
            </li>
            <div className="h-0.25 w-full bg-[#77777733]"></div>
            <li className="mb-2" onClick={(e)=>{e.preventDefault();navigate("/alerts")}}>
              <a href="#" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded `}>
                <span className="mr-3"><Alerts /></span>
                <span>Alerts</span>
              </a>
            </li>
            <div className="h-0.25 w-full bg-[#77777733]"></div>
            <li className="mb-2" onClick={(e)=>{e.preventDefault();navigate("/messages")}}>
              <a href="" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded `}>
                <span className="mr-3"><Messages /></span>
                <span>Messages</span>
              </a>
            </li>
            <div className="h-0.25 w-full bg-[#77777733]"></div>

            <li className="mb-2" onClick={(e)=>dispatch(logout())}>
              <a href="#" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded text-[#f27b67] font-medium`}>
                <span className="mr-3"><Logout /></span>
                <span>Logout</span>
              </a>
            </li>
            <div className="h-0.25 w-full bg-[#77777733]"></div>

          </ul>
        </div>

        <div className="absolute bottom-4 w-full text-center text-xs mb-5 text-gray-500">
          <p>All rights reserved</p>
          <p>Powered by Google</p>
        </div>
      </div>


    </div>
  );
};

const MenuItem = ({ icon, text, className = "" }) => {
  return (
    <li className="mb-2">
      <a href="#" className={`flex items-center py-2 px-2 hover:bg-gray-900 rounded`}>
        <span className="mr-3">{icon}</span>
        <span>{text}</span>
      </a>
    </li>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});


export default connect(mapStateToProps)(Sidebar);