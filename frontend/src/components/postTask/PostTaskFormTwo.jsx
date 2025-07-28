import React, { useState, useRef, useEffect } from "react";
import DatePicker from "../datePicker";
import { Calendar, Morning, Afternoon, Evening } from "../../assets/Icons";

const PostTaskFormTwo = ({ formData, setFormData, handleNext }) => {
  const modalOneRef = useRef(null);
  const modalTwoRef = useRef(null);
  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [dateOne, setDateOne] = useState("");
  const [dateTwo, setDateTwo] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalOneRef.current && !modalOneRef.current.contains(event.target)) {
        setShowModalOne(false);
      }
      if (modalTwoRef.current && !modalTwoRef.current.contains(event.target)) {
        setShowModalTwo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleStartDateSelect = (date) => {
    setFormData({ ...formData, startDate: date });
    setShowModalOne(false);
    const formattedDate = date.toLocaleDateString("en-GB"); // "25/02/2005"
    const finalDate = formattedDate.replace(/\//g, "-");
    setDateOne(finalDate);
  };
  const handleEndDateSelect = (date) => {
    setFormData({ ...formData, endDate: date });
    setShowModalTwo(false);
    const formattedDate = date.toLocaleDateString("en-GB"); // "25/02/2005"
    const finalDate = formattedDate.replace(/\//g, "-");
    setDateTwo(finalDate);
  };
  const handleTimeSlot = (slot) => {
    if (timeSlot === slot) {
      setTimeSlot("");
      setFormData({ ...formData, timeSlot: "" });
      return;
    }
    switch (slot) {
      case "1":
        setFormData({ ...formData, timeSlot: "Morning" });
        setTimeSlot("1");
        break;
      case "2":
        setFormData({ ...formData, timeSlot: "Afternoon" });
        setTimeSlot("2");
        break;
      case "3":
        setFormData({ ...formData, timeSlot: "Evening" });
        setTimeSlot("3");
        break;

      default:
        break;
    }
  };
  return (
    <>
      {showModalOne ? (
        <>
          <DatePicker ref={modalOneRef} handleDate={handleStartDateSelect} />
          <div className="fixed h-[100vh] top-0 w-[100vw] left-0 bg-black opacity-90 z-5"></div>
        </>
      ) : (
        <></>
      )}
      {showModalTwo ? (
        <>
          <DatePicker ref={modalTwoRef} handleDate={handleEndDateSelect} />
          <div className="fixed h-[100vh] top-0 w-[100vw] left-0 bg-black opacity-90 z-5"></div>
        </>
      ) : (
        <></>
      )}
      <form
        className="flex flex-col w-full h-full mt-3"
        onSubmit={(e) => handleNext(e)}
      >
        <div className="ques flex flex-col w-full mb-6">
          <div className="flex items-center mt-2 mb-3 flex-wrap">
            <div className="text-lg">When do you need to get it done?</div>
          </div>
          <div className="mb-5 flex w-full space-x-2">
            <div className="ques flex bg-[#222225] rounded-xl w-1/2 p-3 justify-between">
              <label
                className="  flex items-center cursor-pointer w-full justify-between "
                onClick={() => setShowModalOne(true)}
              >
                {dateOne ? (
                  <div className="text-md text-white self-center ">
                    {dateOne}
                  </div>
                ) : (
                  <div className="text-sm text-[#777777] self-center ">
                    On Date
                  </div>
                )}
                <input
                  type="text"
                  className="sr-only peer"
                  placeholder="Select Date"
                  value={dateOne}
                  onChange={(e) => setDateOne(e.target.value)}
                  required
                />
                <Calendar />
              </label>
            </div>
            <div className="ques flex bg-[#222225] rounded-xl w-1/2 p-3 justify-between">
              <label
                className="  flex items-center cursor-pointer w-full justify-between "
                onClick={() => setShowModalTwo(true)}
              >
                {dateTwo ? (
                  <div className="text-md text-white self-center ">
                    {dateTwo}
                  </div>
                ) : (
                  <div className="text-sm text-[#777777] self-center ">
                    Before Date
                  </div>
                )}
                <input
                  type="text"
                  className="sr-only peer"
                  placeholder="Select Date"
                  value={dateTwo}
                  onChange={(e) => setDateTwo(e.target.value)}
                  required
                />
                <Calendar />
              </label>
            </div>
          </div>
          <div className="ques flex bg-[#222225] rounded-xl w-full p-3 justify-between">
            <label className="  flex items-center cursor-pointer w-full justify-between">
              <div className="text-sm text-[#777777] self-center ">
                Anytime I'm flexible
              </div>

              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.dateFlexible}
                onChange={() =>
                  setFormData({
                    ...formData,
                    dateFlexible: !formData.dateFlexible,
                  })
                }
              />
              <div
                className={`w-10 h-6 bg-[#78788080] self-center peer-focus:outline-none rounded-full peer peer-checked:bg-[#787880dd] p-[1px] transition-all duration-300 flex `}
              >
                <div
                  className={`ballmi rounded-full h-full  aspect-square bg-white transition-all duration-300 ${
                    formData.dateFlexible
                      ? "translate-x-[70%]"
                      : "translate-x-0"
                  } `}
                ></div>
              </div>
            </label>
          </div>
        </div>
        <div className="ques flex flex-col w-full">
          <div className="flex items-center mt-2 mb-3 flex-wrap">
            <div className="text-lg">Select Your Preferred Time</div>
          </div>
          <div className="mb-5 flex w-full space-x-4">
            <input
              type="text"
              className="sr-only peer"
              placeholder="Select Date"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              minLength={1}
              required
            />
            <div
              className={`flex flex-col bg-[#222225] rounded-xl w-1/3 h-30 p-3  justify-center items-center cursor-pointer ${
                timeSlot === "1" ? "border-white border-2" : <></>
              }`}
              onClick={() => handleTimeSlot("1")}
            >
              <Morning />
              <div className="text-md text-white self-center mt-1.5 mb-1 ">
                Morning
              </div>
              <div className="text-md text-[#777777] self-center ">
                Before 11 AM
              </div>
            </div>
            <div
              className={`flex flex-col bg-[#222225] rounded-xl w-1/3 h-30 p-3  justify-center items-center cursor-pointer ${
                timeSlot === "2" ? "border-white border-2" : <></>
              }`}
              onClick={() => handleTimeSlot("2")}
            >
              <Afternoon />
              <div className="text-md text-white self-center mt-1.5 mb-1 ">
                Afternoon
              </div>
              <div className="text-md text-[#777777] self-center ">
                11 am-4 pm
              </div>
            </div>
            <div
              className={`flex flex-col bg-[#222225] rounded-xl w-1/3 h-30 p-3  justify-center items-center cursor-pointer ${
                timeSlot === "3" ? "border-white border-2" : <></>
              }`}
              onClick={() => handleTimeSlot("3")}
            >
              <Evening />
              <div className="text-md text-white self-center mt-1.5 mb-1 ">
                Evening
              </div>
              <div className="text-md text-[#777777] self-center ">
                After 4 PM
              </div>
            </div>
          </div>
          <div className="ques flex bg-[#222225] rounded-xl w-full p-3 justify-between">
            <label className="  flex items-center cursor-pointer w-full justify-between">
              <div className="text-sm text-[#777777] self-center ">
                Anytime I'm flexible
              </div>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.timeFlexible}
                onChange={() =>
                  setFormData({
                    ...formData,
                    timeFlexible: !formData.timeFlexible,
                  })
                }
              />
              <div
                className={`w-10 h-6 bg-[#78788080] self-center peer-focus:outline-none rounded-full peer peer-checked:bg-[#787880dd] p-[1px] transition-all duration-300 flex `}
              >
                <div
                  className={`ballmi rounded-full h-full  aspect-square bg-white transition-all duration-300 ${
                    formData.timeFlexible
                      ? "translate-x-[70%]"
                      : "translate-x-0"
                  } `}
                ></div>
              </div>
            </label>
          </div>
        </div>
        <div className="ques flex flex-col">
          <div className="flex items-center mt-2 flex-wrap">
            <div className="text-lg">Your Budget</div>
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="enter your budget"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"
              required
            />
          </div>
        </div>
        {[2, 4, 11, 13,16,17].includes(formData.categoryId)?(<div className="ques flex flex-col">
          <div className="flex items-center mb-3 flex-wrap">
            {formData.categoryId==17?
            (<div className="text-lg">Total Borrow Days</div>):(<div className="text-lg">Total Work Days</div>)}
          </div>
          <div className="mb-5">
            <input
              type="number"
              placeholder="enter duration in days"
              value={formData.workDays}
              onChange={(e) =>
                setFormData({ ...formData, workDays: e.target.value })
              }
              className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"
              required
            />
          </div>
        </div>):<></>}
        

        <div className="endbar mb-4 mt-auto flex-col items-center">
          <div className="flex justify-center mt-4 sm:mt-4 w-full">
            <button
              type="submit"
              className={` bg-white text-black cursor-pointer  w-[95%] h-[2.75rem] font-bold py-1 px-4 rounded-md`}
            >
              Post Task
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostTaskFormTwo;
