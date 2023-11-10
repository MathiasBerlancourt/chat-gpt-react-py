import { useState } from "react";
import axios from "axios";

const useGetAnswers = () => {
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

  return {
    handleSubmit,
    handleKeyDown,
    conversation,
    inputMsg,
    setinputMsg,
    isLoading,
  };
};

export default useGetAnswers;
