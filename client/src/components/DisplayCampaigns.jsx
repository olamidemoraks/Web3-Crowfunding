import React from "react";
import { useNavigate } from "react-router-dom";

import { loader } from "../assets";
import { FunCard } from "./";

const DisplayCampaigns = ({ title, campaigns, isLoading }) => {
  const navigate = useNavigate();
  function handleNavigate(campaign) {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign });
  }
  return (
    <div>
      <h1 className="font-epilogue text-[18px] font-semibold text-white text-left">
        {title} ({campaigns.length})
        <div className="flex flex-wrap mt-[20px] gap-[26px] ">
          {isLoading && (
            <img
              src={loader}
              alt="loader"
              className="w-[100px] h-[100px] object-contain "
            />
          )}
          {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] ">
              You have not created any campaigns yet.
            </p>
          )}
          {!isLoading &&
            campaigns.length > 0 &&
            campaigns.map((campaign) => (
              <FunCard
                key={campaign.id}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))}
        </div>
      </h1>
    </div>
  );
};

export default DisplayCampaigns;
