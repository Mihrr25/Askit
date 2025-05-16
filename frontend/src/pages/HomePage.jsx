import React, {useState,useEffect,useCallback, use} from 'react'
import { Hamburger, Search } from '../assets/Icons'
import SearchBar from '../components/HomePage/SearchBar'
import { HomeworkAndAssignments, OfficeWork } from '../assets/Icons'
import TaskDesc from '../components/HomePage/TaskDesc'
import Sidebar from '../components/sidebar'
import { useDispatch } from 'react-redux'
import { getTasks, postTaskReset } from '../actions/TaskActions'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

const HomePage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const handleSearch = (word) => {
    if (word?.length > 0) {
      let filtered = props.tasks.filter((task) =>
        task.title.toLowerCase().includes(word.toLowerCase()) ||
        task.categoryName.toLowerCase().includes(word.toLowerCase()) ||
        task.description.toLowerCase().includes(word.toLowerCase())
    );
    setTasks(filtered);
    }
    else {
      setTasks(props.tasks)
    }
  }
  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup when unmounted
    };
  }, [isOpen]);

  useEffect(() => {
    dispatch(getTasks())
    dispatch(postTaskReset())
  }, [dispatch])

  let [tasks,setTasks] = useState([])
  useEffect(() => {
    setTasks(props.tasks)
  }
  , [props.tasks])
  if(props.loading){
    return <div>Loading...</div>
  }

  

  return (
    <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col p-4">
      {/* Top Navigation Bar */}
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen}/>
      {isOpen && (
        <div className="fixed h-full w-full inset-0  bg-black opacity-50 z-40" onClick={toggleSidebar}></div>
      )}
      <div className="topNavBar flex w-full items-center mt-4 mb-2">
        <div className="Hamburger flex pt-[0.2rem] cursor-pointer" onClick={toggleSidebar}>
          <Hamburger />
        </div>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className="itemsFound text-white text-md flex w-full mt-2">
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
    tasks:state.showTask.tasks,
    loading: state.showTask.loading,
  }
}

export default connect(mapStateToProps)(HomePage)