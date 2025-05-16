import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { ChatIcon,WorkIcon } from '../assets/Icons';


const AlertsPage = (props) => {
  const navigate = useNavigate();
  function timeAgo(date) {
        
        const now = new Date();
        date = new Date(date);
        const diffMs = now - date; // Difference in milliseconds
        const diffSec = Math.floor(diffMs / 1000); // Convert to seconds
        const diffMin = Math.floor(diffSec / 60); // Convert to minutes
        const diffHours = Math.floor(diffMin / 60); // Convert to hours
        const diffDays = Math.floor(diffHours / 24); // Convert to days
        const diffWeeks = Math.floor(diffDays / 7); // Convert to weeks
        const diffMonths = Math.floor(diffDays / 30); // Approximate months

        if (diffHours < 1) return "Just now";
        if (diffHours === 1) return "1 hour ago";
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays === 1) return "1 day ago";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffWeeks === 1) return "1 week ago";
        if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
        if (diffMonths === 1) return "1 month ago";
        return `${diffMonths} months ago`;
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
          <div className="text-white text-3xl ml-5 font-semibold">Alerts</div>
        </div>

      </div>
      <div className="w-full bg-[#2f2f2f] h-0.25 mt-6"></div>

      {props.alerts.loading && <div className="text-white text-3xl ml-5 font-semibold">Loading...</div>}
      <div className="w-full bg-black text-white rounded-lg">

      {props.alerts?.alerts?.map((alert, index) => {
        return (
          <>
          <div className="flex w-full px-3 h-17 items-center gap-8 hover:bg-[#091010] cursor-pointer transition duration-150 ease-in " key={index} onClick={(e) => {e.preventDefault();navigate('/task/'+alert.taskId)}} >
            {alert.alertType !== "New Offer"? <ChatIcon/> : <WorkIcon/>}
            <span className='h-full pt-1 max-w-[60%]'>{alert.alertDesc}</span>
            <span className='text-gray-400 text-sm h-full pt-1.5'>{timeAgo(alert.alertTime)}</span>
          </div>
          <div className="w-full bg-[#2f2f2f] h-0.25 mb-1"></div>
          </>
        )

      })}
        
      </div>


    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    alerts: state.alert,
  }
}

export default connect(mapStateToProps)(AlertsPage);