import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/AuthContext";

const Login = () => {
  var router = useRouter();
  var { Auth, updateAuth } = useAuth();
  const [signinstage, setsigninstage] = useState(true);
  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }, []);
  const notify = (text) => toast(text);

  var signupSubmit = async (data) => {
    try {
      var dat = await axios.post("/api/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (dat.data.success) {
        toast.success("Account Created");
        // localStorage.setItem("token", dat.data?.msg);
        updateAuth({
          type: "SIGN_IN",
          token: dat.data?.msg,
          // user: data.user,
        });
        router.push("/");
        // user.saveuserinfo();
      } else {
        toast.error(dat.data.msg);
      }
    } catch (error) {
      toast.error("error");
      // alert(JSON.stringify(error.response.data));
    }
  };
  var loginSubmit = async (data) => {
    try {
      var dat = await axios.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });
      if (dat.data.success) {
        toast.success("Login Successfully");
        updateAuth({
          type: "SIGN_IN",
          token: dat.data?.msg,
          // user: data.user,
        });
        // localStorage.setItem("token", dat.data?.msg);
        // user.saveuserinfo();
        // setTimeout(() => {
        router.push("/");
        // }, 1000);
      } else {
        toast.error(dat.data?.msg);
      }
      //   if (dat.data?.success.includes("successfully")) {
      //     console.log(dat.data?.token);
      //     // localStorage.removeItem("userToken");
      //   }
    } catch (error) {
      toast.error("error");
      // alert(JSON.stringify(error.response.data));
    }
  };
  var getformInputs = (callback, el) => {
    var formOBJ = {};
    el.currentTarget
      .querySelectorAll("input")
      .forEach((el2) => (formOBJ[el2.name] = el2.value));
    return callback(formOBJ);
  };

  return (
    <div className="/w-[100vw] h-[100vh] /h-[100vh] flex flex-col justify-center items-center">
      <div
        className={`mt-[4rem] container ${
          signinstage ? "" : "right-panel-active"
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form
            className="login-signupform"
            onSubmit={(el) => {
              el.preventDefault();
              if (el.target.cnfPassword.value != el.target.password.value) {
                return alert("Please Double Check Your Given Password!");
              }
              getformInputs(signupSubmit, el);
            }}
          >
            <h1 className="text-3xl" style={{ fontFamily: "Staatliches" }}>
              Create Account
            </h1>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            <span>Use your email for registration</span>
            <input
              className="login-signup-input"
              type="text"
              placeholder="Name"
              name="name"
            />
            <input
              className="login-signup-input"
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              className="login-signup-input"
              type="password"
              placeholder="Password"
              name="password"
            />
            <input
              className="login-signup-input"
              type="password"
              placeholder="Confirm Password"
              name="cnfPassword"
            />
            <button className="btnlogin-signup">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form
            className="login-signupform"
            onSubmit={(el) => {
              el.preventDefault();
              getformInputs(loginSubmit, el);
            }}
          >
            <h1 className="text-3xl" style={{ fontFamily: "Staatliches" }}>
              Sign in
            </h1>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            <span>Use your account</span>
            <input
              className="login-signup-input"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <input
              className="login-signup-input"
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <button
              type="button"
              onClick={async (el) => {
                if (
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    el.currentTarget.parentElement.querySelector(
                      "input[name='email']"
                    ).value
                  )
                ) {
                  var toastid = toast.loading("Sending Email");
                  var { data: axres } = await axios.post(
                    "/api/auth/forgetpassSendEmail",
                    {
                      email: el.currentTarget.parentElement.querySelector(
                        "input[name='email']"
                      ).value,
                    }
                  );
                  if (axres.success) {
                    toast.update(toastid, {
                      render: axres.msg,
                      type: "success",
                      isLoading: false,
                    });
                  } else {
                    toast.update(toastid, {
                      render: axres.msg,
                      type: "error",
                      isLoading: false,
                    });
                  }
                } else {
                  toast.warn("Please Enter Your Email");
                }
              }}
            >
              Forgot your password?
            </button>

            <button className="btnlogin-signup">Sign In</button>
          </form>
        </div>
        <div className="overlay-container ">
          <div className="overlay">
            <div className="overlay-panel overlay-left flex flex-col gap-[1rem]">
              <h1 style={{ fontFamily: "Staatliches" }} className="text-4xl">
                Welcome Back!
              </h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="btnlogin-signup ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right flex flex-col gap-[1rem]">
              <h1 style={{ fontFamily: "Staatliches" }} className="text-4xl">
                Hello, Friend!
              </h1>
              <p>Enter your details and start journey with us</p>
              <button className="btnlogin-signup ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          if (signinstage) {
            e.currentTarget.innerHTML = "SIGN UP";
          } else {
            e.currentTarget.innerHTML = "SIGN IN";
          }
          setsigninstage(!signinstage);
        }}
        style={{ fontFamily: "rubik" }}
        className="text-lg md:hidden absolute bottom-[1rem] left-[50%] translate-x-[-50%] text-black z-[2]"
      >
        SIGN UP
      </button>
    </div>
  );
};

export default Login;
