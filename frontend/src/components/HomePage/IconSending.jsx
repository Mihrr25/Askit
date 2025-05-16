import React from 'react';
import { 
  HomeworkAndAssignments, OfficeWork, Lift_Move_Pack, Tutoring, ComputerIT, Cleaning, 
  VideoEditing, Photography, Design, DeliveryAndErrands, PetCare, GardeningAndPlantCare, 
  Events, Custom, Socializing 
} from '../../assets/Icons';

const IconSending = ({ id }) => {
  switch (id) {
    case 1:
      return <HomeworkAndAssignments h={"25px"} />;
    case 2:
      return <OfficeWork h={"25px"} />;
    case 3:
      return <Lift_Move_Pack h={"25px"} />;
    case 4:
      return <Tutoring h={"25px"} />;
    case 5:
      return <ComputerIT h={"25px"} />;
    case 6:
      return <Cleaning h={"25px"} />;
    case 7:
      return <VideoEditing h={"25px"} />;
    case 8:
      return <Photography h={"25px"} />;
    case 9:
      return <Design h={"25px"} />;
    case 10:
      return <DeliveryAndErrands h={"25px"} />;
    case 11:
      return <PetCare h={"25px"} />;
    case 12:
      return <GardeningAndPlantCare h={"25px"} />;
    case 13:
      return <Events h={"25px"} />;
    case 14:
      return <Custom h={"25px"} />;
    case 15:
      return <Socializing h={"25px"} />;
    default:
      return <div>Invalid ID</div>;
  }
};

export default IconSending;
