import React from 'react'
import { Star,LocationPin } from '../assets/Icons'
import { useDispatch } from 'react-redux'
import { updateOffer } from '../actions/offerActions'
import { useNavigate } from 'react-router-dom'

const OfferComp = ({ offer,taskId }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let ht=offer.userRating;
  ht=ht*100;
  ht=Math.ceil(ht);
  ht=ht/100;
  return (
    <>
      <div className="bg-[#222225] rounded-xl p-6 flex flex-col w-full">
        <div className="flex min-h-15 ">
          <div className="bg-pink-300 h-full aspect-square rounded-full"></div>
          <div className="flex flex-col justify-evenly ml-2 w-[60%] py-1">
            <div className="text-lg">{offer.offeredByName}</div>
            <div className="text-lg text-[#777777] line-clamp-1">{offer.offeredBySkills}</div>
          </div>
          <div className="text-lg font-bold text-center flex justify-center ml-auto items-center pb-6">
            <div className=" text-2xl">₹{offer.price}</div>
          </div>



        </div>
        <div className="flex justify-evenly mt-2">
          <div className="flex items-center gap-x-1 text-[#777777] text-sm">
            <Star/>

            {ht}</div>

          <div className="flex items-center gap-x-1 text-[#777777] text-sm">
            <LocationPin/>
            {offer.userCity}, India
          </div>

        </div>
        <div className="mt-2">{offer.description}</div>

        <div className="flex justify-evenly mt-4">
          <div className="bg-white text-[#2F9B09] w-[30%] h-8 font-bold rounded-xl flex justify-center items-center cursor-pointer" onClick={(e)=>{dispatch(updateOffer('Accepted',offer._id,taskId))}}>Accept</div>
          <div className="bg-white text-[#000000] w-[30%] h-8 font-bold rounded-xl flex justify-center items-center cursor-pointer" onClick={(e)=>{navigate(`/messages/${offer.userGivenId}`)}}>Message</div>
          <div className="bg-white text-[#FF3D00] w-[30%] h-8 font-bold rounded-xl flex justify-center items-center cursor-pointer" onClick={(e)=>{dispatch(updateOffer('Rejected',offer._id,taskId))}} >Decline</div>
        </div>
      </div>
    </>
  )
}

export default OfferComp