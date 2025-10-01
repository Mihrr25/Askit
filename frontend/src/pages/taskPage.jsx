import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getParticularTask, completeTask } from "../actions/TaskActions";
import { useNavigate } from "react-router-dom";
import { StarFilled, EmptyStar } from "../assets/Icons";
import { COMPLETE_TASK_RESET } from "../lib/types";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {VerifiedIcon} from '../assets/Icons';

function TaskPage(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!props.task) {
      dispatch(getParticularTask(id));
      console.log("heree");
    } else if (props.task.task.givenId != id) {
      dispatch(getParticularTask(id));
    } else if (
      props.task.task.Status !== "Open" &&
      props.task.task.TaskPosterId != props.user.givenId &&
      props.task.task.UserAcceptedOffer != props.user.givenId
    ) {
      navigate(`/`);
    }
  }, [props.task, id]);

  useEffect(() => {
    if (props.CompleteTaskSuccess) {
      dispatch({ type: COMPLETE_TASK_RESET });
      setToggle(false);
      dispatch(getParticularTask(id));
    }
  }, [props.CompleteTaskSuccess]);

  const [deleteTask, setDeleteTask] = useState(false);

  const handleDelete = async (taskId) => {
    try {
      let res = await axiosInstance.post(`/task/deleteTask/${taskId}`);
      if (res.status === 200) {
        navigate("/");
        toast.success("Task deleted successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  function timeAgo(date) {
    const now = new Date();
    const diffMs = now - date; // Difference in milliseconds
    const diffSec = Math.floor(diffMs / 1000); // Convert to seconds
    const diffMin = Math.floor(diffSec / 60); // Convert to minutes
    const diffHours = Math.floor(diffMin / 60); // Convert to hours
    const diffDays = Math.floor(diffHours / 24); // Convert to days
    const diffWeeks = Math.floor(diffDays / 7); // Convert to weeks
    const diffMonths = Math.floor(diffDays / 30); // Approximate months
    // console.log(diffMs, diffSec, diffMin, diffHours, diffDays, diffWeeks);

    if (diffHours < 1) return "Just now";
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return "1 week ago";
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    if (diffMonths === 0) return "1 month ago";
    return `${diffMonths} months ago`;
  }
  const [feedback, setFeedback] = useState({
    rating: 0,
    title: "",
    description: "",
  });

  function formatDate(date) {
    date = new Date(date);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    // Function to get ordinal suffix
    function getOrdinal(n) {
      if (n > 3 && n < 21) return "th"; // Covers 11th to 19th
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    return `${day}${getOrdinal(day)} ${month} ${year}`;
  }

  const handleFeedback = (e) => {
    e.preventDefault();
    if (
      props.task.task.TaskPosterId == props.user.givenId &&
      feedback.rating == 0
    ) {
      setError(true);
      return;
    }
    setError(false);
    dispatch(completeTask(id, feedback));
  };

  if (props.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col py-4 ">
      {/* Top Navigation Bar */}
      {deleteTask && (
        <>
          <div className="fixed inset-0 bg-black opacity-70 w-full h-full z-12" onClick={() => setDeleteTask(false)}></div>
          <div className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-black  flex justify-center  items-center z-15">
            <div className="bg-[#2C2C2C] text-[#EDEDED] p-4 rounded-xl h-30">
              <p>Are you sure you want to delete this task???</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-[#3B82F6] text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(props.task.task.givenId)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
                  onClick={() => setDeleteTask(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={`topNavBar flex w-full justify-between items-center mt-4 px-4`}
      >
        <div className="back-to-main-page flex pt-[0.2rem]">
          <button
            style={{ all: "unset", cursor: "pointer" }}
            className="h-full"
            type="button"
            onClick={(e) => {
              if (toggle) {
                setToggle(false);
              } else navigate("/");
            }}
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="10" height="16" fill="none " />
              <g id="App Icons">
                <rect
                  width="663"
                  height="1904"
                  transform="translate(-118 -536)"
                  fill="none"
                />
                <g id="Iconly/Light/Arrow - Left 4">
                  <g id="Iconly/Light/Arrow - Left 4_2">
                    <g id="Arrow - Left 2">
                      <path
                        id="Stroke 1"
                        d="M8.5 15L1.5 8L8.5 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <div className="text-white text-3xl ml-5 font-semibold">
            {toggle ? "Mark as Complete" : "Task Brief"}
          </div>
        </div>
      </div>
      {toggle ? (
        <>
          <div className="feedback flex flex-col w-full h-full px-4">
            {props.task.task.TaskPosterId == props.user.givenId ? (
              <form
                className="flex flex-col w-full h-full mt-3"
                onSubmit={(e) => {
                  handleFeedback(e);
                }}
              >
                <div className="ques flex flex-col">
                  <div className="flex items-baseline mt-2 mb-3 flex-wrap">
                    <div className="text-lg">Rating</div>
                    {error && feedback.rating === 0 && (
                      <div className="text-sm text-red-900 ml-2 pb-0.5 ">
                        Please select a rating
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <span
                        key={i}
                        onClick={() =>
                          setFeedback({ ...feedback, rating: i + 1 })
                        }
                      >
                        <StarFilled />
                      </span>
                    ))}
                    {[...Array(5 - feedback.rating)].map((_, i) => (
                      <span
                        key={i}
                        onClick={() =>
                          setFeedback({
                            ...feedback,
                            rating: feedback.rating + i + 1,
                          })
                        }
                      >
                        <EmptyStar />
                      </span>
                    ))}
                  </div>
                </div>
                {/* <div className="ques flex flex-col">
                            <div className="flex items-center mt-2 mb-3 flex-wrap">
                                <div className="text-lg">Title</div>
                            </div>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="He is Amazing"
                                    value={feedback.title}
                                    onChange={(e) => setFeedback({ ...feedback, title: e.target.value })}
                                    className="w-full bg-[#222225] text-white p-3 rounded-xl h-11 text-sm leading-tight placeholder-[#777777]"

                                />
                            </div>


                        </div> */}
                <div className="ques flex flex-col">
                  <div className="flex items-center mt-2 mb-3 flex-wrap">
                    <div className="text-lg">Review</div>
                    <div className=" text-sm text-[#777777] self-center ml-2">
                      ( Optional )
                    </div>
                  </div>
                  <div className="mb-2.5">
                    <textarea
                      placeholder="Thank You Mark! You have been of great help. Will surely use your services in the future again."
                      value={feedback.description}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          description: e.target.value,
                        })
                      }
                      className="w-full bg-[#222225] text-start overflow-y-hidden text-sm leading-tight text-white p-3 rounded-xl h-25 placeholder-[#777777]"
                    />
                  </div>
                </div>

                <div className="endbar mb-4 mt-auto flex-col items-center">
                  <div className="flex justify-center mt-4 sm:mt-4 w-full">
                    <button
                      type="submit"
                      className={` ${
                        feedback.rating == 0
                          ? "opacity-[0.2] cursor-not-allowed"
                          : "cursor-pointer"
                      } bg-white text-black w-[95%] h-[2.75rem] font-bold py-1 px-4 rounded-md`}
                    >
                      Mark as Completed
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                <form
                  className="flex flex-col w-full h-full mt-3"
                  onSubmit={(e) => {
                    handleFeedback(e);
                  }}
                >
                  <div className="text-[#b0b0b0] mt-3">
                    Please confirm that you have successfully completed the
                    assigned task.
                    <br />
                    By clicking "Mark as Completed", you acknowledge that all
                    necessary steps have been taken, the task has been fulfilled
                    to the best of your ability, and any required information or
                    uploads (if applicable) have been provided.
                    <br />
                    Once submitted, no further edits or changes can be made.
                  </div>

                  <div className="endbar mb-4 mt-auto flex-col items-center">
                    <div className="flex justify-center mt-4 sm:mt-4 w-full">
                      <button
                        type="submit"
                        className={` cursor-pointer bg-white text-black w-[95%] h-[2.75rem] font-bold py-1 px-4 rounded-md`}
                      >
                        Mark as Completed
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="mainbrief flex flex-col w-full h-full px-4">
          <div className="flex flex-col w-full mt-8 ">
            <div className="text-[#a1a1a1] text-[0.8rem]">
              {props.task.task.categoryName.toUpperCase()}
            </div>
            <div className="flex  justify-between">
              <div className="text-white text-lg font-semibold mt-1.5 max-w-10/12">
                {props.task.task.title}
              </div>
              <div>
                {props.task.task.Status == "Open" && (
                  <span
                    className={`px-3 py-0.5 flex justify-center items-center rounded-lg border-3 border-[#33c300] text-[#33c300] text-sm font-medium`}
                  >
                    OPEN
                  </span>
                )}
                {props.task.task.Status == "In-Progress" && (
                  <span
                    className={`px-3 py-0.5 flex justify-center items-center rounded-lg border-3 border-[#f8f54a] text-[#f8f54a] text-sm font-medium`}
                  >
                    IN-PROGRESS
                  </span>
                )}
                {props.task.task.Status == "Completed" && (
                  <span
                    className={`px-3 py-0.5 flex justify-center items-center rounded-lg border-3 border-[#36daff] text-[#36daff] text-sm font-medium`}
                  >
                    Completed
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-[#2f2f2f] h-0.25 mt-4"></div>
          </div>
          <div className="flex flex-col w-full mt-5">
            <div className="flex justify-between">
              <div className="text-[#a1a1a1] text-[0.8rem]">POSTED BY</div>
              <div className="text-[#a1a1a1] text-[0.8rem]">BUDGET</div>
            </div>
            <div className="flex  justify-between mt-3">
              <div className="flex">
                <div
                  className="w-10 h-10 rounded-full bg-pink-300 flex justify-center cursor-pointer items-center text-xl"
                  onClick={() =>
                    navigate(`/profile/${props.task.postedBy.givenId}`)
                  }
                >
                  {props.task.postedBy.firstName.charAt(0)}
                </div>
                <div className="flex flex-col max-w-35 ml-3 justify-center">
                  <div
                    className="text-sm font-semibold text-[#569aff] cursor-pointer flex items-center gap-1"
                    onClick={() =>
                      navigate(`/profile/${props.task.postedBy.givenId}`)
                    }
                  >{`${props.task.postedBy.firstName} ${
                    props.task.postedBy.lastName
                      ? props.task.postedBy.lastName
                      : ""
                  } `} {props.task.postedBy.verified && <VerifiedIcon h={16} w={16} />}</div>
                  <div className="text-[#a1a1a1] text-[0.75rem]">
                    {timeAgo(new Date(props.task.task.createdAt))}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-semibold whitespace-nowrap">
                <span className="text-2xl mr-1">₹</span>
                {props.task.task.budget}
              </div>
            </div>
            <div className="w-full bg-[#2f2f2f] h-0.25 mt-4"></div>
          </div>
          <div className="flex flex-col w-full mt-5">
            <div className="flex justify-between">
              <div className="text-[#a1a1a1] text-[0.8rem]">DUE DATE</div>
              <div className="text-[#a1a1a1] text-[0.8rem]">LOCATION</div>
            </div>
            <div className="flex  justify-between mt-3">
              <div className="flex max-w-1/2">
                <div className="flex flex-col  justify-center">
                  <div className=" font-semibold text-White text-lg">
                    {new Date(props.task.task.endDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long" }
                    )}
                  </div>
                  <div className="text-[#a1a1a1] text-[0.75rem]">
                    {props.task.task.timeSlot}{" "}
                    {props.task.task.timeSlot === "Morning"
                      ? "(Before 11 AM)"
                      : props.task.task.timeSlot === "Afternoon"
                      ? "(11 AM - 4 PM)"
                      : props.task.task.timeSlot === "Evening"
                      ? "(After 4 PM)"
                      : ""}
                  </div>
                </div>
              </div>
              <div className="text-xl max-w-1/2 text-right">
                {props.task.task.modeOfTask == "Remotely"
                  ? "Remote"
                  : `${props.task.task.taskCity}, ${props.task.task.taskLocation}`}
              </div>
            </div>
            <div className="w-full bg-[#2f2f2f] h-0.25 mt-4"></div>
          </div>
          <div className="flex flex-col w-full mt-5">
            <div className="text-[#a1a1a1] text-[0.8rem]">DESCRIPTION</div>

            <div className="text-sm mt-1 text-[#777777]">
              {props.task.task.description}
            </div>
          </div>
          {props.task.task.specificRequirement && (
            <div className="flex flex-col w-full mt-5">
              <div className="text-[#a1a1a1] text-[0.8rem]">
                SPECIFIC REQUIREMENTS
              </div>

              <div className="text-sm mt-1 text-[#777777]">
                {props.task.task.specificRequirement}
              </div>
            </div>
          )}
          {props.task.task.workDays && props.task.task.workDays >= 0 ? (
            <div className="flex flex-col w-full mt-5 mb-4">
              {props.task.task.categoryId == 17 ? (
                <div className="text-[#a1a1a1] text-[0.8rem]">
                  TOTAL BORROW DAYS
                </div>
              ) : (
                <div className="text-[#a1a1a1] text-[0.8rem]">
                  TOTAL WORK DAYS
                </div>
              )}

              <div className="text-sm mt-1 text-[#777777]">
                {props.task.task.workDays} day
                {props.task.task.workDays && props.task.task.workDays > 1
                  ? "s"
                  : ""}
              </div>
            </div>
          ):""}

          {(props.task.task.TaskPosterId == props.user.givenId ||
            props.task.task.UserAcceptedOffer == props.user.givenId) &&
            props.task.task.OfferIdAccepted && (
              <>
                <div className="w-full bg-[#2f2f2f] h-0.25 mt-4"></div>
                <div className="flex flex-col w-full mt-5">
                  <div className="flex justify-between">
                    <div className="text-[#a1a1a1] text-[0.8rem]">
                      ACCEPTED BY
                    </div>
                    <div className="text-[#a1a1a1] text-[0.8rem]">
                      FINAL PRICE
                    </div>
                  </div>
                  <div className="flex  justify-between mt-3">
                    <div className="flex">
                      <div
                        className="w-10 h-10 rounded-full bg-pink-300 flex justify-center cursor-pointer items-center text-xl"
                        onClick={() =>
                          navigate(`/profile/${props.task.offer.givenId}`)
                        }
                      >
                        {props.task.offer.offeredBy.charAt(0)}
                      </div>
                      <div className="flex flex-col max-w-25 ml-3 justify-center">
                        <div
                          className="text-sm font-semibold text-[#569aff] cursor-pointer"
                          onClick={() =>
                            navigate(`/profile/${props.task.offer.givenId}`)
                          }
                        >
                          {props.task.offer.offeredBy}
                          {props.task.offer.verified && <VerifiedIcon h={16} w={16} />}
                        </div>
                        <div className="text-[#a1a1a1] text-[0.75rem]">
                          {timeAgo(
                            new Date(props.task.offer.offerAcceptedDate)
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-semibold whitespace-nowrap">
                      <span className="text-2xl mr-1">₹</span>
                      {props.task.offer.price}
                    </div>
                  </div>
                  <div className="w-full bg-[#2f2f2f] h-0.25 mt-4"></div>
                </div>
                <div className="flex flex-col w-full mt-5">
                  <div className="text-[#a1a1a1] text-[0.8rem]">
                    OFFER MESSAGE
                  </div>

                  <div className="text-sm mt-3 text-[#777777]">
                    {props.task.offer.description}
                  </div>
                </div>
              </>
            )}
          {props.task.task.Status == "Completed" ? (
            <>
              <div className="text-sm text-[#ffffff] mt-auto mb-5 text-center">
                Completed on {formatDate(props.task.task.completedDate)}
              </div>
            </>
          ) : props.task.task.OfferIdAccepted &&
            props.task.task.TaskPosterId == props.user.givenId ? (
            <>
              <div className="mt-auto mb-6 flex w-full justify-evenly pt-2">
                <div
                  className="flex h-10 w-5/12 bg-[#222225] rounded-lg border-2 font-semibold cursor-pointer border-[#777777] justify-center items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/messages/${props.task.task.UserAcceptedOffer}`);
                  }}
                >
                  Send Message
                </div>
                {props.task.task.taskCompletedBy?.includes(
                  props.user.givenId
                ) ? (
                  <div className="flex h-10 w-5/12 bg-[#222225] rounded-lg border-2 font-semibold border-[#777777] justify-center items-center text-[#707070]">
                    Pending
                  </div>
                ) : (
                  <div
                    className="flex h-10 w-5/12 bg-white rounded-lg text-black font-bold justify-center cursor-pointer items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setToggle(true);
                    }}
                  >
                    Mark Completed
                  </div>
                )}
              </div>
            </>
          ) : props.task.task.OfferIdAccepted &&
            props.task.task.UserAcceptedOffer == props.user.givenId ? (
            <>
              <div className="mt-auto mb-6 flex w-full justify-evenly pt-2">
                <div
                  className="flex h-10 w-5/12 bg-[#222225] rounded-lg border-2 font-semibold cursor-pointer border-[#777777] justify-center items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/messages/${props.task.task.TaskPosterId}`);
                  }}
                >
                  Send Message
                </div>
                {props.task.task.taskCompletedBy?.includes(
                  props.user.givenId
                ) ? (
                  <div className="flex h-10 w-5/12 bg-[#222225] rounded-lg border-2 font-semibold border-[#777777] justify-center items-center text-[#707070]">
                    Pending
                  </div>
                ) : (
                  <div
                    className="flex h-10 w-5/12 bg-white rounded-lg text-black font-bold justify-center cursor-pointer items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setToggle(true);
                    }}
                  >
                    Mark Completed
                  </div>
                )}
              </div>
            </>
          ) : props.task.task.TaskPosterId == props.user.givenId ? (
            <div className="mt-auto mb-6 flex w-full justify-evenly">
              <div
                className="flex h-10 w-5/12 bg-[#222225] rounded-lg border-2 font-semibold cursor-pointer border-[#777777] justify-center items-center"
                onClick={() => {
                  setDeleteTask(true);
                }}
              >
                Delete Task
              </div>
              <div
                className="flex h-10 w-5/12 bg-white rounded-lg text-black font-bold justify-center cursor-pointer items-center"
                onClick={() => {
                  navigate(`/task/offers/${props.task.task.givenId}`);
                }}
              >
                View Offers
              </div>
            </div>
          ) : props.task.task.Status == "Open" ? (
            <div className="mt-auto mb-6 flex w-full justify-evenly">
              <div
                className="flex h-10 w-5/12 bg-[#222225] rounded-lg border-2 font-semibold cursor-pointer border-[#777777] justify-center items-center"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/messages/${props.task.task.TaskPosterId}`);
                }}
              >
                Send Message
              </div>
              <div
                className="flex h-10 w-5/12 bg-white rounded-lg text-black font-bold justify-center cursor-pointer items-center"
                onClick={() => {
                  navigate(`/task/offer/${props.task.task.givenId}`);
                }}
              >
                Make An Offer
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    task: state.particularTask.task,
    loading: state.particularTask.loading,
    user: state.auth.user,
    completeTaskLoading: state.completeTask.loading,
    CompleteTaskSuccess: state.completeTask.success,
  };
};

export default connect(mapStateToProps)(TaskPage);
