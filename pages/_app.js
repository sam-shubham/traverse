import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/AuthContext";
import "@/styles/globals.css";
import "@/styles/textScroll_anim.css";
import "@/styles/login-signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init();
  }, []);

  const [ChatBotOpen, setChatBotOpen] = useState(false);
  const [Messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello!! I'm Traverse AI, I can Help you with any queries regarding Trips and Travels.",
    },
  ]);

  const [UserInput, setUserInput] = useState("");

  async function sendMessage() {
    let newMsg = [
      ...Messages,
      {
        role: "user",
        content: UserInput,
      },
    ];

    setMessages(newMsg);

    setUserInput("");

    let { data } = await axios.post("/api/ai/getAnswer", {
      messages: newMsg,
    });

    if (data.success) {
      setMessages([...newMsg, { ...data.message }]);
      if (!ChatBotOpen) {
        setChatBotOpen(true);
      }
    }
  }

  return (
    <div className="relative">
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Navbar />
        <Component {...pageProps} />
        {!ChatBotOpen ? (
          <div
            style={{ zIndex: 7 }}
            onClick={() => {
              if (!ChatBotOpen) {
                setChatBotOpen(true);
              }
            }}
            className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-green-500 to-green-700 fixed bottom-8 right-8 p-[20px] drop-shadow-2xl cursor-pointer"
          >
            <img
              className="w-full h-full"
              src="https://cdn-icons-png.flaticon.com/512/6873/6873405.png"
            />
          </div>
        ) : (
          <div
            style={{ zIndex: 999999 }}
            className="w-[400px] flex flex-col h-[80vh] rounded-xl drop-shadow-xl bg-blue-100 fixed bottom-8 right-8 overflow-hidden drop-shadow-2xl cursor-pointer"
          >
            <div className="w-full relative flex gap-x-4 flex-row items-center bg-blue-300 py-3 px-4">
              <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-green-500 to-green-700  p-[12px] drop-shadow-2xl cursor-pointer">
                <img
                  className="w-full h-full"
                  src="https://cdn-icons-png.flaticon.com/512/6873/6873405.png"
                />
              </div>
              <label className="font-bold text-lg">TRAVERSE AI</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="absolute  top-5 right-5 transition-all duration-300 hover:scale-105 cursor-pointer"
                viewBox="0 0 16 16"
                onClick={() => {
                  if (ChatBotOpen) {
                    setChatBotOpen(false);
                  }
                }}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </div>
            <div className="w-full flex flex-1 flex-col overflow-y-scroll pt-8 gap-y-2 pb-3">
              {Messages.map((msg) => (
                <div
                  key={Math.random()}
                  style={{
                    justifyContent: msg.role == "user" ? "end" : "start",
                  }}
                  className="w-full flex flex-row px-5"
                >
                  <div
                    style={{
                      backgroundColor:
                        msg.role == "user" ? "lightgreen" : "white",
                    }}
                    className="rounded-md drop-shadow-sm bg-white px-3 py-2 min-w-[50px] max-w-[70%]"
                  >
                    <label>{msg.content}</label>
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="w-full h-[80px]  bg-white flex flex-row items-center justify-evenly"
            >
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  borderWidth: 1,
                }}
                className="w-[75%] h-[70%] focus:outline-none rounded-full"
              >
                <input
                  placeholder="Ask Me..."
                  className="pl-5 pr-2 bg-transparent w-full h-full focus:outline-none"
                  onChange={(e) => {
                    setUserInput(e.target.value);
                  }}
                  value={UserInput}
                />
              </div>
              <button
                formAction="submit"
                className="aspect-square flex h-[70%] rounded-full bg-green-600 p-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="white"
                  className="rotate-[44deg] -translate-x-[1px]"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </AuthProvider>
    </div>
  );
}
