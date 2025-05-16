import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Smile, Plus, Send } from "lucide-react";
import { connect } from "react-redux";

const ChatInput = ({scroll,sendMessage,message,setMessage,messages}) => {
 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const sendMessageHandler = () => {
    if (message.trim() && !messages.messageSending) {
      sendMessage();
   // Close emoji picker after sending message
    }
  }

  

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px"; // Reset height
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        100
      )}px`; // Max height: 100px (around 3 lines)
    }
  }, [message]);

  return (
    <div className="relative w-full p-2 bg-[#333] rounded-lg flex items-center gap-3">
      {/* Emoji Picker Button */}
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-white cursor-pointer">
        <Smile size={24} />
      </button>

      {/* Emoji Picker Dropdown */}
      {showEmojiPicker && (

        <>
        <div
            className="absolute w-[100vw] h-[100vh] opacity-0 z-1 bg-black"
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(false);
            }}
          ></div>
        <div className="absolute bottom-12 left-0 z-15">
          
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
        </>
      )}

      {/* Chat Input */}
      <textarea
        ref={textareaRef}
        placeholder="Start typing..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none resize-none overflow-hidden max-h-[100px] scrollbar-hide leading-[1.2] min-h-[40px] py-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents new line
            sendMessageHandler(); // Call send message function
          }
        }}
      />

      {/* Add Button */}
    

      {/* Send Button */}
      <button onClick={sendMessageHandler} className="text-blue-500 cursor-pointer">
        <Send size={24} />
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    messages: state.message,
  
  };
}


export default connect(mapStateToProps)(ChatInput);
