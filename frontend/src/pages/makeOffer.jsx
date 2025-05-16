// import { connect } from 'mongoose';
import React,{useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { connect,useDispatch} from 'react-redux';
import { getParticularTask } from '../actions/TaskActions';
import { postOfferReset,postOffer } from '../actions/offerActions';
const MakeOffer = (props) => {
    const {id}=useParams();
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [formData, setFormData] = React.useState({
        taskId:id,
        price:'',
        description:"",
    });
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData)
        dispatch(postOffer(formData,id));
    }
    useEffect(() => {
        if(!props.task){
            dispatch(getParticularTask(id));
            console.log("heree")
        }
        else if(props.task.task.givenId!=id){
            dispatch(getParticularTask(id))
        }
        else if(props.task.task.TaskPosterId==props.user.givenId){
            navigate(`/task/${id}`)
        }

    },[props.task,id]);
    useEffect(() => {
        if(props.offer){
            dispatch(postOfferReset())
            navigate(`/task/${id}`)
        }
    },[props.offer]);
  return (
    <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col py-4 ">
            {/* Top Navigation Bar */}
            <div className={`topNavBar flex w-full justify-between items-center mt-4 px-4`}>
                <div className="back-to-main-page flex pt-[0.2rem] ">
                    <button style={{ all: 'unset', cursor: 'pointer' }} className="h-full" type="button" onClick={(e)=>{navigate(`/task/${id}`)}} >
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
                    <div className="text-white text-3xl ml-5 text-center font-semibold">Make An Offer</div>
                </div>

            </div>

            <form className="flex flex-col w-full h-full mt-8" onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="ques flex flex-col">
                <div className="flex items-center mt-2 mb-3 flex-wrap">
                    <div className="text-lg">Price</div>
                </div>
                <div className="mb-5">
                    <input
                        type="number"
                        placeholder="Propose the Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"
                        minLength={10}
                        required
                    />
                </div>


            </div>
            <div className="ques flex flex-col">
                <div className="flex justify-between items-center mt-2 mb-3 flex-wrap">
                    <div className="text-lg">Description</div>
                    <div className="text-xs text-[#777777] self-center ">Minimum 25 characters</div>
                </div>
                <div className="mb-2.5">
                    <textarea
                        placeholder="Peronalize your offer with a Message and Description on how you plan to do the Task. You may also add some other terms and conditions."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-[#222225] text-start overflow-y-hidden text-sm leading-tight text-white p-3 rounded-xl h-40 placeholder-[#777777]"
                        minLength={25}
                        required
                    />
                </div>
                
            </div>
            <div className="endbar mb-4 mt-auto flex-col items-center">
            <div className="flex justify-center mt-4 sm:mt-4 w-full">
                <button type="submit" className={` bg-white text-black cursor-pointer  w-[95%] h-[2.75rem] font-bold py-1 px-4 rounded-md`} >
                    Submit Offer
                </button>
            </div>
        </div>


        </form>
    </div>
  )
  
}
const mapStateToProps = (state) => {
    return {
        task: state.particularTask.task,
        loading: state.particularTask.loading,
        user:state.auth.user,
        offer:state.offers.offer,
        offerLoading:state.offers.loading
    }
}

export default connect(mapStateToProps)(MakeOffer)