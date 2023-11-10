import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [inputMsg, setinputMsg] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const url = "http://localhost:9000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(url, { message: inputMsg });

      const newTabConversation = [...conversation];

      // Use inputMsg and data.message directly
      if (inputMsg) {
        newTabConversation.push({ userMessage: inputMsg });
      }
      if (data.message) {
        newTabConversation.push({ botMessage: data.message });
      }

      setConversation(newTabConversation);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-2 rounded-md border-cyan-800 p-4 w-[90%] md:w-[75%] lg:w-[50%] h-[90%] md:h-[75%] lg:h-[50%] flex flex-col">
        <div className="border-4 rounded-md border-red-600 justify-between p-4 h-full overflow-y-scroll">
          {conversation.map((message, index) => (
            <div>
              {message.userMessage && (
                <div key={index} className="chat chat-end">
                  <div className="chat-bubble chat-bubble-info">
                    {message.userMessage}
                  </div>
                </div>
              )}
              {message.botMessage && (
                <div key={index} className="chat chat-start">
                  <div className="chat-bubble chat-bubble-accent">
                    {message.botMessage}
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* <div className="chat chat-start">
            {botMessage && (
              <div className="chat-bubble chat-bubble-accent">{botMessage}</div>
            )}
          </div> */}
        </div>
        <form onSubmit={handleSubmit} className="space-x-4 p-4">
          <input
            type="text"
            className="w-full md:w-[80%]"
            placeholder="Enter your message ..."
            value={inputMsg}
            onChange={(e) => setinputMsg(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-blue-700 rounded-md w-full md:w-[15%] text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
