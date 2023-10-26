import axios from "axios";
import React, { useState, useEffect } from "react";

function AiInput({ recmFxn, Processing }) {
  const [UserInputs, setUserInputs] = useState({
    travel_days: "2 days",
    interests: "Adventure",
    destination: undefined,
    extras: undefined,
  });

  const [Result, setResult] = useState([]);

  useEffect(() => {}, []);

  function recm() {
    recmFxn(UserInputs);
  }

  return (
    <div
      style={
        {
          // backgroun,
        }
      }
      className="input-step w-[50%] bg-[#fff9] /max-h-[50vh]  p-6  rounded-xl drop-shadow-2xl "
    >
      <div className="flex w-full flex-row flex-wrap">
        <div className="w-full sm:w-1/2 lg:w-1/3 py-4 sm:px-4">
          <div className="relative w-full">
            <div className="mb-2">Trip Duration</div>
            <div className="w-full">
              <div className="min-w-[160px]">
                <select
                  className=" text-black dark-app:text-white relative w-full cursor-pointer rounded-lg bg-white py-4  pl-6 leading-tight border dark-app:border-none border-neutral-300 dark-app:bg-[#444444]  pr-8 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-200"
                  id="headlessui-listbox-button-:r0:"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  data-headlessui-state=""
                  title="Duration"
                  value={UserInputs.travel_days}
                  onChange={(event) =>
                    setUserInputs((e) => ({
                      ...e,
                      travel_days: event.target.value,
                    }))
                  }
                >
                  <option className="block truncate bg-white" value="1 day">
                    1 day
                  </option>
                  <option className="block truncate bg-white" value="2 days">
                    2 days
                  </option>
                  <option className="block truncate bg-white" value="3 days">
                    3 days
                  </option>
                  <option className="block truncate bg-white" value="4 days">
                    4 days
                  </option>
                  <option className="block truncate bg-white" value="5 days">
                    5 days
                  </option>
                  <option className="block truncate bg-white" value="6 days">
                    6 days
                  </option>
                  <option className="block truncate bg-white" value="7 days">
                    7 days
                  </option>

                  {/* <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg> */}
                </select>
                <div
                  style={{
                    position: "absolute",
                    zIndex: 9999,
                    inset: "0px auto auto 0px",
                    transform: "translate(0px, 98px)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 py-3 sm:px-4">
          <div className="relative w-full">
            <div className="mb-3">Destination</div>
            <div className="flex-grow   text-black dark-app:text-white">
              <input
                type="text"
                placeholder="Destination"
                className="bg-white dark-app:bg-[#444444] dark-app:bg-opacity-100 light-bg:bg-opacity-80 rounded-lg border dark-app:border-none border-neutral-300 appearance-none w-full py-[17px] px-6 leading-tight focus:outline-none focus:border-neutral-400 placeholder-opacity-40 placeholder-black dark-app:placeholder-opacity-40 dark-app:placeholder-white "
                value={UserInputs.destination}
                onChange={(event) =>
                  setUserInputs((e) => ({
                    ...e,
                    destination: event.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-full lg:w-1/3 py-4 sm:px-4">
          <div className="relative w-full">
            <div className="mb-2">Interest</div>
            <div className="w-full">
              <div className="min-w-[160px]">
                <select
                  className=" text-black dark-app:text-white relative w-full cursor-pointer rounded-lg bg-white py-4  pl-6 leading-tight border dark-app:border-none border-neutral-300 dark-app:bg-[#444444]  pr-8 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-200"
                  type="button"
                  title="Duration"
                  value={UserInputs.interests}
                  onChange={(event) =>
                    setUserInputs((e) => ({
                      ...e,
                      interests: event.target.value,
                    }))
                  }
                >
                  <option className="block truncate bg-white">Adventure</option>
                  <option className="block truncate bg-white">Culture</option>
                  <option className="block truncate bg-white">Food</option>
                  <option className="block truncate bg-white">
                    Relaxation
                  </option>
                  <option className="block truncate bg-white">Nature</option>
                  <option className="block truncate bg-white">All</option>
                </select>
                <div
                  style={{
                    position: "absolute",
                    zIndex: 9999,
                    inset: "0px auto auto 0px",
                    transform: "translate(0px, 98px)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 sm:px-4">
        <div
          id="main-input"
          className=" rounded-lg appPage_prompt_box_wrapper__UKUpz border border-white bg-white dark-app:border-none dark-app:bg-[#444444] text-black dark-app:text-white glow-effect"
        >
          <textarea
            className="rounded-lg px-3 py-2 focus:outline-none w-full placeholder-opacity-40 placeholder-black dark-app:placeholder-opacity-40 dark-app:placeholder-white "
            placeholder="Add anything here..."
            rows="1"
            style={{ height: 60 }}
            value={UserInputs.extras}
            onChange={(event) =>
              setUserInputs((e) => ({
                ...e,
                extras: event.target.value,
              }))
            }
          />
          {/* <svg className="glow-container hidden">
            <rect
              pathLength="100"
              strokeLinecap="round"
              className="glow-blur"
              rx="20px"
            ></rect>
            <rect
              pathLength="100"
              strokeLinecap="round"
              className="glow-line"
              rx="20px"
            ></rect>
          </svg> */}
        </div>
        <div className="flex w-full flex-row justify-end pt-6">
          <button
            className="generate-button group bg-green-700 transition-all duration-300 cursor-pointer bg-[#111827] text-white items-center w-full md:w-min whitespace-nowrap  focus-visible:outline-white hover:bg-[#1e283c] text-xl rounded-xl px-6 py-4"
            style={{
              color: "rgb(255, 255, 255)",
              //   backgroundColor: "blueviolet",
            }}
          >
            <div
              onClick={() => {
                if (Processing) return;
                recm();
              }}
              className="generate "
            >
              <div className="flex flex-row items-center gap-1 ">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-125 group-hover:-translate-x-1 group-hover:animate-pulse transition-all duration-300"
                >
                  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"></path>
                </svg>
                <p>{!Processing ? "Search" : "Searching..."}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiInput;
