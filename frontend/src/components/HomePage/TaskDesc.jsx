import React from 'react';
import { LocationPin,CalendarforTask,ProfileforTask } from '../../assets/Icons';
import IconSending from './IconSending';
import {useNavigate} from 'react-router-dom'

const JobCard = ({task}) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = { weekday: "long" };
    const weekday = date.toLocaleDateString("en-US", options);
  
    const day = date.getDate(); // Get day as a number
    const month = date.toLocaleDateString("en-US", { month: "long" });
  
    return `${day} ${month}`;
  };
  const dateTemp=new Date(task.startDate);

    const category = task.categoryName
    const id=task.categoryId
    const title = task.title
    const price = task.budget
    const location = task.modeOfTask==="Remotely"? "Remote" :`${task.taskCity}, ${task.taskLocation}`
    const date = formatDate(dateTemp);
    const offers = task.offers?task.offers:0
    const isOpen = true
    // console.log(typeof(task.createdAt))
  return (
    <div className="flex flex-row bg-[#222225] rounded-lg p-2 text-white w-full pt-3 mb-2 cursor-pointer" onClick={()=>{navigate(`/task/${task.givenId}`)}}>
      <div className="h-20 w-12 flex items-center justify-center rounded-lg mr-2 pt-3 sm:mr-4 sm:w-14">
        <IconSending id={id}/>
      </div>
      <div className="flex flex-col flex-grow w-full">
        <div className="uppercase text-[#a1a1a1] text-sm font-medium mb-1.5">
          {category.toUpperCase()}
        </div>
        <div className="flex flex-row justify-between mb-2 ">
          {/* Div for task desc */}
          <div className="text-lg font-medium pr-4 line-clamp-2">
            {title}
          </div>
          
          {/* Div for item budget */}
          <div className="text-2xl font-semibold whitespace-nowrap mr-2">
            <span className="text-xl mr-1">₹</span>{price}
          </div>
        </div>
        
        {/* Div for location */}
        <div className="flex items-center w-4/9 text-[#a1a1a1] text-sm mb-2">
          <div className="locationIcon mr-2 ">
            <LocationPin h={"18px"}/>
          </div>
          <div className="loca line-clamp-1">

          {location}
          </div>
        </div>
        
        {/* Div flex row for date, offers, and status */}
        <div className="flex flex-row justify-between items-center text-sm">
          {/* Div for Date */}
          <div className="flex items-center text-[#a1a1a1] ">
            <div className="mr-1.5 ">
            <CalendarforTask/>
            </div>
            <div className="line-clamp-1">{date}</div>
          </div>
          
          {/* Div for No. of offers */}
          <div className="flex items-center text-[#a1a1a1]  justify-center ">
            <div className="mr-1">
            <ProfileforTask/>
            </div>
            <div className="div">
            {offers} <span>Offers</span>
            </div>
            
          </div>
          <div className=''>

            {task.Status==='Open'&&<span className={`px-3 py-0.5 flex justify-center items-center rounded-lg border-3 border-[#33c300] text-[#33c300] text-sm font-medium`}>OPEN</span>}
            {task.Status==='In-Progress'&&<span className={`px-3 py-0.5 flex justify-center items-center rounded-lg border-3 border-[#f8f54a] text-[#f8f54a] text-sm font-medium`}>IN-PROGRESS</span>}
            {task.Status==='Completed'&&<span className={`px-3 py-0.5 flex justify-center items-center rounded-lg border-3 border-[#36daff] text-[#36daff] text-sm font-medium`}>COMPLETED</span>}
            
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default JobCard;