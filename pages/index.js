import MiniBlockHome from "@/components/MiniBlockHome";
import MiniSquareimgBlock from "@/components/MiniSquareimgBlock";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import $ from "jquery";
const OwlCarouse = dynamic(import("react-owl-carousel"), { ssr: false });
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Home({ allCities }) {
  // console.log(allCities);
  var router = useRouter();
  const [HomePageImageArray, setHomePageImageArray] = useState([
    "/images/cultural-tourism-5264542.jpg",
    "/images/evening-1038148.jpg",
    "/images/outside-guide-grand-canyon_h.webp",
    "/images/nature-3340709.jpg",
    "/images/province-3344511.jpg",
  ]);
  const [searchedQuery, setsearchedQuery] = useState([]);
  // const [allCities, setallCities] = useState([]);
  const [currentImage, setcurrentImage] = useState(
    "/images/nature-3340709.jpg"
  );

  const [CurrentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (dt) => {
        // console.log("success", dt);
        if (dt.latitude && dt.longitude) {
          setCurrentLocation(dt);
        }
      },
      (mt) => {
        console.log("error", mt);
      }
    );
  }, []);

  useEffect(() => {
    setcurrentImage(
      "/api/location/getImage?refrence=" +
        allCities[Math.floor(Math.random() * allCities.length)].photos[
          Math.floor(
            Math.random() *
              allCities[Math.floor(Math.random() * allCities.length)].photos
                .length
          )
        ]?.photo_reference
    );
    // setcurrentImage(
    //   HomePageImageArray[Math.floor(Math.random() * HomePageImageArray.length)]
    // );
  }, []);

  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    // autoplayTimeout: 8500,
    // smartSpeed: 450,
    nav: true,
    items: 1,
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   600: {
    //     items: 3,
    //   },
    //   1000: {
    //     items: 3,
    //   },
    // },
  };
  return (
    <div className="min-h-[100vh] w-full">
      <div>
        <div className="h-[100vh] w-full relative flex items-center justify-center">
          <div className="z-[2] flex w-full flex-col items-center justify-center">
            <div className="flex w-full flex-col gap-[1rem] items-center justify-center">
              <div
                className="text-white text-3xl font-bold"
                style={{ fontFamily: "poppins" }}
              >
                {`It's time for new`}
              </div>

              <div
                className="text_scroll_anim !text-5xl md:!text-8xl  tracking-wider !h-fit"
                style={{
                  fontFamily: "rubik",
                  fontWeight: "bold",
                  lineHeight: "100px",
                }}
              >
                <div className="text_scroll_anim__container h-[2.5rem] md:!h-[6.7rem]">
                  <ul className="text_scroll_anim__container__list">
                    <div className="/my-[1rem] md:py-[2.1rem]">
                      <li className="text_scroll_anim__container__list__item text-center !font-[2000] ">
                        Experiences
                      </li>
                    </div>
                    <div className="/my-[1rem] md:py-[2.1rem]">
                      <li className="text_scroll_anim__container__list__item text-center !font-[2000] ">
                        Adventures
                      </li>
                    </div>
                    <div className="/my-[1rem] md:py-[2.1rem]">
                      <li className="text_scroll_anim__container__list__item text-center !font-[2000] ">
                        Escapes
                      </li>
                    </div>
                    <div className="/my-[1rem] md:py-[2.1rem]">
                      <li className="text_scroll_anim__container__list__item text-center !font-[2000] ">
                        Thrills
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-[3rem] w-full md:w-[100%] md:px-[10rem] lg:px-[20rem] px-[1rem]">
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
                    type="text"
                    id="simple-search"
                    onChange={async (el) => {
                      var { data: axres } = await axios.get(
                        "/api/location/completeQuery?input=" + el.target.value
                      );
                      setsearchedQuery(axres.data);
                    }}
                    className="bg-gray-50 h-[3rem] w-full border border-gray-300 text-gray-900 text-sm rounded-lg  block pl-10 p-2.5  "
                    placeholder="Search Destinations, Tours, Activities"
                    required
                  />
                  <div className="absolute max-h-[20rem] rounded-b-xl bg-white w-full flex flex-col /gap-[0.5rem]">
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
                              var enabled = [
                                "ChIJO_PkYRozGQ0R0DaQ5L3rAAQ",
                                "ChIJ0WGkg4FEzpQRrlsz_whLqZs",
                                "ChIJOwg_06VPwokRYv534QaPC8g",
                                "ChIJRcbZaklDXz4RYlEphFBu5r0",
                              ];
                              // if (
                              //   new URL(document.URL).searchParams.get("key")
                              // ) {
                              // ["key"] = new URL(
                              //   document.URL
                              // ).searchParams.get("key");
                              // router.push({ pathname: "/Place", query: obj });
                              // } else {
                              // if (enabled.includes(el.place_id)) {
                              router.push({
                                pathname: "/Place",
                                query: { place_id: el.place_id },
                              });
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
                <button
                  type="submit"
                  className="md:block hidden p-3.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg   hover:bg-green-800  "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>

              <label
                onClick={() => {
                  router.push("/ai");
                }}
                className="text-xl text-white font-bold left-[22%] relative top-[10px] text-center hover:text-blue-200 transition-all duration-300 cursor-pointer hover:underline"
              >
                Dont Know Where To Go? Let AI ✨ Decide It.
              </label>
            </div>
          </div>
          <div className="absolute overflow-hidden z-[1] bottom-[2rem] right-[0%] left-0 md:left-[45%] md:translate-x-[-40%]">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-[1rem] justify-between w-[100%] text-[#beccd0] drop-shadow-md">
              <div className="flex  md:min-w-[13rem] min-w-[11.6rem] gap-[0.5rem] items-start md:items-center justify-center">
                <i className="fi fi-sr-plane-departure flex items-center  text-4xl"></i>
                <div
                  className=" text-xs md:text-sm md:mmin-w-0 tracking-wide in-w-[78em]"
                  style={{ fontFamily: "rubik" }}
                >
                  <h3>{`Endless`}</h3>
                  <h3>TRAVEL EXPERIENCE</h3>
                </div>
              </div>
              <div className="flex md:min-w-0 min-w-[11.6rem]  gap-[0.5rem] items-start md:items-center justify-center">
                <i className="fi fi-rr-earth-americas flex items-center  text-4xl"></i>
                <div
                  className=" text-xs md:text-sm md:min-w-0 tracking-wide min-w-[8rem]"
                  style={{ fontFamily: "rubik" }}
                >
                  <h3>Every</h3>
                  <h3>COUNTRY</h3>
                </div>
              </div>
              <div className="flex md:min-w-0 min-w-[11.6rem]  gap-[0.5rem] items-start md:items-center justify-center">
                <i className="fi fi-ss-coins flex items-center  text-4xl"></i>
                <div
                  className=" text-xs md:text-sm md:min-w-0 tracking-wide min-w-[8rem]"
                  style={{ fontFamily: "rubik" }}
                >
                  <h3>Unbeatable</h3>
                  <h3>PRICE</h3>
                </div>
              </div>
              {/* <div className="flex md:min-w-0 min-w-[11.6rem]  gap-[0.5rem] items-start md:items-center justify-center">
                <i className="fi fi-sr-users-alt flex items-center  text-4xl"></i>
                <div
                  className=" text-xs md:text-sm md:min-w-0 tracking-wide min-w-[8rem]"
                  style={{ fontFamily: "rubik" }}
                >
                  <h3> </h3>
                  <h3></h3>
                </div>
              </div> */}
            </div>
          </div>
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-black h-full w-full opacity-50" />
          <div className="absolute top-0 left-0 bottom-0 right-0 z-[-1]">
            <img
              className="h-full w-full object-cover transition-all duration-500"
              src={currentImage}
              alt=""
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <div className="h-[80vh] w-full flex items-center justify-center">
            <div className="md:px-[10rem] flex md:flex-row flex-col items-center justify-between">
              <div className="flex md:justify-start md:items-start items-center md:my-0 my-[1rem] justify-center gap-[1rem] flex-col">
                <h3
                  className="md:w-[25rem] text-2xl md:text-4xl font-semibold"
                  style={{ fontFamily: "rubik" }}
                >
                  Find The Perfect Escape
                </h3>
                <div className="h-[3px] bg-orange-500 rounded-xl block w-[6rem]" />
                <h3
                  className="md:w-[25rem] text-lg md:text-xl text-[#949494]"
                  style={{ fontFamily: "rubik" }}
                >
                  Discover your ideal Experience
                </h3>
              </div>
              <div className="flex w-[90vw] md:overflow-hidden overflow-y-hidden overflow-x-auto md:w-full gap-[2rem]">
                {allCities.map((city, ind) =>
                  2 % ind ? (
                    <MiniBlockHome
                      key={ind}
                      title={
                        city.name.substr(0, 14)
                        // +
                        // (city.name.length > 14 ? "." : "")
                      }
                      images={city.photos}
                      url={city.url}
                      place_id={city.place_id}
                      // city={city}
                    />
                  ) : (
                    <></>
                  )
                )}
                {/* <div className="">
                  <MiniBlockHome bg="newyork" />
                </div>
                <div className="">
                  <MiniBlockHome bg="dubai" />
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full md:h-[41vh] h-[25vh] mb-[10rem] md:mb-[7rem]">
            <div
              className="text-lg md:text-2xl text-white tracking-wider bg-black flex items-center md:translate-y-0 translate-y-[2.5rem] relative z-[1] justify-center w-full py-[1.5rem]"
              style={{ fontFamily: "Barlow" }}
            >
              How Can TRAVERSE Help Me ?
            </div>
            <div className="w-full h-full bg-black relative">
              <div
                data-aos="width100"
                data-aos-duration="600"
                className="absolute w-full h-[0.2rem] bg-green-500 block top-[50%] translate-y-[-50%] "
              />

              <div className="flex  gap-[1.37rem] md:gap-[2rem] justify-evenly px-[4rem] /pb-[3.5rem] md:pb-[1.5rem] md:pt-[1.5rem] pt-[2.5rem] pb-[2.5rem] h-full ">
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="flex flex-col gap-[1rem] relative w-[8rem] justify-between h-full"
                >
                  <div className="flex justify-center items-center w-[3rem] md:w-[8rem]">
                    <h3
                      data-aos="fade-down"
                      data-aos-delay="200"
                      className="text-green-500 tracking-wider text-center md:text-base text-[0.6rem] w-max md:w-auto"
                      style={{ fontFamily: "poppins" }}
                    >
                      Step 1
                    </h3>
                  </div>
                  <div className="absolute top-1/2 translate-y-[-50%] bg-green-500 w-[3rem] h-[3rem] md:w-[8rem] md:h-[8rem] rounded-full ">
                    <img
                      src="/images/step-1_flowchart.png"
                      className="scale-110"
                      alt=""
                    />
                  </div>
                  <div className="absolute md:bottom-0 left-[50%] translate-x-[-50%] bottom-[-1.5rem] flex items-center justify-center w-[3rem] md:w-max ">
                    <h3
                      data-aos="fade-up"
                      data-aos-delay="200"
                      className="text-white md:text-base text-[0.6rem] w-[3rem] bottom-[-3rem] /absolute left-[11%] md:left-[-8%] /translate-x-[-50%] md:bottom-0 text-center md:w-max"
                      style={{ fontFamily: "rubik" }}
                    >
                      Register To TRAVERSE
                    </h3>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="1400"
                  className="flex flex-col gap-[1rem] relative w-[8rem] justify-between h-full"
                >
                  <div className="flex justify-center items-center w-[3rem] md:w-[8rem]">
                    <h3
                      data-aos="fade-down"
                      data-aos-delay="1500"
                      className="text-green-500 tracking-wider text-center md:text-base text-[0.6rem] "
                      style={{ fontFamily: "poppins" }}
                    >
                      Step 2
                    </h3>
                  </div>
                  <div className="absolute top-1/2 translate-y-[-50%] bg-green-500 w-[3rem] h-[3rem] md:w-[8rem] md:h-[8rem] rounded-full ">
                    <img
                      src="/images/step-2_flowchart.png"
                      className="scale-110"
                      alt=""
                    />
                  </div>
                  <div className="absolute md:bottom-[-1rem] left-[50%] translate-x-[-50%] bottom-[-2.5rem] flex items-center justify-center w-[3rem] md:w-max ">
                    <h3
                      data-aos="fade-up"
                      data-aos-delay="1400"
                      className="text-white md:text-base text-[0.6rem] /absolute left-[-8%] /translate-x-[-50%] bottom-[-1rem] text-center  w-[10rem] /w-max"
                      style={{ fontFamily: "rubik" }}
                    >
                      Select your travel plan and period
                    </h3>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="3000"
                  className="flex flex-col gap-[1rem] relative w-[8rem] justify-between h-full"
                >
                  <div className="flex justify-center items-center w-[3rem] md:w-[8rem]">
                    <h3
                      data-aos="fade-down"
                      data-aos-delay="3100"
                      className="text-green-500 tracking-wider text-center md:text-base text-[0.6rem]"
                      style={{ fontFamily: "poppins" }}
                    >
                      Step 3
                    </h3>
                  </div>
                  <div className="absolute top-1/2 translate-y-[-50%] bg-green-500 w-[3rem] h-[3rem] md:w-[8rem] md:h-[8rem] rounded-full ">
                    <img
                      src="/images/step-3_flowchart.png"
                      className="scale-110"
                      alt=""
                    />
                  </div>
                  <div className="absolute md:bottom-0 left-[50%] translate-x-[-50%] bottom-[-0.7rem] flex items-center justify-center w-[3rem] md:w-max ">
                    <h3
                      data-aos="fade-up"
                      data-aos-delay="3100"
                      className="text-white md:text-base text-[0.6rem] /absolute left-[8%] /translate-x-[-50%] bottom-0 text-center w-max"
                      style={{ fontFamily: "rubik" }}
                    >
                      Effect payment
                    </h3>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="4000"
                  className="flex flex-col gap-[1rem] relative w-[8rem] justify-between h-full"
                >
                  <div className="flex justify-center items-center w-[3rem] md:w-[8rem]">
                    <h3
                      data-aos="fade-down"
                      data-aos-delay="4100"
                      className="text-green-500 tracking-wider text-center md:text-base text-[0.6rem]"
                      style={{ fontFamily: "poppins" }}
                    >
                      Step 4
                    </h3>
                  </div>
                  <div className="absolute top-1/2 translate-y-[-50%] bg-green-500 w-[3rem] h-[3rem] md:w-[8rem] md:h-[8rem] rounded-full ">
                    <img
                      src="/images/step-4_flowchart.png"
                      className="scale-110"
                      alt=""
                    />
                  </div>
                  <div className="absolute md:bottom-[-1rem] left-[50%] translate-x-[-50%] bottom-[-3.5rem] flex items-center justify-center w-[3rem] md:w-[12rem] ">
                    <h3
                      data-aos="fade-up"
                      data-aos-delay="4100"
                      className="text-white md:text-base text-[0.6rem] /absolute left-[8%] /translate-x-[-50%] bottom-[-2rem]  text-center "
                      style={{ fontFamily: "rubik" }}
                    >
                      Get Your Tickets/Reciepts
                    </h3>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="6000"
                  className="flex flex-col gap-[1rem] relative w-[8rem] justify-between h-full"
                >
                  <div className="flex justify-center items-center w-[3rem] md:w-[8rem]">
                    <h3
                      data-aos="fade-down"
                      data-aos-delay="6100"
                      className="text-green-500 tracking-wider text-center md:text-base text-[0.6rem]"
                      style={{ fontFamily: "poppins" }}
                    >
                      Step 5
                    </h3>
                  </div>
                  <div className="absolute top-1/2 translate-y-[-50%] bg-green-500 w-[3rem] h-[3rem] md:w-[8rem] md:h-[8rem] rounded-full ">
                    <img
                      src="/images/step-5_flowchart.png"
                      className="scale-110"
                      alt=""
                    />
                  </div>
                  <div className="absolute md:bottom-[-1rem] left-[50%] translate-x-[-50%] bottom-[-3.5rem] flex items-center justify-center w-[3rem] md:w-max ">
                    <h3
                      data-aos="fade-up"
                      data-aos-delay="6100"
                      className="text-white md:text-base text-[0.6rem] /absolute left-[-8%] /translate-x-[-50%] bottom-[-1rem] text-center  w-[3rem] md:w-[11rem]"
                      style={{ fontFamily: "rubik" }}
                    >
                      Done! Enjoy your Trip!
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="block bg-black w-full h-[2.5rem] md:h-[1.5rem]" />
          </div>
          <div className="md:px-[10rem] mb-[2rem] text-white my-[1rem]  md:min-h-[95vh] gap-[1rem] md:gap-[2rem] flex flex-col items-center justify-center">
            <h3
              className="text-black text-xl md:text-4xl"
              style={{ fontFamily: "staatliches" }}
            >
              Explore the World, One Destination at a Time!
            </h3>
            <div>
              <div className="w-[95vw] md:w-[70vw] h-[110vh] md:h-[30rem] /md:my-[10rem] /px-[1rem] allimagesGrid">
                {allCities.map((el, index) => (
                  <div
                    key={index}
                    style={{
                      "grid-area": el.class,
                    }}
                    onClick={() => {
                      console.log(el);
                      router.push({
                        pathname: "/Place",
                        query: { place_id: el.place_id },
                      });
                      // window.open(el.url);
                    }}
                    className="customgrid-layout1 group w-full min-h-[10rem] relative overflow-hidden rounded-xl cursor-pointer"
                  >
                    <img
                      className="rounded-xl object-cover group-hover:scale-[1.1] group-hover:blur-[0.6px] group-hover:brightness-[0.70] blur-0 transition-all duration-300 w-full h-full brightness-[0.75]"
                      src={
                        "/api/location/getImage?refrence=" +
                        el.photos[Math.floor(Math.random() * el.photos.length)]
                          .photo_reference
                      }
                      alt=""
                      loading="lazy"
                    />
                    <h3
                      className="absolute top-[50%] text-xl left-[50%] translate-x-[-50%] translate-y-[-50%] w-max"
                      style={{ fontFamily: "rubik" }}
                    >
                      {el.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="flex md:flex-row flex-col gap-[1rem] md:gap-[2rem]">
              <MiniSquareimgBlock
                img="full-newyork"
                title="New York"
                desc="New York: Iconic city in the USA. Skyscrapers, bustling
                    streets, diverse culture. Times Square, Central Park, Statue
                    of Liberty. Global finance, fashion, art hub."
              />
              <MiniSquareimgBlock
                img="full-saopablo"
                title="São Paulo"
                desc="São Paulo is a dynamic and diverse city in Brazil, known as the financial and cultural capital. São Paulo is a melting pot of cultures, attracting immigrants from around the world. "
              />
            </div>
            <div className="flex md:flex-row flex-col gap-[1rem] md:gap-[2rem]">
              <MiniSquareimgBlock
                img="full-dubai"
                title="Dubai"
                desc="Dubai is a cosmopolitan city in the United Arab Emirates known for its modern architecture. It is famous for its iconic landmarks such as the Burj Khalifa and Burj Al Arab."
              />

              <MiniSquareimgBlock
                img="full-lisbon"
                title="Lisbon"
                desc="Lisbon, historical landmarks, and vibrant culture. stunning viewpoints, and a thriving food scene, Lisbon offers a delightful blend of old-world charm and modern vitality."
              />
            </div> */}
          </div>
          <div className="md:px-[10rem] rounded-lg text-white py-[2rem] items-center justify-center">
            <OwlCarouse
              id="customer-testimonoals"
              className="owl-carousel owl-theme"
              {...options}
            >
              <div className="">
                <img
                  className="rounded-lg"
                  src="/images/banner-dubai.jpg"
                  alt=""
                />
              </div>
              <div className="">
                <img
                  className="rounded-lg"
                  src="/images/banner-lisbon.png"
                  alt=""
                />
              </div>
              <div className="">
                <img
                  className="rounded-lg"
                  src="/images/banner-newyork.png"
                  alt=""
                />
              </div>
            </OwlCarouse>
          </div>
          <div className="md:px-[15rem] mt-[3rem] bg-[#2e343d] flex flex-col gap-[2rem]">
            <div className="translate-y-[-3rem] mb-[-3rem] md:px-0 px-[1.5rem]">
              <div
                style={{ boxShadow: "0 0 50px 0 rgba(0,0,0,0.14)" }}
                className="p-[2rem] md:gap-0 gap-[2rem] md:p-[3rem] bg-white  md:h-[25rem] drop-shadow-2xl rounded-xl flex md:flex-row flex-col justify-between items-start"
              >
                <div
                  className="flex flex-col gap-[1rem] text-sm"
                  style={{ fontFamily: "rubik" }}
                >
                  <h3 className="font-semibold">ABOUT TRAVERSE</h3>
                  <button
                    className="flex items-green-500 tracking-wider text-slate-500 hover:text-blue-600 hover:underline"
                    style={{ fontFamily: "poppins" }}
                  >
                    ABOUT US
                  </button>
                  <button
                    className="flex items-start text-slate-500 hover:text-blue-600 hover:underline"
                    style={{ fontFamily: "poppins" }}
                  >
                    TRAVERSE REVIEWS
                  </button>
                  <button
                    className="flex items-start text-slate-500 hover:text-blue-600 hover:underline"
                    style={{ fontFamily: "poppins" }}
                  >
                    TERMS & CONDITIONS
                  </button>
                  <button
                    className="flex items-start text-slate-500 hover:text-blue-600 hover:underline"
                    style={{ fontFamily: "poppins" }}
                  >
                    PRIVACY POLICIES
                  </button>
                  <button
                    className="flex items-start text-slate-500 hover:text-blue-600 hover:underline"
                    style={{ fontFamily: "poppins" }}
                  >
                    COPYRIGHT POLICIES
                  </button>
                  <button
                    className="flex items-start text-slate-500 hover:text-blue-600 hover:underline"
                    style={{ fontFamily: "poppins" }}
                  >
                    SUPPORT
                  </button>
                </div>
                <div className="flex gap-[1rem] flex-col  items-start">
                  <h3 className="font-semibold" style={{ fontFamily: "rubik" }}>
                    TRAVEL DESTINATIONS
                  </h3>
                  <div className="grid grid-cols-3 gap-[1rem]">
                    {allCities.map((el, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          router.push({
                            pathname: "/Place",
                            query: { place_id: el.place_id },
                          });
                          // window.open(el.url);
                        }}
                        className="group overflow-hidden relative rounded-lg"
                      >
                        <h3 className="absolute text-white  z-[1] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                          {el.name}
                        </h3>
                        <img
                          className="w-[8rem] object-cover group-hover:scale-[1.10] brightness-[0.60] rounded-lg h-[6rem] translate-all duration-300"
                          src={
                            "/api/location/getImage?refrence=" +
                            el.photos[
                              Math.floor(Math.random() * el.photos.length)
                            ].photo_reference
                          }
                          alt=""
                          loading="lazy"
                        />
                      </button>
                    ))}

                    {/* <button className="group overflow-hidden relative rounded-lg">
                      <h3 className="absolute text-white  z-[1] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        Lisbon
                      </h3>
                      <img
                        className="w-[8rem] object-cover group-hover:scale-[1.10] brightness-[0.60] rounded-lg h-[6rem] translate-all duration-300"
                        src="/images/full-lisbon.jpg"
                        alt=""
                      />
                    </button>
                    <button className="group overflow-hidden relative rounded-lg">
                      <h3 className="absolute text-white  z-[1] top-[50%] left-[40%] translate-x-[-32%] translate-y-[-50%]">
                        São Paulo
                      </h3>
                      <img
                        className="w-[8rem] object-cover group-hover:scale-[1.10] brightness-[0.60] rounded-lg h-[6rem] translate-all duration-300"
                        src="/images/full-saopablo.jpg"
                        alt=""
                      />
                    </button>
                    <button className="group overflow-hidden relative rounded-lg">
                      <h3 className="absolute text-white  z-[1] top-[50%] left-[40%] translate-x-[-32%] translate-y-[-50%]">
                        New York
                      </h3>
                      <img
                        className="w-[8rem] object-cover group-hover:scale-[1.10] brightness-[0.60] rounded-lg h-[6rem] translate-all duration-300"
                        src="/images/full-newyork.jpg"
                        alt=""
                      />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex my-[1rem] gap-[1rem] items-center w-full justify-center">
              <div className="h-[3px] bg-white rounded-xl block w-[42%]" />
              <h3
                className="text-3xl text-white"
                style={{ fontFamily: "staatliches" }}
              >
                TRAVERSE
              </h3>
              <div className="h-[3px] bg-white rounded-xl block w-[42%]" />
            </div>
            <div className="w-full flex justify-center items-center gap-[2rem] mb-[3rem]">
              <button
                onClick={() => {
                  router.push("https://sam.appambient.com");
                }}
                className="p-2 flex justify-center items-center bg-[#b7b7b7] rounded-full"
              >
                <i class="fi fi-brands-facebook flex items-center"></i>
              </button>
              <button
                onClick={() => {
                  router.push("https://sam.appambient.com");
                }}
                className="p-2 flex justify-center items-center bg-[#b7b7b7] rounded-full"
              >
                <i class="fi fi-brands-instagram flex items-center"></i>
              </button>
              <button
                onClick={() => {
                  router.push("https://sam.appambient.com");
                }}
                className="p-2 flex justify-center items-center bg-[#b7b7b7] rounded-full"
              >
                <i class="fi fi-brands-twitter flex items-center"></i>
              </button>
              <button
                onClick={() => {
                  router.push("https://sam.appambient.com");
                }}
                className="p-2 flex justify-center items-center bg-[#b7b7b7] rounded-full"
              >
                <i class="fi fi-brands-linkedin flex items-center"></i>
              </button>
              <button
                onClick={() => {
                  router.push("https://sam.appambient.com");
                }}
                className="p-2 flex justify-center items-center bg-[#b7b7b7] rounded-full"
              >
                <i class="fi fi-brands-youtube flex items-center"></i>
              </button>
            </div>
            <div className="flex flex-col text-white justify-center items-center gap-[1rem] mb-[8rem]">
              <h3 className="text-[#b7b7b7]">{`© 2023 TRAVERSE.net All rights reserved.`}</h3>
              <h3 className="text-center text-xs md:px-0 px-[0.2rem] md:text-sm text-slate-400">{`The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.`}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async (req, res) => {
  const protocol =
    req.req.headers["x-forwarded-proto"] ||
    (req.req.connection.encrypted ? "https" : "http");
  var url = protocol + "://" + req.req.headers.host;
  var { data: axres } = await axios.get(
    url + "/api/location/getRandomCity?limit=6"
  );
  return {
    props: {
      allCities: axres.data.map((el, index) => ({
        ...el,
        class: "customgrid-layout" + (index + 1),
      })),
    },
  };
};
