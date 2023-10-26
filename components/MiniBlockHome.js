import { useRouter } from "next/router";
import React from "react";

const MiniBlockHome = ({ images, title, place_id, url, city, mode }) => {
  var router = useRouter();
  return (
    <button
      onClick={() => {
        var obj = {};
        obj["place_id"] = place_id;
        var enabled = [
          "ChIJO_PkYRozGQ0R0DaQ5L3rAAQ",
          "ChIJ0WGkg4FEzpQRrlsz_whLqZs",
          "ChIJOwg_06VPwokRYv534QaPC8g",
          "ChIJRcbZaklDXz4RYlEphFBu5r0",
        ];
        // if (new URL(document.URL).searchParams.get("key")) {
        //   obj["key"] = new URL(document.URL).searchParams.get("key");
        //   router.push({ pathname: "/Place", query: obj });
        // } else {
        // if (enabled.includes(place_id)) {
        // console.log();
        if (place_id && mode != "name") {
          router.push({
            pathname: "/Place",
            query: { place_id: place_id },
          });
        } else {
          router.push({
            pathname: "/Place",
            query: { n: title, mode: "name" },
          });
        }
        // } else {
        //   window.open(url);
        // }
      }}
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
      }}
      className=" overflow-hidden group rounded-lg h-full w-[14rem] relative"
    >
      <img
        className="w-[14rem]  z-[-1] "
        src={`/images/white_travel_bg.png`}
        alt=""
      />
      <h3
        className="absolute top-[3rem] w-max text-3xl left-[50%] translate-x-[-50%]"
        style={{ fontFamily: "Berkshire Swash" }}
      >
        {title}
      </h3>
      <div
        className="absolute group-hover:top-[-8rem] top-[1rem] /top-[25%]   transition-all duration-500"
        alt=""
      >
        <div className="relative ">
          <div
            className="absolute block w-[14rem]  left-0 right-0 z-[0] translate-y-[-0.7rem] top-[5.67rem] bg-[#013647] h-[13.2rem]"
            style={{ "clip-path": "ellipse(69% 58% at 50% 59%)" }}
          />
          <img
            className="w-[14rem] object-cover h-[40rem] z-[1]"
            style={{ "clip-path": "circle(63.5% at 50% 63%)" }}
            src={
              typeof images != "string"
                ? "/api/location/getImage?refrence=" +
                  images[Math.floor(Math.random() * images.length)]
                    .photo_reference
                : images
            }
          />
        </div>
      </div>
    </button>
  );
  // return (
  //   <button
  //     onClick={() => {
  //       router.push({
  //         pathname: "/Place",
  //         query: {
  //           place_id:
  //             bg == "saopablo"
  //               ? "ChIJ0WGkg4FEzpQRrlsz_whLqZs"
  //               : bg == "newyork"
  //               ? "ChIJOwg_06VPwokRYv534QaPC8g"
  //               : "ChIJRcbZaklDXz4RYlEphFBu5r0",
  //         },
  //       });
  //     }}
  //     style={{
  //       boxShadow:
  //         "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
  //     }}
  //     className=" overflow-hidden group rounded-lg h-full w-[14rem] relative"
  //   >
  //     <img className="w-[14rem]  z-[-1] " src={`/images/bg-${bg}.png`} alt="" />
  //     <img
  //       className="absolute group-hover:top-[-3rem] top-[25%]  w-[14rem] transition-all duration-500"
  //       src={`/images/${bg}.png`}
  //       alt=""
  //     />
  //   </button>
  // );
};

export default MiniBlockHome;
