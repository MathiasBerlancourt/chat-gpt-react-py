import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputMsg, setinputMsg] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://127.0.0.1:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTabConversation = [...conversation, { userMessage: inputMsg }];
    setinputMsg("");
    try {
      setIsLoading(true);
      const { data } = await axios.post(url, { message: inputMsg });
      if (data.message) {
        newTabConversation.push({ botMessage: data.message });
      }
      setConversation(newTabConversation);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Check if Enter key is pressed
    if (e.key === "Enter" && inputMsg) {
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
            onChange={(e) => {
              if (e.target.value) {
                setinputMsg(e.target.value);
              } else {
                setinputMsg("");
              }
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            disabled={!inputMsg || isLoading}
            type="submit"
            className={`p-2 rounded-md w-full md:w-[15%] text-white ${
              inputMsg ? "bg-blue-700" : "bg-gray-200"
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
