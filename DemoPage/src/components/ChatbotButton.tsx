import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ChatbotDialog from './ChatbotDialog';
import remiBotIcon from '@/assets/remi-bot-icon.png';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50 p-0 overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <img src={remiBotIcon} alt="Remi Bot" className="h-full w-full object-cover" />
      </Button>
      <ChatbotDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;
