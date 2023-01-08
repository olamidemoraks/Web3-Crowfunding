import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const { donate, contract, address, getDonations } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [donators, setDonators] = useState([]);
  const remainingDays = daysLeft(state.deadline);
  const navigate = useNavigate();

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  async function handleDonate() {
    setIsLoading(true);
    await donate(state.pId, amount);
    navigate("/");
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <div className="w-full h-[410px] rounded-xl">
            <img
              src={state.image}
              alt="campaign"
              className="w-full h-[100%] object-cover rounded-xl"
            />
          </div>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px] ">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-semibold font-epilogue text-[18px] text-white uppercase ">
              Creator
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-semibold font-epilogue text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-normal font-epilogue text-[12px] text-[#808191] ">
                  10 campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold font-epilogue text-[18px] text-white uppercase ">
              Story
            </h4>
            <div className="mt-[20px]">
              <p className="font-normal font-epilogue text-[16px] text-[#808191] leading-[28px] text-justify">
                {state.description} Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Corrupti, repellat corporis, repudiandae
                suscipit cupiditate perferendis nesciunt sunt, blanditiis sequi
                reiciendis harum vitae maiores fugiat quis consequuntur maxime
                aut consectetur ex non odio ipsam ipsum expedita! Suscipit,
                excepturi enim voluptates nesciunt veniam soluta ipsum harum
                quam cum repudiandae illum sint explicabo itaque molestias,
                doloremque maiores modi, sequi mollitia! Repellendus ad dolorem
                error delectus perspiciatis explicabo asperiores perferendis
                ipsam molestias nobis inventore maiores, laboriosam voluptate
                aut officiis id expedita rem! Praesentium, aut molestias. Eos
                minus fugiat, iusto delectus labore minima consequatur
                perferendis beatae pariatur? Aspernatur sapiente animi at quos
                corporis officia amet voluptates, ratione minus quaerat libero
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold font-epilogue text-[18px] text-white uppercase ">
              Donators
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donators}-${index}`}
                    className=" flex justify-between items-center gap-4  "
                  >
                    <p className=" font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all ">
                      {index + 1}. {item.donator}
                    </p>
                    <p className=" font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all ">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-normal font-epilogue text-[16px] text-[#808191] leading-[28px] text-justify">
                  No donators yet be the first one!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <h4 className="font-semibold font-epilogue text-[18px] text-white uppercase ">
            Fund
          </h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px] ">
            <p className="font-medium font-epilogue text-center text-[20px] leading-[30px] text-[#808191]  ">
              Fund the Campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] mt-3
                 border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px] "
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px] ">
                <h4 className="font-semibold font-epilogue text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191] ">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              <CustomButton
                title="Fund Campaign"
                btnType="button"
                styles={"w-full bg-[#8c6dfd]"}
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
