import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Place = (props) => {
  var router = useRouter();
  const [overview, setoverview] = useState("");
  const [city_details, setcity_details] = useState([]);
  useEffect(() => {
    (async () => {
      //   if (!props?.city_details[0]) {
      var { data: axres } = await axios.post("/api/location/getCity", {
        place_id: new URL(document.URL).searchParams.get("place_id"),
        key: new URL(document.URL).searchParams.get("key") || null,
        mode: new URL(document.URL).searchParams.get("mode") || "pid",
        name: new URL(document.URL).searchParams.get("n") || "",
      });
      setcity_details({
        ...axres.data,
        desc: axres.desc,
      });
      //   }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setcity_details({});
      //   if (!props?.city_details[0]) {
      var { data: axres } = await axios.post("/api/location/getCity", {
        place_id: new URL(document.URL).searchParams.get("place_id"),
        key: new URL(document.URL).searchParams.get("key") || null,
      });
      setcity_details({
        ...axres.data,
        desc: axres.desc,
      });
      //   }
    })();
  }, [router.query]);

  useEffect(() => {
    if (!Object.keys(city_details)[0]) {
      return;
    }
    setoverview(city_details.desc[0].desc);
    // if (city_details.desc[0].at(-1) == ":") {
    //   setoverview(city_details.desc.splice(0, 2).join("\n"));
    // } else {
    //   if (city_details.desc[0].includes(".")) {
    //     setoverview(city_details.desc[0].split(".")[0] + ".");
    //   } else {
    //     setoverview(city_details.desc[0]);
    //   }
    // }
    // (async () => {
    //   var mainarroftxt = [];
    //   var currind = 0;
    //   var recfunc = (descarray) => {
    //     return new Promise((resolve, reject) => {
    //       if (descarray[currind].at(-1) == ":") {
    //         mainarroftxt.push(descarray[currind]);
    //         recfunc(descarray[currind + 1]);
    //       } else {
    //         resolve(mainarroftxt.join("\n"));
    //       }
    //     });
    //   };
    //   var alltext = await recfunc(city_details.desc);
    //   console.log(alltext);
    //   //   return alltext;
    // })();
  }, [city_details]);

  return (
    <div>
      {Object.keys(city_details)[0] ? (
        <div className="pt-[58.4px] md:pt-[74.4px] bg-slate-100 min-h-[100vh] w-full">
          <div className="w-full px-[1rem] md:px-[4rem] py-[2rem] flex flex-col gap-[1rem]">
            <h3
              className="text-2xl text-black font-semibold"
              style={{ fontFamily: "varela round" }}
            >
              {city_details.name +
                (city_details.name !==
                city_details.address_components.filter((el) =>
                  el.types.includes("country")
                )[0]?.long_name
                  ? city_details.address_components.filter((el) =>
                      el.types.includes("country")
                    )[0]?.long_name
                    ? " - " +
                      city_details.address_components.filter((el) =>
                        el.types.includes("country")
                      )[0]?.long_name
                    : ""
                  : "")}
            </h3>
            <div className="flex gap-[0.5rem]">
              <i class="fi fi-rr-marker flex items-center"></i>
              <h3 className="font-semibold" style={{ fontFamily: "rubik" }}>
                {(city_details.address_components.filter((el) =>
                  el.types.includes("administrative_area_level_1")
                )[0]?.long_name
                  ? city_details.address_components.filter((el) =>
                      el.types.includes("administrative_area_level_1")
                    )[0]?.long_name + ", "
                  : "") +
                  (city_details.address_components.filter((el) =>
                    el.types.includes("country")
                  )[0]?.long_name ||
                    city_details.address_components.filter((el) =>
                      el.types.includes("country")
                    )[0]?.name)}
              </h3>
            </div>
          </div>
          <div className="flex md:flex-row flex-col px-[1rem] md:px-[4rem] gap-[1rem] min-h-[55vh] md:h-[55vh] w-full">
            <div
              className="flex md:grid w-full md:w-[70%] grid-cols-1 grid-rows-1 md:grid-cols-4 md:grid-rows-2"
              style={{
                // gridTemplateColumns: "1fr,1fr,1fr,1fr",
                // gridTemplateRows: "1fr,1fr",
                gap: "20px 20px",
                gridTemplateAreas: `"griditem1 griditem1 griditem2 griditem3"
              "griditem1 griditem1 griditem4 griditem5"`,
              }}
            >
              <div
                className="min-h-[10rem] rounded-xl group overflow-hidden"
                style={{ gridArea: "griditem1" }}
              >
                <img
                  className="object-cover w-full h-full rounded-xl group-hover:brightness-90 group-hover:blur-[0.3px] group-hover:scale-110 transition-all duration-300"
                  src={
                    "/api/location/getImage?refrence=" +
                    (city_details.photos[0]?.photo_reference ||
                      city_details.photos[
                        Math.floor(Math.random() * city_details.photos.length)
                      ]?.photo_reference)
                  }
                  loading="lazy"
                  alt="image"
                ></img>
              </div>
              <div
                className="min-h-[10rem] rounded-xl md:block hidden overflow-hidden group"
                style={{ gridArea: "griditem2" }}
              >
                <img
                  className="object-cover w-full h-full rounded-xl group-hover:brightness-90 group-hover:blur-[0.3px] group-hover:scale-110 transition-all duration-300"
                  src={
                    "/api/location/getImage?refrence=" +
                    (city_details.photos[1]?.photo_reference ||
                      city_details.photos[
                        Math.floor(Math.random() * city_details.photos.length)
                      ]?.photo_reference)
                  }
                  loading="lazy"
                  alt="image"
                ></img>
              </div>
              <div
                className="min-h-[10rem] rounded-xl md:block hidden overflow-hidden group"
                style={{ gridArea: "griditem3" }}
              >
                <img
                  className="object-cover w-full h-full rounded-xl group-hover:brightness-90 group-hover:blur-[0.3px] group-hover:scale-110 transition-all duration-300"
                  src={
                    "/api/location/getImage?refrence=" +
                    (city_details.photos[2]?.photo_reference ||
                      city_details.photos[
                        Math.floor(Math.random() * city_details.photos.length)
                      ]?.photo_reference)
                  }
                  loading="lazy"
                  alt="image"
                ></img>
              </div>
              <div
                className="min-h-[10rem] rounded-xl overflow-hidden group md:block hidden"
                style={{ gridArea: "griditem4" }}
              >
                <img
                  className="object-cover w-full h-full rounded-xl group-hover:brightness-90 group-hover:blur-[0.3px] group-hover:scale-110 transition-all duration-300"
                  src={
                    "/api/location/getImage?refrence=" +
                    (city_details.photos[3]?.photo_reference ||
                      city_details.photos[
                        Math.floor(Math.random() * city_details.photos.length)
                      ]?.photo_reference)
                  }
                  loading="lazy"
                  alt="image"
                ></img>
              </div>
              <div
                className="min-h-[10rem] rounded-xl md:block hidden overflow-hidden group"
                style={{ gridArea: "griditem5" }}
              >
                <img
                  className="object-cover w-full h-full rounded-xl group-hover:brightness-90 group-hover:blur-[0.3px] group-hover:scale-110 transition-all duration-300"
                  src={
                    "/api/location/getImage?refrence=" +
                    (city_details.photos[4]?.photo_reference ||
                      city_details.photos[
                        Math.floor(Math.random() * city_details.photos.length)
                      ]?.photo_reference)
                  }
                  loading="lazy"
                  alt="image"
                ></img>
              </div>
            </div>
            <div className=" w-full md:w-[28%]">
              <div className="w-full relative p-4 bg-white rounded-xl border-2 border-[rgba(0,0,0,0.07)] min-h-full">
                <div className="absolute right-0 top-0 p-2 rounded-tr-xl rounded-bl-xl bg-blue-600 text-white">
                  <h3 style={{ fontFamily: "rubik" }}>POPULAR</h3>
                </div>
                <h3
                  className="font-semibold text-xl"
                  style={{ fontFamily: "rubik" }}
                >
                  {city_details.name}
                </h3>
                <div className="flex w-full justify-between py-[1rem]">
                  <h3 className="text-slate-400">
                    {city_details.address_components.filter((el) =>
                      el.types.includes("country")
                    )[0]?.long_name ||
                      city_details.address_components.filter((el) =>
                        el.types.includes("country")
                      )[0].name}
                  </h3>
                  <div className="flex w-min gap-[0.5rem]">
                    <i class="fi fi-sr-star flex items-center text-[#fece00]"></i>
                    <h3 style={{ fontFamily: "varela round" }}>5.0</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-[0.5rem] mt-[0.5rem]">
                  <h3 className="text-slate-400 text-sm">From</h3>
                  <div className="flex items-start gap-[0.2rem]">
                    <i className=" text-sm fi translate-y-[0.3rem] fi-rr-indian-rupee-sign flex items-center"></i>
                    <h3
                      className="text-5xl font-bold"
                      style={{ fontFamily: "varela round" }}
                    >
                      {`9999`}
                    </h3>
                    <h3 className="text-sm">INR</h3>
                  </div>
                </div>
                <div className="pb-[1rem] pt-[2rem]">
                  <button
                    onClick={() => {
                      router.push({ pathname: "/Payment" });
                    }}
                    className="w-full p-3 text-xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white text-center rounded-full"
                    style={{ fontFamily: "rubik" }}
                  >
                    Continue
                  </button>
                </div>
                <hr className="mb-[1rem]" />
                <div className="flex gap-[0rem]  flex-col">
                  <h3 className="text-slate-500">Overview:</h3>
                  <h3
                    className="text-xs"
                    style={{ whiteSpace: "break-spaces" }}
                  >
                    {overview.substr(0, 210)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[1rem] md:px-[4rem] py-[3rem]">
            <div className="flex flex-col gap-y-7">
              {city_details.desc
                .filter(
                  (el) =>
                    !el.title.toLowerCase().includes("see also") &&
                    !el.title.toLowerCase().includes("references") &&
                    !el.title.toLowerCase().includes("external links")
                )
                .map((el, index) => (
                  <div
                    className="cursor-pointer rounded-xl drop-shadow-xl bg-white  overflow-hidden /px-3 text-xl pb-7 transition-all duration-500 hover:scale-105 hover:-translate-y-[30px] "
                    key={Math.random() + index}
                  >
                    <h3
                      className="/text-base /md:text-xl w-full bg-gradient-to-r from-blue-400 to-blue-900 text-white mb-4 px-3 pt-4 pb-3 text-[35px]"
                      style={{ fontFamily: "rubik" }}
                    >
                      {el.title}
                    </h3>
                    <h3
                      className="bd:text-base text-gray-600 text-sm px-5"
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {el.desc?.trim()}
                    </h3>
                  </div>
                ))}
              {/* <h3
                className="text-base md:text-xl"
                style={{ fontFamily: "rubik" }}
              >
                {`Description:`}
              </h3>
              <h3
                className="bd:text-base text-sm"
                style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
              >
                city_details.desc.join("\n\n")
              </h3> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          role="status"
          className="w-full h-[100vh] flex items-center justify-center"
        >
          <svg
            aria-hidden="true"
            class="w-[4rem] h-[4rem] mr-2 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};
// export const getServerSideProps = async (req, res) => {
//   const protocol =
//     req.req.headers["x-forwarded-proto"] ||
//     (req.req.connection.encrypted ? "https" : "http");
//   var url = protocol + "://" + req.req.headers.host;
//   var place_id = new URL("https://example.com/" + req.req.url).searchParams.get(
//     "place_id"
//   );
//   try {
//     var { data: axres } = await axios.post(url + "/api/location/getCity", {
//       place_id,
//     });
//     return {
//       props: {
//         city_details: { ...axres.data, desc: axres.desc },
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         city_details: {},
//       },
//     };
//   }
// };
export default Place;
