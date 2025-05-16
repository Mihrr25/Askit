// import { connect } from 'mongoose';
import React,{useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { connect,useDispatch} from 'react-redux';
import OfferComp from '../components/offerComp';
import { getParticularTask } from '../actions/TaskActions';
import { getOffers } from '../actions/offerActions';

const Offers = (props) => {
    const {id}=useParams();
    const navigate = useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
        if(!props.task){
            dispatch(getParticularTask(id));
        }
        else if(props.task.task.givenId!=id){
            dispatch(getParticularTask(id))
        }
        else if(props.task.task.TaskPosterId!=props.user.givenId){
            navigate(`/task/${id}`) 
        }
        else if(props.task.task.OfferIdAccepted){navigate(`/task/${id}`);}

        else dispatch(getOffers(id));
    },[props.task,id]);
    const jw={
        description:"Hello Sir, I can do this task for you. I have 5 years of experience in this field. I can assure you that you will be satisfied with my work. Please consider me for this task. Thank you.",
        price:500,
        offeredByName:"Mihir Bairathi",
        offeredBySkills:"Web Developer who iis a great in everything",
        userRating:4.7,
        userCity:"Vishakhapatnam",
        userProfile:"",
        userGivenId:""
    }
    if(props.loading || props.offerLoading||!props.offers){
        return <div>Loading...</div>
    }
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
                    <div className="text-white text-3xl ml-5 text-center font-semibold">Offers</div>
                </div>

            </div>
            <div className="flex flex-col w-full mt-8 gap-y-1.75">
                {props.offers.map((offer,index)=>(
                    <OfferComp key={index} offer={offer} taskId={id} />
                ))}
            </div>

            
    </div>
  )
  
}
const mapStateToProps = (state) => {
    return {
        task: state.particularTask.task,
        loading: state.particularTask.loading,
        user:state.auth.user,
        offers:state.getOffers.offers,
        offerLoading:state.getOffers.loading,
    }
}

export default connect(mapStateToProps)(Offers)