import React from "react";

const MiniSquareimgBlock = ({ img, title, desc }) => {
  return (
    <button
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}
      className=" relative rounded-lg overflow-hidden group w-[20rem] md:w-[25rem] h-full"
    >
      <img
        className="w-full h-full object-cover rounded-lg brightness-[0.60] saturate-50 group-hover:brightness-[0.80] group-hover:saturate-100  group-hover:scale-[1.10] transition-all duration-300"
        src={`/images/${img}.jpg`}
        alt=""
      />
      <div className="absolute bottom-[1rem] left-[1rem] justify-start items-start flex flex-col gap-[0.5rem]">
        <h3 className="text-2xl" style={{ fontFamily: "kanit" }}>
          {title}
        </h3>
        <div className="h-[3px] bg-orange-500 rounded-xl block w-[6rem]" />
        <h3 className="text-xs text-start" style={{ fontFamily: "poppins" }}>
          {desc}
        </h3>
      </div>
    </button>
  );
};

export default MiniSquareimgBlock;
