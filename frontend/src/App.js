import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputMsg, setinputMsg] = useState("");
  const [conversation, setConversation] = useState([]);
  const url = "http://localhost:9000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(url, { message: inputMsg });

      const newTabConversation = [...conversation];

      if (inputMsg) {
        newTabConversation.push({ userMessage: inputMsg });
      }
      if (data.message) {
        newTabConversation.push({ botMessage: data.message });
      }

      setConversation(newTabConversation);

      // Clear the input after submission
      setinputMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    // Check if Enter key is pressed
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-2 rounded-md border-cyan-800 p-4 w-[90%] md:w-[75%] lg:w-[50%] h-[90%] md:h-[75%] lg:h-[50%] flex flex-col">
        <div className="justify-between p-4 h-full overflow-y-scroll">
          {conversation.map((message, index) => (
            <div key={index}>
              {message.userMessage && (
                <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-info">
                    {message.userMessage}
                  </div>
                </div>
              )}
              {message.botMessage && (
                <div className="chat chat-start">
                  <div className="chat-bubble chat-bubble-accent">
                    {message.botMessage}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-x-4 p-4">
          <input
            type="text"
            className="w-full md:w-[80%]"
            placeholder="Enter your message ..."
            value={inputMsg}
            onChange={(e) => setinputMsg(e.target.value)}
            onKeyDown={handleKeyDown}
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
