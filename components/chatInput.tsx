'use client';

import { useRef, useState, type FormEvent } from 'react';
import useSWR from 'swr';
import { v4 as uuid } from 'uuid';

import fetcher from '@/utils/fetchMessages';
import { type MessageType } from '@/types';

function ChatInput() {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { data: messages, mutate } = useSWR('/api/getMessages', fetcher); 

  function handleChange() {
    if (chatInputRef.current) {
      setIsButtonDisabled(!chatInputRef.current.value);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (chatInputRef.current) {
      const message: MessageType = {
        id: uuid(),
        message: chatInputRef.current.value,
        created_at: Date.now(),
        username: 'Yi-Long Ma',
        profilePic: 'https://images.unsplash.com/photo-1665392996412-f0f31b493972?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'       
      };

      try {
        const res = await fetch("/api/addMessage", {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
          },
          body: JSON.stringify({ message })
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        // Optimistic update
        await mutate(messages ?? [], {
          optimisticData: [...(messages ?? []), message],
          revalidate: true,
          rollbackOnError: true
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }

      chatInputRef.current.value = "";
      setIsButtonDisabled(true);
    }
  }
  return (
    <form 
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 borer-top border-gray-100 bg-white/30 backdrop-blur-md shadow-s"
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