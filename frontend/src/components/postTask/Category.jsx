import React from 'react'
import { useNavigate } from 'react-router-dom';
import { HomeworkAndAssignments,OfficeWork,Lift_Move_Pack,Tutoring,ComputerIT,Cleaning,VideoEditing,Photography,Design,DeliveryAndErrands,PetCare,GardeningAndPlantCare,Events,Custom,Socializing,FitnessAndHealth,BorrowingAndLending } from './categoryComponents';
import DatePicker from '../datePicker.jsx';

const Category = ({formData,setFormData,handleNext}) => {
  // return (<DatePicker/>)
  return (
    <>
    <div className="ques text-center mt-6">Select a category to post a task</div>
    
                <div className="flex flex-wrap justify-center items-center gap-2 mt-4 mb-2">
                    
                    <HomeworkAndAssignments formData={formData} setFormData={setFormData} id={1}/>
                    <OfficeWork formData={formData} setFormData={setFormData} id={2}/>
                    <Lift_Move_Pack formData={formData} setFormData={setFormData} id={3}/>
                    <Tutoring formData={formData} setFormData={setFormData} id={4}/>
                    <ComputerIT formData={formData} setFormData={setFormData} id={5}/>
                    {/* <Cleaning formData={formData} setFormData={setFormData} id={6}/> */}
                    <VideoEditing formData={formData} setFormData={setFormData} id={7}/>
                    <Photography formData={formData} setFormData={setFormData} id={8}/>
                    <Design formData={formData} setFormData={setFormData} id={9}/>
                    <DeliveryAndErrands formData={formData} setFormData={setFormData} id={10}/>
                    <PetCare formData={formData} setFormData={setFormData} id={11}/>
                    {/* <GardeningAndPlantCare formData={formData} setFormData={setFormData} id={12}/> */}
                    <Events formData={formData} setFormData={setFormData} id={13}/>
                    <Custom formData={formData} setFormData={setFormData} id={14}/>
                    <FitnessAndHealth formData={formData} setFormData={setFormData} id={16}/>
                    <BorrowingAndLending formData={formData} setFormData={setFormData} id={17}/>
                    {/* <Socializing formData={formData} setFormData={setFormData} id={15}/> */}
                </div>
    
                <div className="endbar mb-4 mt-auto flex-col items-center">
                    <div className="flex justify-center mt-4 sm:mt-4 w-full">
                        <button type="button" disabled={formData.categoryId === 0 ? true : false} className={`${formData.categoryId != 0 ? "bg-white text-black cursor-pointer" : "bg-[#77777777] text-[#777777] cursor-not-allowed "} w-[95%] h-[2.75rem] font-bold py-1 px-4 rounded-md`} onClick={(e) => handleNext(e)}>
                             Next
                        </button>
                    </div>
                </div>
    </>
  )
}

export default Category