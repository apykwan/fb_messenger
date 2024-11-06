'use client';

import { useEffect, useRef } from 'react';
import useSWR from 'swr';

import MessageCard from './messageCard';
import fetcher from '@/utils/fetchMessages';
import { clientPusher } from '@/utils/pusherClient';
import { type MessageType } from '@/types';

type MessageListProps = {
    initialMessages: MessageType [] | [];
}

function MessageList({ initialMessages }: MessageListProps) {
  const { data: messages = [], mutate } = useSWR<MessageType[]>('/api/getMessages', fetcher);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const displayMessages = initialMessages.length > 0
    ? initialMessages
    : messages;

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data: MessageType) => {
      // if you sent the message, no need to update cache
      if (messages?.find(msg => msg.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true
        });
      }
    });

    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [mutate, messages]);
  return (
    <section className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {displayMessages.map(msg => (
        <MessageCard key={msg.id} message={msg} />
      ))}
      <div ref={messageEndRef} />
    </section>
  );
}

export default MessageList;