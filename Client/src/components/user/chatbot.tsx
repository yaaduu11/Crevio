import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from 'framer-motion';
import { aichatbot } from '../../api/user';
import TypewriterText from './type_writter';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string; fullText?: string }[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setTimeout(scrollToBottom, 100);
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  const truncateText = (text: string, wordLimit = 30) => {
    const words = text.trim().split(/\s+/);
    if (words.length > wordLimit) {
      return { shortText: words.slice(0, wordLimit).join(' ') + '...', fullText: text };
    }
    return { shortText: text };
  };

  const sendMessage = async () => {
    const wordCount = countWords(inputText);
    if (wordCount > 100) {
      setError("Message cannot exceed 100 words.");
      return;
    }

    setError('');

    const { shortText, fullText } = truncateText(inputText);
    const updatedMessages = [...messages, { sender: 'user', text: shortText, fullText }];
    setMessages(updatedMessages);
    setInputText('');
    
    setIsLoading(true);
    // setMessages([...updatedMessages, { sender: 'chatbot', text: 'Thinking' }]);
    const thinkingMessage = { sender: 'chatbot', text: 'Thinking' };
    setMessages(prev => [...prev, thinkingMessage]);


    try {
      const prompt = `You are a helpful and professional chatbot for the Crevio web application. Your job is to answer user questions about how Crevio works, including features, navigation, subscription plans, and the founder.

          Respond in a clear, concise, and structured format. Use:
          - Bullet points for lists
          - Line breaks between paragraphs and steps
          - Plain language — no need to make anything bold or italic
          - Avoid any kind of opening like "Hello!", "Hi there!", or "I'd be happy to tell you..." in follow up or after frist questions — just give the answer directly after frist question , the first one should be like this 

          Here is some context you can use when replying:
          - Crevio is a user-friendly, lightweight freelancer platform where clients and freelancers connect to get projects done efficiently.
          - The name "Crevio" is derived from "Creativity + Vision."
          - The founder of Crevio is Yadukrishnan, a software developer.
          - Clients can create projects either from:
              - Their profile → "My Projects" → "Add"
              - Or the general "Projects" page → Click "Add Your Project" in the top-right corner.
          - Freelancers can view project details and apply by clicking the "Apply" button on any project.
          - Clients can view a list of applicants and choose a freelancer from the received applications.
          - Once connected, clients and freelancers can:
              - Use Live Chat (available with any subscription plan)
              - Make Video Calls if both have a Standard or Extended subscription
          - Subscription Plans:
              - Basic, Standard, and Extended — all plans last for 1 month
          - Messaging history (chat list) is accessible from the Messaging section
          - Users can manage their profile by clicking their profile icon in the top-right corner

          Important Notes:
          - Always be respectful and informative
          - If the question is not related to Crevio, respond: "I'm trained to assist with questions about the Crevio platform and its features. Please let me know how I can help you with anything related to Crevio."

          Now answer the following user question directly and clearly:

          User Question: ${inputText}`;
        
        const response = await aichatbot(prompt);
      
        if (response.success) {
          setMessages([...updatedMessages, { sender: 'chatbot', text: response.data as string }]);
        } else {
          setMessages([...updatedMessages, { sender: 'chatbot', text: response.error || 'Error communicating with chatbot.' }]);
        }
      } catch (error) {
        setMessages([...updatedMessages, { sender: 'chatbot', text: 'Network error.' }]);
      } finally {
        setIsLoading(false);
      }      
  };

  return (
    <div>
      <div className="fixed z-50 bottom-6 right-6">
        <motion.div
          onClick={toggleChatbot}
          whileHover={{ width: 126 }}
          animate={{ width: isOpen ? 126 : 56 }}
          transition={{ type: 'spring', stiffness: 130, damping: 20 }}
          className="group flex items-center gap-2 h-14 rounded-full cursor-pointer shadow-lg bg-[#00835B] overflow-hidden px-4 text-white"
        >
          <FontAwesomeIcon icon={faHeadset} className="text-xl" />
          <span
            className={`transition-opacity duration-200 whitespace-nowrap ${
              isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            Crevio AI
          </span>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0.7, scale: 0, y: 0, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0, originX: 1, originY: 1 }}
            exit={{ opacity: 0.5, scale: 0, y: 0, originX: 1, originY: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed bottom-[100px] right-6 z-50 w-96 h-[650px] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden origin-bottom-right"
          >
            <div className="bg-[#00835B] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHeadset} className="text-xl" />
                <span className="text-lg font-semibold">Crevio Assistant</span>
              </div>
              <button onClick={toggleChatbot}>
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                
                {messages.length === 0 ? (
                <div className="mt-20 text-lg text-center text-gray-400">No messages yet.</div>
                ) : (
                
                messages.map((msg, index) => {
                const isLastBotMessage = 
                  index === messages.length - 1 &&
                  msg.sender === 'chatbot' &&
                  msg.text !== 'Thinking';

                return (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`inline-block max-w-xs px-4 py-2 rounded-xl ${
                        msg.sender === 'user' ? 'bg-[#E8F8F5]' : 'bg-[#F1F0F0]'
                      }`}
                    >
                      {msg.text === 'Thinking' && isLoading ? (
                        <span className="text-gray-500">
                          Thinking<span className="inline-block animate-pulse">...</span>
                        </span>
                      ) : isLastBotMessage ? (
                        <TypewriterText text={msg.text} />
                      ) : (
                        <span>{msg.text}</span>
                      )}
                      {msg.fullText && (
                        <span className="ml-2 text-blue-500 cursor-pointer">more...</span>
                      )}
                    </div>
                  </div>
                );
              })

                
                )}
                <div ref={messagesEndRef} />
            </div>


            <div className="flex flex-col gap-1 px-3 pt-2 pb-3 border-t border-gray-200">
              {error && <span className="text-xs text-red-500">{error}</span>}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-0 pb-1 focus:outline-none focus:ring-0"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      sendMessage();
                    }
                  }}
                />
                <button 
                  className="text-[#00835B]" 
                  onClick={sendMessage}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;


// messages.map((msg, index) => (
                // <div 
                // key={index} 
                // className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                // >
                // <div
                //     className={`inline-block max-w-xs px-4 py-2 rounded-xl ${
                //     msg.sender === 'user'
                //         ? 'bg-[#E8F8F5] text-left'
                //         : 'bg-[#F1F0F0] text-left'
                //     }`}
                // >
                //     {msg.text === 'Thinking' && isLoading ? (
                //         <span className="text-gray-500">
                //             Thinking<span className="inline-block animate-pulse">...</span>
                //         </span>
                //     ) : (
                //       msg.text
                //       // <TypewriterText text={msg.text} />
                //     )}
                //     {msg.fullText && (
                //     <span className="ml-2 text-blue-500 cursor-pointer">more...</span>
                //     )}
                // </div>
                // </div>
                // ))