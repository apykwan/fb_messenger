import Image from 'next/image';
import { useSession } from 'next-auth/react';
import TimeAgo from 'react-timeago';

import { type MessageType } from '@/types';

type MessageCardProps = {
  message: MessageType;
}

function MessageCard({ message }: MessageCardProps) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message?.email;

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          className="rounded-full mx-2"
          height={50}
          width={50} 
          src={session?.user?.image?.toString()|| ''} 
          alt="profile picture"
        />
      </div>
      <div>
        <p className={`text-[0.65rem] px-[2px] pb-[2px] ${isUser ? "text-blue-400 text-right" : "text-gray-700 text-left"}`}>
          {session?.user?.name}
        </p>

        <div className="flex items-end">
          <div className={`px-3 py-2 rounded-lg w-it text-white ${isUser ? "bg-blue-400 ml-auto order-2" : "bg-green-500"}`}>
            <p>{message.message}</p>
          </div>
          <p className={`text-[0.65rem] italic px-2 text-gray-300 ${isUser && 'text-right'}`}>
            <TimeAgo date={new Date(message.created_at)} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageCard;