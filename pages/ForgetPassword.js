import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  var router = useRouter();
  useEffect(() => {
    if (!new URL(document.URL).searchParams.get("userToken")) {
      router.push({ pathname: "/" });
    }
  }, []);

  return (
    <div className=" h-[99.7vh] w-full grid place-items-center">
      <div
        style={{
          "background-color": "#fff",
          "border-radius": "10px",
          "box-shadow":
            "0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22)",
          position: "relative",
          overflow: "hidden",
          width: "608px",
          "max-width": "100%",
          height: "400px",
        }}
        className="flex items-center justify-center"
      >
        <form
          onSubmit={async (formel) => {
            formel.preventDefault();
            var { data: axres } = await axios.post("/api/auth/forgetpass", {
              userToken: new URL(document.URL).searchParams.get("userToken"),
              newPassword: formel.target.password.value,
            });
            if (axres.success) {
              router.push({ pathname: "/Login" });
              toast.success(axres.data);
            } else {
              toast.error(axres.data);
            }
          }}
          className="flex flex-col h-full w-full px-[10rem] items-center justify-between py-[5rem] gap-[1rem]"
        >
          <h3 className="text-2xl font-semibold">Reset Your Password!</h3>
          <div className="flex w-full flex-col items-start gap-[0.5rem]">
            <h3>Enter New Password</h3>
            <input
              type="password"
              required
              className="w-full rounded-md p-4 text-md bg-slate-100"
              placeholder="Enter a Secured Password"
              name="password"
            />
          </div>
          <button className="p-[10px] bg-black text-white w-full rounded-xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
