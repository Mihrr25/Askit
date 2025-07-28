import React, { useState, useRef,useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../components/postTask/Category';
import { motion } from "framer-motion";
import PostTaskFormOne from '../components/postTask/PostTaskFormOne';
import PostTaskFormTwo from '../components/postTask/PostTaskFormTwo';
import DatePicker from '../components/datePicker';
import { useDispatch } from 'react-redux';
import { postTask,postTaskReset } from '../actions/TaskActions';
import { connect } from 'react-redux';


function PostTaskPage(props) {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        categoryId: 0,
        categoryName: "",
        description: "",
        title: "",
        specificRequirement: "",
        modeOfTask: "In-Person",
        taskCity: "",
        taskLocation: "",
        dateFlexible: false,
        startDate: "",
        endDate: "",
        timeSlot:"",
        timeFlexible: false,
        budget: 0,
        workDays: 0,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("here we are",props.taskPosted)
        if(props.taskPosted===true){
            navigate("/")
        }
    }, [props.taskPosted,props, navigate])

    useEffect(() => {
      if(![2, 4, 11, 13,16,17].includes(formData.categoryId)) {
        setFormData({ ...formData, workDays: 0 });
      }
    }, [formData.categoryId, formData.categoryName])

    const handleNext = (e) => {
        e.preventDefault()
        // alert("clicked")
        if (page <= 2) { setPage(page + 1) }
        else {
            // navigate("/signup")
            console.log(formData)
            dispatch(postTask(formData))
            if(props.taskPosted===true){
                navigate("/")
            }
            
        }
    }
    const handleBack = () => {
        if (page > 1) { setPage(page - 1) }
        else {
            navigate("/")
        }
    }
    return (
        <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col p-4 ">
            {/* Top Navigation Bar */}
            <div className={`topNavBar flex-col w-full justify-between items-center mt-4`}>
                <div className="back-to-main-page flex pt-[0.2rem]">
                    <button style={{ all: 'unset', cursor: 'pointer' }} className="h-full" type="button" onClick={() => handleBack()}>
                        <div className="flex items-center">
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

                        </div>
                    </button>
                    <div className="text-white font-bold text-xl ml-5">
                        Post a task
                    </div>


                </div>
                <div className="flex items-center mt-5 space-x-1">
                    {page === 1 ? <span className='w-[32%] h-1 bg-white/80'></span> : <span className='w-[32%] h-0.5 bg-gray-500'></span>}
                    {page === 2 ? <span className='w-[32%] h-1 bg-white/80'></span> : <span className='w-[32%] h-0.5 bg-gray-500'></span>}
                    {page === 3 ? <span className='w-[32%] h-1 bg-white/80'></span> : <span className='w-[32%] h-0.5 bg-gray-500'></span>}
                </div>
            </div>
            {page === 1
                ? <Category formData={formData} setFormData={setFormData} handleNext={handleNext} />
                : page === 2
                ? <PostTaskFormOne formData={formData} setFormData={setFormData} handleNext={handleNext} />
                : <PostTaskFormTwo formData={formData} setFormData={setFormData} handleNext={handleNext} />
            }

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        posting: state.postTask.posting,
        taskId: state.postTask.taskId,
        taskPosted: state.postTask.taskPosted
    };
};

export default connect(mapStateToProps)(PostTaskPage);