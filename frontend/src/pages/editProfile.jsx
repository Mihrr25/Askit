import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect,useDispatch } from 'react-redux';
import { updateUser } from '../actions/authActions';
import toast from 'react-hot-toast';
const EditProfile = (props) => {
  // console.log(props)

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [profile, setProfile] = useState({
    age: props.user.age,
    city: props.user.city,
    gender: props.user.gender,
    college: props.user.college,
    skills: props.user.skills,
    description: props.user.description,
  })
  // console.log(profile);
  const [updating, setUpdating] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(profile);
    setUpdating(true);
    let r1 = await updateUser(profile);
    if (r1) {
      toast.success('Updated Successfully');
      dispatch({
        type:"GET_USER_SUCCESS",
        payload:r1
      })
      setTimeout(() => {
        setUpdating(false);
        navigate('/profile/'+props.user.givenId);
      }, 2000);
    }
    else {
      toast.error('Internal Server Issue');
      setUpdating(false);
    }
  }
  return (
    <div className={`h-full w-full max-w-[500px] bg-black text-white flex flex-col py-4 `} >
      {updating && <div className='h-full w-full fixed cursor-wait z-20'></div>}
      {/* Top Navigation Bar */}
      <div className={`topNavBar flex w-full justify-between items-center mt-4 px-4`}>
        <div className="back-to-main-page flex pt-[0.2rem] w-full relative">
          <div className="absolute h-full flex items-center">

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
          </div>
          <div className="text-white text-2xl font-semibold w-[100%] text-center">Edit Profile</div>
        </div>

      </div>
      {/* <div className="w-full bg-[#2f2f2f] h-0.25 mt-6"></div> */}

      <div className="w-full bg-black text-white flex flex-col items-center mt-8">
        <div className="h-25 w-25 rounded-full bg-pink-300 flex justify-center items-center text-3xl">{props.user.firstName.charAt(0).toUpperCase()}</div>
        <form className="flex flex-col w-full mt-3" onSubmit={(e) => { handleSubmit(e) }}>
          <div className="w-full flex gap-3">

            <div className="ques flex flex-col w-1/2">
              <div className="flex items-center mt-2 pl-1 mb-1.5 flex-wrap">
                <div className="text-lg">Gender</div>
              </div>
              <div className={`mb-2`}>
                  <select
                    required
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    value={profile.gender}
                    className={`w-full bg-[#222225] p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777] appearance-none cursor-pointer ${profile.gender==undefined? "text-[#777777]":"text-white"}`}
                  >
                    <option value="" disabled selected hidden>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

              </div>
            </div>
            <div className="ques flex flex-col w-1/2">
              <div className="flex items-center mt-2 pl-1 mb-1.5 flex-wrap">
                <div className="text-lg">Age</div>
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  placeholder="Enter Age"
                  required
                  min="0"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"
                />


              </div>
            </div>
          </div>
          <div className="ques flex flex-col">
            <div className="flex items-center mt-2 pl-1 mb-1.5 flex-wrap">
              <div className="text-lg">City</div>
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Enter City"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                required
                className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"
              />



            </div>
          </div>
          <div className="ques flex flex-col">
            <div className="flex items-center mt-2 pl-1 mb-1.5 flex-wrap">
              <div className="text-lg">College</div>
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Enter College Name"
                value={profile.college}
                onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                required
                className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"
              />




            </div>
          </div>
          <div className="ques flex flex-col">
            <div className="flex items-center mt-2 pl-1 mb-1.5 flex-wrap">
              <div className="text-lg">Skills</div>
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Enter Skills (e.g., React, Tailwind, Node.js)"
                value={profile.skills}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                required
                className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"
              />





            </div>
          </div>
          <div className="ques flex flex-col mb-2">
            <div className="flex items-center mt-2 pl-1 mb-1.5 flex-wrap">
              <div className="text-lg">About Me</div>
            </div>
            <div className="mb-2">
              <textarea
                placeholder="Write a brief description about yourself"
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                required
                rows={4}
                className="w-full bg-[#222225] text-white overflow-hidden p-3 rounded-xl text-sm leading-tight placeholder-[#777777] resize-none"
              />






            </div>
          </div>




          <div className="endbar mb-4 mt-auto flex-col items-center">
            <div className="flex justify-center mt-6 sm:mt-4 w-full">
              <button type="submit" className={`cursor-pointer bg-white text-black w-[95%] h-[2.75rem] font-bold py-1 px-4 rounded-lg`} >
                Submit
              </button>
            </div>
          </div>


        </form>
      </div>


    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(EditProfile);