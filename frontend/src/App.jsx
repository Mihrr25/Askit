import { useState, useEffect, } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { connect, useDispatch } from "react-redux";
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage'
import GettingStarted from './pages/gettingStarted';
import PostTaskPage from './pages/PostTaskPage';
import HomePage from './pages/HomePage';
import MessagesPage from './pages/messagesPage';
import TaskPage from './pages/taskPage';
import MakeOffer from './pages/makeOffer';
import Offers from './pages/offers';
import MyTasksPage from './pages/MyTasksPage';
import { getUser } from './actions/authActions';
import UserMessagePage from './pages/UserMessagePage';
import {connectSocket} from './actions/socketActions'
import {fetchChats} from './actions/messagesActions'
import { fetchAlerts } from './actions/alertsAction';
import AlertsPage from './pages/alertsPage';
import EditProfile from './pages/editProfile';
import ProfileViewPage from './pages/ProfileViewPage';

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser())
  }
    , [getUser]);
  // console.log(props)
  useEffect(() => {
    if (props.isAuthenticated) {
      dispatch(connectSocket())
      dispatch(fetchChats())
      dispatch(fetchAlerts())
      

    }
  }
    , [props.isAuthenticated]);

  if(props.loading){
    return <div>Loading...</div>
  }


  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-black text-white max-md:p-2">

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={props.user ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/signup" element={props.user ? <Navigate to="/" /> : <SignupPage />} />
            <Route path="/gettingStarted" element={props.user ? <><Navigate to="/" /></> : <GettingStarted />} />
            <Route path="/" element={props.isAuthenticated ? <Outlet /> : <Navigate to="/gettingStarted" />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/task/:id" element={<TaskPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/messages/:id" element={<UserMessagePage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/profile/:id" element={<ProfileViewPage />} />
              <Route path="/profile/edit" element={<EditProfile />} />

              <Route path="/post" element={props.user?.isProfileSetUp?<PostTaskPage /> : <Navigate to="/profile/edit"/>} />
              <Route path="/mytasks" element={props.user?.isProfileSetUp?<MyTasksPage/> : <Navigate to="/profile/edit"/>} />
              <Route path="/task/offer/:id" element={props.user?.isProfileSetUp?<MakeOffer /> : <Navigate to="/profile/edit"/>} />
              <Route path="/task/offers/:id" element={props.user?.isProfileSetUp?<Offers /> : <Navigate to="/profile/edit"/>} />
            </Route>
          </Routes>
        </BrowserRouter>

      </div>

    </>
  )
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps)(App);
