import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import StarRating from '../components/StarRating';

const profileViewPage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  function formatMonthYear(inputDate) {
    const date = new Date(inputDate);
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleString('en-US', options);
  }
  return (
    <div className={`h-full w-full max-w-[500px] bg-black text-white flex flex-col py-4 `} >
      {/* {updating && <div className='h-full w-full fixed cursor-wait z-20'></div>} */}
      {/* Top Navigation Bar */}
      <div className={`topNavBar flex w-full justify-between items-center mt-4 px-4`}>
        <div className="back-to-main-page flex pt-[0.2rem] w-full justify-between items-center">

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
          {id == props.user.givenId && <div className="text-white text-md font-semibold mr-2 flex gap-1 cursor-pointer" onClick={() => navigate('/profile/edit')}>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.0156 12.6767L12.7068 3.98549C13.5944 3.09793 15.0341 3.09793 15.9217 3.98549L17.0825 5.14636C17.9701 6.03392 17.9701 7.47366 17.0825 8.36121L8.35704 17.0867C7.96885 17.4749 7.44262 17.6926 6.89322 17.6926H3.31982L3.40969 14.0877C3.42359 13.5578 3.64038 13.0519 4.0156 12.6767Z" stroke="white" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.623 5.08691L15.9784 9.44133" stroke="white" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.1206 17.6927H18.2826" stroke="white" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            Edit Profile</div>}

        </div>

      </div>
      {/* <div className="w-full bg-[#2f2f2f] h-0.25 mt-6"></div> */}

      <div className="w-full bg-black text-white flex flex-col items-center mt-8 px-3">
        <div className="h-25 w-25 rounded-full bg-pink-300 flex justify-center items-center text-3xl">{props.user.firstName.charAt(0).toUpperCase()}</div>
        <div className="text-2xl font-semibold mt-2">{props.user.firstName} {props.user.lastName}</div>
        <div className="text-md font-semibold mt-1 text-[#777777]">{props.user.email}</div>
        <div className="text-md font-semibold mt-1 text-[#777777]">{props.user.college}</div>
        <div className="w-full flex mt-4">
          <div className="w-1/2 flex flex-col justify-baseline items-center">
            <div className="text-sm font-semibold text-[#777777]">Location</div>
            <div className="text-md font-semibold ">{props.user.city}</div>
          </div>
          <div className="w-1/2 flex flex-col justify-baseline items-center">
            <div className="text-sm font-semibold text-[#777777]">Member Since</div>
            <div className="text-md font-semibold ">{formatMonthYear(props.user.createdAt)}</div>
          </div>
        </div>
          {props.user.useRating>0 &&<><div className="mt-3">As Service Provider</div>
          <StarRating rating={props.user.userRating}/></>}
          
        <div className="flex flex-col w-full mt-4">

          <div className="">About Me</div>
          <div className="text-md font-semibold text-[#777777] leading-tight">{props.user.description}</div>
          <div className="mt-2">Skills</div>
          <div className="text-md font-semibold text-[#777777]">{props.user.skills}</div>
        </div>

      </div>


    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    // updating: state.updating,
  }
}

export default connect(mapStateToProps)(profileViewPage)