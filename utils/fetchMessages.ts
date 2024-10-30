import { type MessageType } from '@/types';

async function fetcher(): Promise<MessageType[]> {
  const res = await fetch("/api/getMessages");
  const data =  await res.json();
  return data.messages;
}

export default fetcher;