
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAssistantResponse } from '../services/ai';

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Xu's virtual assistant. I can tell you about his full-stack engineering experience, his favorite tech stack, or how he builds high-performance, production-ready web and real-time systems. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');

  const [isTyping, setIsTyping] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>(() => {
    const provider = import.meta.env.VITE_AI_PROVIDER;
    if (provider === 'gemini') return "Gemini-2.0-Flash";
    if (provider === 'zhipu') return "GLM-4.7-FlashX";
    return "GPT-4o-mini";
  });
  const [clickCount, setClickCount] = useState(0);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const { content, model } = await getAssistantResponse(messages, text);

    setIsTyping(false);
    setCurrentModel(model);
    setMessages(prev => [...prev, { role: 'assistant', content }]);
  };

  const quickReplies = ['About me', 'Tech Stack', 'Selected Projects', 'Local Projects', 'Contact Info'];

  const handleIconClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 8) {
      setShowDebugInfo(prev => !prev);
      setClickCount(0);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-20"></div>
      <div className="relative bg-white dark:bg-card-dark rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-[580px]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="relative select-none transition-transform"
              onClick={handleIconClick}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white leading-none">Xu's AI Assistant</h3>
              <p className="text-[10px] text-gray-500 mt-1">Online | Replies instantly</p>
            </div>
          </div>
          {showDebugInfo && currentModel && (
            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wider animate-in fade-in duration-300">
              {currentModel}
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-white dark:bg-card-dark"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 text-sm ${msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                <span className="material-symbols-outlined text-sm">
                  {msg.role === 'assistant' ? 'smart_toy' : 'person'}
                </span>
              </div>
              <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'assistant'
                  ? 'bg-gray-100 dark:bg-gray-800 rounded-tl-none text-gray-700 dark:text-gray-200'
                  : 'bg-primary text-white rounded-tr-none'
                  }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mt-1">
                <span className="material-symbols-outlined text-sm animate-pulse">smart_toy</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-sm text-gray-500 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Replies */}
        <div className="px-6 py-2 bg-white dark:bg-card-dark">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {quickReplies.map(reply => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-medium hover:bg-primary/10 transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-900"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-card-dark border-t border-gray-100 dark:border-gray-800">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="relative"
          >
            <input
              name="chat-input"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
              placeholder="Ask anything about Xu…"
              type="text"
              aria-label="Chat message"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg transition-all shadow-sm flex items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:outline-none dark:focus-visible:ring-offset-gray-900"
              aria-label="Send message"
            >
              <span className="material-symbols-outlined text-sm leading-none">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
