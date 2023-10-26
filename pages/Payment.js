import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const Payment = () => {
  var router = useRouter();
  const [Payment, setPayment] = useState("");
  const [curruserNumber, setcurruserNumber] = useState("");
  const [PaymentCurrency, setPaymentCurrency] = useState("");
  const [clientSecret, setClientSecret] = React.useState("");
  const [cusOptions, setcusOptions] = useState({});
  const [usrNotFound, setusrNotFound] = useState(false);
  React.useEffect(() => {
    var number = atob(new URL(document.URL).searchParams.get("number"));
    setcurruserNumber(number);
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          // setusrNotFound(true);
          alert(data.msg);
          router.push("/Login");
          return;
        }
        setPaymentCurrency(data.currency);
        setPayment(data.PaymentMoney);
        setcusOptions(data.customerOptions);
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="h-[100vh] flex justify-center items-center bg-slate-200">
      {usrNotFound && (
        <div className="w-[100vw] h-[100vh] bg-black">
          <div className=""></div>
          <div className="absolute md:w-auto w-[100vw]  left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] ">
            <div className="flex flex-col min-h-[30rem]  items-start gap-[1rem] border-2 border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] p-3 rounded-md">
              <div
                className="text-2xl mt-[2rem] mb-[20%] px-1"
                style={{ fontFamily: "kanit" }}
              >
                <h3>User Not Found On Our Database</h3>
              </div>
              <div className="flex flex-col gap-[0.4rem] w-full">
                <h3 style={{ fontFamily: "ubuntu" }}>
                  {`Message Us From ` + curruserNumber + " To Get Started."}
                </h3>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            appearance,
            customerOptions: { ...cusOptions },
          }}
          stripe={stripePromise}
        >
          <CheckoutForm
            Payment={
              (PaymentCurrency == "inr"
                ? "₹"
                : PaymentCurrency == "usd"
                ? "$"
                : PaymentCurrency) +
              " " +
              Payment
            }
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
