import React from 'react'
import { motion } from "framer-motion";

const PostTaskFormOne = ({formData,setFormData,handleNext}) => {
  return (
    <>
        <form className="flex flex-col w-full h-full mt-3" onSubmit={(e)=>handleNext(e)}>
            <div className="ques flex flex-col">
                <div className="flex justify-between items-center mt-2 mb-3 flex-wrap">
                    <div className="text-lg">Give a title to your task</div>
                    <div className="text-xs text-[#777777] self-center ">Minimum 10 characters</div>
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="What do you need done?"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"
                        minLength={10}
                        required
                    />
                </div>


            </div>
            <div className="ques flex flex-col">
                <div className="flex justify-between items-center mt-2 mb-3 flex-wrap">
                    <div className="text-lg">Describe your task briefly</div>
                    <div className="text-xs text-[#777777] self-center ">Minimum 25 characters</div>
                </div>
                <div className="mb-2.5">
                    <textarea
                        placeholder="Add more detailed description about your task and how you want it done"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-[#222225] text-start overflow-y-hidden text-sm leading-tight text-white p-3 rounded-xl h-25 placeholder-[#777777]"
                        minLength={25}
                        required
                    />
                </div>
                <div className="mb-5">
                    <textarea
                        placeholder="Add specific requirements (if any)"
                        value={formData.specificRequiremetnt}
                        onChange={(e) => setFormData({ ...formData, specificRequirement: e.target.value })}
                        className="w-full bg-[#222225] text-start overflow-y-hidden text-sm leading-tight text-white p-3 rounded-xl h-13 placeholder-[#777777]"
                    />
                </div>
            </div>
            <div className="ques flex flex-col">
                <div className="flex items-center mt-2 mb-3 flex-wrap">
                    <div className="text-lg">This Task could be best done in?</div>
                </div>
                <div className="relative flex bg-[#1a1a1a] text-white rounded-md h-8 w-95%">
                    {/* Sliding Indicator */}
                    <motion.div
                        className="absolute top-0 bottom-0 left-0 bg-[#6c6c70] rounded-md w-1/2"
                        animate={{ x: formData.modeOfTask === "In-Person" ? 0 : "100%" }}
                        transition={{ type: "spring", stiffness: 800, damping: 100 }}
                    />

                    {/* Buttons */}
                    <button
                        type='button'
                        className={`relative w-1/2 text-center  z-10 text-white cursor-pointer`}
                        onClick={() => setFormData({ ...formData, modeOfTask: "In-Person", taskCity: "", taskLocation: "" })}
                    >
                        In-Person
                    </button>
                    <button
                        type='button'
                        className={`relative w-1/2 text-center z-10 text-white cursor-pointer`}
                        onClick={() => setFormData({ ...formData, modeOfTask: "Remotely", taskCity: "NA", taskLocation: "NA" })}
                    >
                        Remotely
                    </button>
                </div>
            </div>
            {formData.modeOfTask === "In-Person" ? <>

                <div className="ques flex flex-col mt-7">
                    <div className="flex items-center mt-2 mb-3 flex-wrap">
                        <div className="text-lg">Task Location</div>
                    </div>
                    <div className="mb-2.5">
                        <input
                            type="text"
                            placeholder="City"
                            value={formData.taskCity}
                            onChange={(e) => setFormData({ ...formData, taskCity: e.target.value })}
                            className="w-full bg-[#222225] text-start overflow-y-hidden text-sm leading-tight text-white p-3 rounded-xl h-12 placeholder-[#777777]"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <textarea
                            placeholder="Add Full Address"
                            value={formData.taskLocation}
                            onChange={(e) => setFormData({ ...formData, taskLocation: e.target.value })}
                            className="w-full bg-[#222225] text-start overflow-y-hidden text-sm leading-tight text-white p-3 rounded-xl h-25 placeholder-[#777777]"
                            required
                        />
                    </div>

                </div>

            </> : <></>}
            <div className="endbar mb-4 mt-auto flex-col items-center">
            <div className="flex justify-center mt-4 sm:mt-4 w-full">
                <button type="submit" className={` bg-white text-black cursor-pointer  w-[95%] h-[2.75rem] font-bold py-1 px-4 rounded-md`} >
                    Next
                </button>
            </div>
        </div>


        </form>
    </>
  )
}

export default PostTaskFormOne