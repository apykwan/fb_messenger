'use client';

import { useRef, useState, type FormEvent } from 'react';
import useSWR from 'swr';
import { v4 as uuid } from 'uuid';
import { useSession} from 'next-auth/react';

import fetcher from '@/utils/fetchMessages';
import { type MessageType } from '@/types';

function ChatInput() {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { data: messages, mutate } = useSWR('/api/getMessages', fetcher); 
  const { data: session } = useSession();

  function handleChange() {
    if (chatInputRef.current) {
      setIsButtonDisabled(!chatInputRef.current.value);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user?.name) return;
    if (!chatInputRef.current?.value) return;
    
    if (chatInputRef.current) {
      const message: MessageType = {
        id: uuid(),
        message: chatInputRef.current.value,
        created_at: Date.now(),
        username: session?.user?.name,
        profilePic: session?.user?.image || '', 
        email: session?.user?.email || ''
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
        disabled={!session}
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