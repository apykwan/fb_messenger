import MessageList from '@/components/messageList';
import ChatInput from '@/components/chatInput';
import { type MessageType } from '@/types';

export default async function Home() {
  let messages: MessageType[] = [];
  try {
    const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`);

    if (!res.ok) {
      throw new Error('Failed to fetch messages');
    }
    
    messages = await res.json();
  } catch (error) {
    console.log('Fetching error: ', error);
  }

  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  );
}
