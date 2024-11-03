'use client';

import { useEffect } from 'react';
import useSWR from 'swr';

import MessageCard from './messageCard';
import fetcher from '@/utils/fetchMessages';
import { clientPusher } from '@/utils/pusherClient';
import { type MessageType } from '@/types';

function MessageList() {
  const { data: messages = [], mutate } = useSWR<MessageType[]>('/api/getMessages', fetcher);
  
  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data: MessageType) => {
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true
        });
      }
    });
  }, [mutate, messages]);
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