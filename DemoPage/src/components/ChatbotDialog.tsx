import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import remiBotIcon from '@/assets/remi-bot-icon.png';

interface Message {
  type: 'bot' | 'user';
  text: string;
  options?: string[];
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotDialog = ({ isOpen, onClose }: ChatbotDialogProps) => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: "Hey there! 👋 I'm Remi, your friendly assistant from Askit India.\nWould you like to know how Askit works or need help getting started?",
      options: ['What is Askit?', 'How does it work?', 'MSME Services', 'Join the beta version', 'Talk to the team']
    }
  ]);
  const [conversationState, setConversationState] = useState<string>('greeting');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: option }]);

    // Handle different options
    setTimeout(() => {
      if (option === 'What is Askit?') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Askit is a student-powered service marketplace, a place where students can earn through their skills and others can get tasks done affordably.\n\nWould you like to see what kind of services people are offering on Askit?",
          options: ['Yes, show me categories', 'Not right now']
        }]);
        setConversationState('what-is-askit');
      } else if (option === 'How does it work?') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Super simple! Here's how Askit works:\n1️⃣ Create your profile\n2️⃣ Post a task or browse existing ones\n3️⃣ Get connected with verified students\n4️⃣ Task done, everyone wins 🎉\n\nWould you like to try it out now or see a quick tutorial video?",
          options: ['Try it now', 'Show me tutorial', 'Go back']
        }]);
        setConversationState('how-it-works');
      } else if (option === 'Join the beta version') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "That's awesome! 🌟\nWe're inviting early users to join the Askit Beta Tribe get early access and priority task matching.\n\nTo join, just press on Get Beta Access 👇",
          options: ['App Access']
        }]);
        setConversationState('join-beta');
      } else if (option === 'Talk to the team') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Sure! You can reach our team anytime at 📧 askit.socials@gmail.com\n\nWould you like me to open your email app?",
          options: ['Yes, open email', 'Go back']
        }]);
        setConversationState('talk-to-team');
      } else if (option === 'Yes, show me categories') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Here are a few examples of what people are posting on Askit:\n\n🎨 Graphic Design\n📝 Assignments & Research\n🎬 Video Editing\n📷 Photography\n💡 Tech Help\n🏋️‍♂️ Fitness & Training\n…and many more tailored to your college needs!\n\nWould you like to post a task or join as a service provider?",
          options: ['Post a task', 'Join as Service Provider']
        }]);
        setConversationState('categories');
      } else if (option === 'Not right now') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "No problem! Feel free to explore our website or reach out anytime you need help.\n\nThanks for chatting with me 😊\nWhether you want to earn or get things done, remember:\n👉 It's easy, it's fast… it's Askit.",
          options: []
        }]);
        setConversationState('closing');
      } else if (option === 'Try it now') {
        navigate('/beta-access');
        onClose();
      } else if (option === 'Show me tutorial') {
        window.open('https://drive.google.com/drive/folders/18Z4DeMNXa7RLoGUhgYu17KgX4U3bDMqk?usp=drive_link', '_blank');
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Opening tutorial in a new tab! 📎\n\nIs there anything else I can help you with?",
          options: ['Go back']
        }]);
      } else if (option === 'App Access') {
        navigate('/beta-access');
        onClose();
      } else if (option === 'Yes, open email') {
        window.location.href = 'mailto:askit.socials@gmail.com';
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Opening your email app! ✉️\n\nIs there anything else I can help you with?",
          options: ['Go back']
        }]);
      } else if (option === 'Go back') {
        setMessages([{
          type: 'bot',
          text: "Hey there! 👋 I'm Remi, your friendly assistant from Askit India.\nWould you like to know how Askit works or need help getting started?",
          options: ['What is Askit?', 'How does it work?', 'MSME Services', 'Join the beta version', 'Talk to the team']
        }]);
        setConversationState('greeting');
      } else if (option === 'Post a task' || option === 'Join as Service Provider') {
        navigate('/beta-access');
        onClose();
      } else if (option === 'MSME Services') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Great choice! 🚀 Askit offers affordable, skilled student talent for MSMEs and small businesses.\n\nWhat would you like to know about our MSME services?",
          options: ['What services do you offer?', 'How much does it cost?', 'Why choose Askit over agencies?', 'Get started with MSME services']
        }]);
        setConversationState('msme-services');
      } else if (option === 'What services do you offer?') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "We offer a wide range of business support services:\n\n🎨 Creative & Design Support (logos, posts, banners)\n✍️ Content Creation & Copywriting\n📈 Digital Marketing (SEO, social media, ads)\n🔍 Research & Administrative Tasks\n⚡ Flexible & Tailored Packages\n\nAll delivered by skilled students at 30-60% lower costs than agencies!",
          options: ['How much does it cost?', 'Why choose Askit over agencies?', 'Get started with MSME services', 'Go back']
        }]);
        setConversationState('msme-services-details');
      } else if (option === 'How much does it cost?') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Our pricing is flexible and task-based you only pay for what you need!\n\n💰 Social Media Management: Flexible pricing vs ₹15,000-₹50,000/month at agencies\n💰 SEO Services: Lower costs vs ₹15,000-₹50,000/month at agencies\n💰 Content Creation: Affordable rates vs ₹2,000-₹10,000/post at agencies\n\nSave 30-60% compared to traditional agencies without compromising quality!",
          options: ['Why choose Askit over agencies?', 'Get started with MSME services', 'Go back']
        }]);
        setConversationState('msme-pricing');
      } else if (option === 'Why choose Askit over agencies?') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Here's why businesses love Askit:\n\n✅ Cost Efficiency - No agency retainers or overheads\n✅ Flexible Scaling - No long-term commitments\n✅ Faster Turnaround - Agile student teams\n✅ Fresh Creativity - Modern, youth-driven designs\n✅ Transparent Pricing - Clear task-based rates\n✅ Local Focus - Students understand your audience\n\nAgencies charge ₹20,000-₹40,000+ monthly. We deliver similar value at up to 60% lower cost!",
          options: ['What services do you offer?', 'Get started with MSME services', 'Go back']
        }]);
        setConversationState('msme-benefits');
      } else if (option === 'Get started with MSME services') {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Awesome! 🎉 Ready to grow your business without the agency price tag?\n\nYou can:\n1️⃣ Visit our MSME Services page for more details\n2️⃣ Contact our team directly at support@askitindia.com\n\nWhat would you prefer?",
          options: ['View MSME Services page', 'Contact the team', 'Go back']
        }]);
        setConversationState('msme-get-started');
      } else if (option === 'View MSME Services page') {
        navigate('/msme-services');
        onClose();
      } else if (option === 'Contact the team') {
        window.location.href = 'mailto:support@askitindia.com';
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Opening your email app! ✉️\n\nOur team will get back to you shortly with more details about MSME services.\n\nAnything else I can help with?",
          options: ['Go back']
        }]);
      }
    }, 500);
  };

  const handleFAQ = (question: string) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    
    setTimeout(() => {
      let answer = '';
      if (question.toLowerCase().includes('who can use')) {
        answer = "Anyone in college whether you want to earn or get tasks done!";
      } else if (question.toLowerCase().includes('free')) {
        answer = "Yes! The MVP version is completely free. No hidden fees.";
      } else if (question.toLowerCase().includes('payment')) {
        answer = "Users handle payments directly via UPI. There's no in-app payment yet to keep things transparent and simple.";
      } else if (question.toLowerCase().includes('tasks')) {
        answer = "Anything from academic help to design work, video editing, research, or even small college projects.";
      } else if (question.toLowerCase().includes('launch')) {
        answer = "We're currently in testing and improving fast, the full version will roll out soon!";
      } else if (question.toLowerCase().includes('msme') || question.toLowerCase().includes('business')) {
        answer = "MSMEs can access skilled student talent for design, marketing, research, and more at 30-60% lower costs than agencies. We offer flexible, task-based pricing with no long-term commitments!";
      } else if (question.toLowerCase().includes('agencies')) {
        answer = "Askit offers similar quality at 30-60% lower costs, with faster turnaround, flexible scaling, transparent pricing, and fresh creativity from talented students!";
      } else if (question.toLowerCase().includes('pricing') || question.toLowerCase().includes('cost')) {
        answer = "We use flexible, task-based pricing. You only pay for what you need no retainers, no hidden fees. Typically 30-60% cheaper than agency rates!";
      }

      if (answer) {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: answer + "\n\nIs there anything else I can help you with?",
          options: ['What is Askit?', 'How does it work?', 'MSME Services', 'Join the beta version', 'Talk to the team']
        }]);
      }
    }, 500);
  };

  const commonFAQs = [
    "Who can use Askit?",
    "Is it free to use?",
    "How do payments work?",
    "What kind of tasks can I post?",
    "When will the full version launch?",
    "MSME services pricing?",
    "Why Askit vs agencies?"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <img src={remiBotIcon} alt="Remi" className="h-8 w-8 rounded-full" />
            Remi - Your Askit Assistant
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  <p className="whitespace-pre-line text-sm">{message.text}</p>
                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, optIndex) => (
                        <Button
                          key={optIndex}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t px-6 py-4">
          <p className="text-xs text-muted-foreground mb-2">Quick FAQs:</p>
          <div className="flex flex-wrap gap-2">
            {commonFAQs.map((faq, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => handleFAQ(faq)}
              >
                {faq}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
