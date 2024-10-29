'use client';

import { useRef, useState, type FormEvent } from 'react';

function ChatInput() {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  function handleChange() {
    if (chatInputRef.current) {
      setIsButtonDisabled(!chatInputRef.current.value);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (chatInputRef.current) {
      console.log(chatInputRef.current.value);

      chatInputRef.current.value = "";
      setIsButtonDisabled(true);
    }
  }
  
  return (
    <form 
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 borer-top border-gray-100"
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        ref={chatInputRef}
        onChange={handleChange}
      />
      <button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isButtonDisabled}
      >
        Send
      </button>
    </form>
  );

}

export default ChatInput;