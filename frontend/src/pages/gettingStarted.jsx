import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import arrowback from '../assets/arrowback.svg';

function GettingStarted() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    console.log(page)
    if(page<=2){setPage(page+1)}
    else{
        navigate("/signup")
    }
  }

  const imgArray=['https://lh3.googleusercontent.com/d/1auZnNnSKCInKiFrOgM2xYk2Dyx2OIXUd=s800'
    ,"https://lh3.googleusercontent.com/d/1qJ_IzGuCs4HvzZgKeuuqG-ubzD9MH9_j=s800"
    ,"https://lh3.googleusercontent.com/d/1aa-ej5XTO-muCtZxP-YDFQmph4DIPUv7=s800"
    ,"https://lh3.googleusercontent.com/d/1ohOIsfDEwD5LXxjWQvmMQiVEmgfAISM6=s800"
  ];
  

  
  return (
    <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col p-4 justify-between">
      {/* Top Navigation Bar */}
      <div className={`topNavBar flex w-full justify-between items-center mt-4 ${page === 0 ? 'invisible' : ''}`}>
        <div className="back-to-main-page flex pt-[0.2rem]"> 
        <button style={{ all: 'unset', cursor: 'pointer' }} className="h-full" type="button" onClick={() => setPage(0)}>
            <div className="flex items-center">

        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="10" height="16" fill="none "/>
            <g id="App Icons">
            <rect width="663" height="1904" transform="translate(-118 -536)" fill="none"/>
            <g id="Iconly/Light/Arrow - Left 4">
            <g id="Iconly/Light/Arrow - Left 4_2">
            <g id="Arrow - Left 2">
            <path id="Stroke 1" d="M8.5 15L1.5 8L8.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            </g>
            </g>
            </g>
        </svg>
          <div className="text-white text-md ml-3">Getting Started</div>

            </div>
          </button>
        </div>
        <div className="signIn flex">
          {/* <div className="question text-white/50 text-sm">New User?</div> */}
          <div className="buttonmine flex items-center ml-[0.4rem]">
            <button style={{ all: 'unset', cursor: 'pointer' }} className="ml-2 h-full" type="button" onClick={() => navigate('/signup')}>
              <div className="text-white text-sm font-bold">Skip</div>
            </button>
          </div>
        </div>
      </div>
      <img src={imgArray[page]} className='self-center w-[75%] sm:w-[60%]'/>
      
      {page===0
      ? <div className="centre-content flex-col self-center justify-center text-center">
        <h1 className='text-2xl font-semibold self-center' >Welcome to Ask it</h1>
        <p className='mt-8'>Describe your task, review your offers & choose </p>
        <p className='mt-2'>the best one for you!</p>
      </div>
      : page===1
      ? <div className="centre-content flex-col self-center justify-center text-center">
      <h1 className='text-2xl font-semibold self-center' >Verified Service Provider</h1>
      <p className='sm:text-sm mt-8'>From Walking your dog to helping out with your</p>
      <p className='sm:text-sm mt-2'>assignments, we have Verified service providers who can</p>
      <p className='sm:text-sm mt-2'>help with it all. Post any task for Free.</p>
    </div> 
      : page===2
      ? <div className="centre-content flex-col self-center justify-center text-center">
      <h1 className='text-2xl font-semibold self-center' >Select from the best</h1>
      <p className='mt-8'>Verified Service Providers will bid on your task. Choose </p>
      <p className='mt-2'>among the top rated Service Providers.</p>
    </div>
       : <div className="centre-content flex-col self-center justify-center text-center">
       <h1 className='text-2xl font-semibold self-center mb-2' >Get it done!</h1>
       <h1 className='text-2xl font-semibold self-center' >Pay Them Securely</h1>
       <p className='sm:text-sm mt-8'>After the task is completed, review and release the </p>
      <p className='sm:text-sm mt-2'>payment, funds are held by us securely</p>
      <p className='sm:text-sm mt-2'>until the task is completed.</p>
     </div>
      }

      <div className="endbar mb-4 flex-col items-center">
        {page==0 
        ?<div className="signIn flex justify-center mb-2">
          <div className="question text-white/50 text-sm">Already have an account?</div>
          <div className="buttonmine flex items-center ml-[0.4rem]">
            <button style={{ all: 'unset', cursor: 'pointer' }} className="ml-2 h-full" type="button" onClick={() => navigate('/login')}>
              <div className="text-white text-sm font-bold">Log In</div>
            </button>
          </div>
        </div>
        :<div className="dots flex justify-center items-center mb-2 space-x-1">
        {page===1? <span className="w-2 h-2 bg-white rounded-full"></span>: <span className="w-1.5 h-1.5 mt-0.25 bg-gray-500 rounded-full align-middle"></span>}
        {page===2? <span className="w-2 h-2 bg-white rounded-full"></span>: <span className="w-1.5 h-1.5 mt-0.25 bg-gray-500 rounded-full align-middle"></span>}
        {page===3? <span className="w-2 h-2 bg-white rounded-full"></span>: <span className="w-1.5 h-1.5 mt-0.25 bg-gray-500 rounded-full align-middle"></span>}
        
      </div>
      
        }
      
        <div className="flex justify-center mt-4 sm:mt-4 w-full">
          <button type="button"  className="bg-white text-black w-[95%] h-[2.75rem] font-bold py-1 px-4 rounded-md cursor-pointer" onClick={() => handleNext()}>
            {page==0 ? 'Get Started' : page<=2 ? 'Next' : 'Sign Up'}
          </button>
          </div>
      </div>
      
    </div>
  );
}

export default GettingStarted;