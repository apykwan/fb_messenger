'use client';

import useSWR from 'swr';

import MessageCard from './messageCard';
import fetcher from '@/utils/fetchMessages';
import { type MessageType } from '@/types';

function MessageList() {
  const { data: messages, error, mutate } = useSWR<MessageType[]>('/api/getMessages', fetcher); 
  return (
    <section className="mb-24">
      {messages?.map(msg => (
        <MessageCard key={msg.id} message={msg} />
      ))}
    </section>
  );
}

export default MessageList;