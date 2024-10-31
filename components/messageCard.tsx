import Image from 'next/image';

import { type MessageType } from '@/types';

type MessageCardProps = {
  message: MessageType;
}

function MessageCard({ message }: MessageCardProps) {
  console.log(message);
  return (
    <div className="flex w-fit space-y-3">
      <div className="flex-shrink-0">
        <Image
          className="rounded-full mx-2"
          height={50}
          width={50} 
          src={message.profilePic} 
          alt="profile picture"
        />
      </div>
      <div>
        <p className="text-[0.65rem] px-[2px] pb-[2px] text-red-400">
          {message.username}
        </p>

        <div className="flex items-end">
          <div className="px-3 py-2 rounded-lg w-it text-white bg-red-400">
            <p>{message.message}</p>
          </div>
          <p className="text-[0.65rem] italic px-2 text-gray-300">
            {new Date(message.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageCard;