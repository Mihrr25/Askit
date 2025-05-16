import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import {connect,useDispatch} from 'react-redux'
import { getMyTasks } from '../actions/TaskActions';
import TaskDesc from '../components/HomePage/TaskDesc'

const MyTasksPage = (props) => {
    const [typeOfTask, setTypeOfTask] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyTasks())
    }, [])

    if(props.loading){
        return <div>Loading...</div>
    }
    console.log(props)
    let tasks=[];
    if(typeOfTask===1){
        tasks=props.tasks.filter((task)=>task.TaskPosterId===props.user.givenId);
    }
    else{
        tasks=props.tasks.filter((task)=>task.UserAcceptedOffer===props.user.givenId);
    }

    return (
        <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col p-4">
            {/* Top Navigation Bar */}
            <div className={`topNavBar flex w-full justify-between items-center mt-4 px-4`}>
                <div className="back-to-main-page flex pt-[0.2rem]">
                    <button style={{ all: 'unset', cursor: 'pointer' }} className="h-full" type="button" onClick={(e) => { navigate("/") }} >
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
                    <div className="text-white text-3xl ml-5 font-semibold">My Tasks</div>
                </div>

            </div>
            {/* Search Bar */}

            <div className="relative flex bg-[#1a1a1a] text-white rounded-md h-8 w-95% mt-6">
                {/* Sliding Indicator */}
                <motion.div
                    className="absolute top-0 bottom-0 left-0 bg-[#6c6c70] rounded-md w-1/2"
                    animate={{ x: typeOfTask === 1 ? 0 : "100%" }}
                    transition={{ type: "spring", stiffness: 800, damping: 100 }}
                />

                {/* Buttons */}
                <button
                    type='button'
                    className={`relative w-1/2 text-center h-8  z-10 text-white cursor-pointer`}
                    onClick={() => setTypeOfTask(1)}
                >
                    posted By Me
                </button>
                <button
                    type='button'
                    className={`relative w-1/2 text-center h-8 z-10 text-white cursor-pointer`}
                    onClick={() => setTypeOfTask(2)}
                >
                    Accepted By Me
                </button>
            </div>

            <div className="itemsFound text-white text-md flex w-full mt-4">
                {tasks.length} items found
            </div>
            <div className="flex flex-col w-full mt-3">
                {tasks.map((task) => (
              <TaskDesc task={task} key={task._id} />
            ))}
            </div>





        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        tasks: state.myTasks.tasks,
        loading: state.myTasks.loading,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(MyTasksPage);