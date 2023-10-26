import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// import { Fireworks } from "fireworks/lib/react";
import QRCode from "react-qr-code";
import { CSSProperties } from "react";
import { Fireworks, useFireworks } from "fireworks-js/dist/react";

const PaymentComplete = () => {
  var router = useRouter();
  const style = {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "fixed",
    background: "#fff",
  };
  const { enabled, options, setEnabled, setOptions } = useFireworks({
    initialStart: true,
    initialOptions: {
      hue: {
        min: 0,
        max: 345,
      },
      delay: {
        min: 15,
        max: 15,
      },
      rocketsPoint: 50,
      speed: 10,
      acceleration: 1.2,
      friction: 0.96,
      gravity: 1,
      particles: 90,
      trace: 3,
      explosion: 6,
      autoresize: true,
      brightness: {
        min: 50,
        max: 80,
        decay: {
          min: 0.015,
          max: 0.03,
        },
      },
      boundaries: {
        visible: false,
      },
      sound: {
        enabled: false,
        files: [
          "https://fireworks.js.org/sounds/explosion0.mp3",
          "https://fireworks.js.org/sounds/explosion1.mp3",
          "https://fireworks.js.org/sounds/explosion2.mp3",
        ],
        volume: {
          min: 1,
          max: 2,
        },
      },
      mouse: {
        click: true,
        move: false,
        max: 1,
      },
    },
  });

  const [PaymentDetails, setPaymentDetails] = useState({
    link: "",
    // number: "",
    receipt: "",
  });
  useEffect(() => {
    (async () => {
      var axres = await axios
        .post("/api/retrivePayment", {
          intent: new URL(document.URL).searchParams.get("payment_intent"),
        })
        .then((d) => d.data);
      setPaymentDetails(axres);
    })();
  }, []);

  return PaymentDetails.link ? (
    <>
      <Fireworks style={style} enabled={enabled} options={options}></Fireworks>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div>
          <div className="absolute z-[999] md:w-[40rem] w-[100vw]  left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] ">
            <div className="flex flex-col min-h-[30rem]  backdrop-blur-sm  items-start gap-[2rem] border-2 border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.07)] p-3 rounded-md">
              <div
                className="text-5xl mt-[2rem] w-full /mb-[10%] tracking-widest px-1 flex items-center justify-center"
                style={{ fontFamily: "Staatliches" }}
              >
                <h3>Payment Confirmed</h3>
              </div>
              <div
                className="text-xl w-full grid place-items-center"
                style={{ fontFamily: "poppins" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="150"
                  height="150"
                  fill="green"
                  class="mb-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <h3 className="mb-[1rem]">Booking Confirmed</h3>
                {/* <QRCode value={PaymentDetails.link} /> */}
              </div>
              <div className="flex flex-col gap-[0.4rem]  ">
                <h3 style={{ fontFamily: "ubuntu" }}>
                  {`Check Your Recipt At :-`}
                </h3>
                <a
                  href={PaymentDetails.receipt}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {PaymentDetails.receipt.substring(0, 50) + "..."}
                </a>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div
      className="w-[100vw] h-[100vh] flex items-center justify-center text-4xl"
      style={{ fontFamily: "Staatliches" }}
    >
      Waiting...
    </div>
  );
};

export default PaymentComplete;
