import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Navbar = (props) => {
  var router = useRouter();
  const [showSearchBarinnavbar, setshowSearchBarinnavbar] = useState(false);
  // var bgtransparent = props.bgtransparent || true;
  const [bgtransparent, setbgtransparent] = useState(false);
  var { Auth, updateAuth } = useAuth();
  const [searchedQuery, setsearchedQuery] = useState([]);
  var router = useRouter();

  useEffect(() => {
    var currentPathname = new URL(document.URL).pathname;
    if (currentPathname == "/" && $(window).scrollTop() < 140) {
      setbgtransparent(true);
    } else {
      setbgtransparent(false);
    }
    $(window).scroll(function () {
      var _cur_top = $(window).scrollTop();
      if (new URL(document.URL).pathname == "/") {
        if (_cur_top > 140) {
          setbgtransparent(false);
        } else {
          setbgtransparent(true);
        }
      }
    });
  }, [router.pathname]);

  return (
    <div>
      <div className="fixed z-[100] w-full ">
        <div
          className={`w-full /h-[7rem] pt-[0.5rem] pb-[0.1rem] transition-all duration-300 ${
            bgtransparent ? "bg-transparent" : "bg-white"
          }`}
        >
          <div className=" md:flex hidden w-full py-[0.5rem] px-[0] md:px-[15rem] text-white items-center justify-between">
            <div className="flex items-center">
              <div>
                <Link href={"/"}>
                  <img
                    className={` ${
                      bgtransparent ? "/invert w-[7rem]" : " w-[4rem]"
                    } transition-all duration-300`}
                    src={
                      !bgtransparent
                        ? "/traverseLight.png"
                        : "/traverseDark.png"
                    }
                    // src="/zaptravel.png"
                    alt=""
                  />
                  {/* <h3
                    className={`text-4xl transition-all duration-300 ${
                      bgtransparent ? "text-white" : "text-black"
                    }`}
                    style={{ fontFamily: "staatliches" }}
                  >
                    zaptravel
                  </h3> */}
                </Link>
              </div>
              <div className=" md:block hidden ml-[1rem]">
                <div className="flex items-center">
                  <label for="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="simple-search"
                      onFocus={() =>
                        searchedQuery[0] ? setshowSearchBarinnavbar(true) : ""
                      }
                      onBlur={() =>
                        setTimeout(() => {
                          setshowSearchBarinnavbar(false);
                        }, 1000)
                      }
                      onChange={async (el) => {
                        var { data: axres } = await axios.get(
                          "/api/location/completeQuery?input=" + el.target.value
                        );
                        setsearchedQuery(axres.data);
                        setshowSearchBarinnavbar(true);
                      }}
                      className={`${
                        bgtransparent
                          ? "bg-transparent text-white"
                          : "bg-gray-100 text-black"
                      }  w-[20rem] outline-none text-sm rounded-full  block pl-10 p-2.5  transition-all duration-300 `}
                      placeholder="Search Destinations, Tours, Activities"
                      required
                    />
                    <div
                      className={`absolute flex ${
                        showSearchBarinnavbar
                          ? " opacity-100 pointer-events-auto "
                          : " opacity-0 pointer-events-none "
                      } max-h-[20rem] rounded-b-xl bg-white text-black w-full flex-col /gap-[0.5rem]`}
                    >
                      {searchedQuery.map((el, index) => (
                        <>
                          <div
                            key={index}
                            className={`px-4 ${
                              searchedQuery.length == 1
                                ? ""
                                : index == 0
                                ? "pt-[1rem]"
                                : index == searchedQuery.length - 1
                                ? "pb-[1rem]"
                                : ""
                            }`}
                          >
                            <button
                              onClick={() => {
                                var obj = {};
                                obj["place_id"] = el.place_id;
                                // if (
                                //   new URL(document.URL).searchParams.get("key")
                                // ) {
                                //   obj["key"] = new URL(
                                //     document.URL
                                //   ).searchParams.get("key");
                                //   router.push({
                                //     pathname: "/Place",
                                //     query: obj,
                                //   });
                                // } else {
                                // if (enabled.includes(el.place_id)) {
                                router.push({
                                  pathname: "/Place",
                                  query: { place_id: el.place_id },
                                });
                                setshowSearchBarinnavbar(false);

                                // } else {
                                //   window.open(
                                //     `https://www.google.com/search?q=${el.description}`
                                //   );
                                // }
                                // }
                              }}
                              // href={`/Place?place_id=${el.place_id}${
                              //   new URL(document.URL).searchParams.get("key")
                              //     ? "&key=" +
                              //       new URL(document.URL).searchParams.get("key")
                              //     : ""
                              // }`}
                              className="hover:bg-slate-100 w-full flex items-start  p-[0.5rem]"
                            >
                              {el.description}
                            </button>
                            <hr />
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:block hidden">
              {Auth?.user?.email ? (
                <div
                  style={{ fontFamily: "rubik" }}
                  className={`relative group text-end ${
                    bgtransparent ? "text-white" : " text-black"
                  }`}
                >
                  <h3 className="text-lg">{Auth.user.name}</h3>
                  <h3
                    className={`text-sm  lowercase ${
                      bgtransparent ? "text-slate-300" : " text-black"
                    }`}
                  >
                    {Auth.user.email}
                  </h3>
                  <div className="absolute group-hover:block hidden bottom-[-100%] h-full w-full p-2 right-[0%]  bg-white rounded-md">
                    <button
                      onClick={() => {
                        updateAuth({ type: "SIGN_OUT" });
                      }}
                      className="flex items-center justify-center text-center w-full h-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white px-3"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href={"/Login"}>
                  <button>
                    <h3
                      className={`transition-all duration-300 ${
                        bgtransparent ? "text-white" : "text-black"
                      }`}
                    >
                      Login
                    </h3>
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex md:hidden items-center justify-between px-[1rem] mt-[0.5rem] text-white">
            <div
              className="cursor-pointer"
              onClick={() => {
                // document.querySelector("#navbarMobileMenuView").style.padding =
                //   "1rem";
                if (
                  document.querySelector("#navbarMobileMenuView").style.width !=
                  "20rem"
                ) {
                  document.querySelector("#navbarMobileMenuView").style.width =
                    "20rem";
                } else {
                  document.querySelector("#navbarMobileMenuView").style.width =
                    "0rem";
                }
              }}
            >
              <i
                class={`fi fi-br-bars-sort flex items-center ${
                  bgtransparent ? "text-white" : "text-black"
                } text-2xl`}
              ></i>
            </div>
            <div>
              <Link href={"/"}>
                <h3
                  className={`text-4xl transition-all duration-300 ${
                    bgtransparent ? "text-white" : "text-black"
                  }`}
                  style={{ fontFamily: "staatliches" }}
                >
                  zaptravel
                </h3>
              </Link>
            </div>
            <div>
              <i
                class={`fi fi-br-search flex items-center text-2xl  ${
                  bgtransparent ? "text-white" : "text-black"
                }`}
              ></i>
            </div>
          </div>
          <div
            id="navbarMobileMenuView"
            className="absolute left-0 h-[100vh] w-0 /w-[20rem] overflow-hidden /p-4 bg-white rounded-tr-2xl transition-[width] duration-500"
          >
            <div className="flex flex-col items-center w-full /gap-[1rem] /my-4">
              <Link href={"/"}>
                <h3
                  className="text-base text-center w-full py-[1rem] cursor-pointer"
                  style={{ fontFamily: "rubik" }}
                >
                  Home
                </h3>
              </Link>
              <hr className="w-[90%] " />
              <Link href={"/Login"}>
                <h3
                  className="text-base text-center w-full py-[1rem] cursor-pointer"
                  style={{ fontFamily: "rubik" }}
                >
                  Log in
                </h3>
              </Link>
              <hr className="w-[90%] " />
              <h3
                className="text-base text-center w-full py-[1rem] cursor-pointer"
                style={{ fontFamily: "rubik" }}
              >
                Help
              </h3>
            </div>
          </div>
          <div className="w-full hidden md:block px-[15rem]">
            <hr className="w-full " />
          </div>
        </div>
      </div>
      {/* <div className="block h-[7rem] w-full" /> */}
    </div>
  );
};

export default Navbar;
