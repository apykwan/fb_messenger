'use client';

import useSWR from 'swr';

import MessageCard from './messageCard';
import fetcher from '@/utils/fetchMessages';
import { type MessageType } from '@/types';

function MessageList() {
  const isUser = true;
  const { data: messages = [] } = useSWR<MessageType[]>('/api/getMessages', fetcher);
  console.log('Messages:', messages); // Debugging
  return (
    <section className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.length ? (
        messages.map(msg => (
          <MessageCard key={msg.id} message={msg} />
        ))
      ) : (
        <p>Loading messages...</p>
      )}
    </section>
  );
}

export default MessageList;