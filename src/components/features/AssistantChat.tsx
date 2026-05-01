'use client';

/**
 * @file components/features/AssistantChat.tsx
 * @description AI-powered chat interface using Google Gemini.
 * Features: message history, quick prompts, streaming-like UX, aria-live announcements.
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  useMemo,
} from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { sanitizeString } from '@/lib/utils';
import { QUICK_PROMPTS } from '@/lib/electionData';
import type { ChatMessage } from '@/types';
import styles from './AssistantChat.module.css';

// ============================================================
// Sub-components
// ============================================================

/**
 * TypingIndicator component shown while assistant is processing.
 * @returns {JSX.Element}
 */
const TypingIndicator = React.memo((): React.ReactNode => (
  <div className={styles.typingIndicator} role="status" aria-label="Assistant is typing">
    <span className="sr-only">LokSaathi is typing a response…</span>
    <span className={styles.dot} aria-hidden="true" />
    <span className={styles.dot} aria-hidden="true" />
    <span className={styles.dot} aria-hidden="true" />
  </div>
));
TypingIndicator.displayName = 'TypingIndicator';

/**
 * MessageBubble component for individual chat messages.
 * @param {object} props Component props.
 * @param {ChatMessage} props.message Message data.
 * @returns {JSX.Element}
 */
const MessageBubble = React.memo(({ message }: { message: ChatMessage }): React.ReactNode => {
  const isUser = message.role === 'user';

  /**
   * Formats AI response text with basic markdown support (bold, bullets).
   * @param {string} text Raw text content.
   * @returns {JSX.Element[]} Formatted content.
   */
  const formatContent = useCallback((text: string): React.ReactNode[] => {
    return text.split('\n').map((line, i) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <br key={i} />;

      // Handle bold **text**
      const boldReplaced = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Handle bullet points (•, -, *)
      const isBullet = /^[•\-*]/.test(trimmedLine);
      
      if (isBullet) {
        return (
          <div 
            key={i} 
            className={styles.bulletLine}
            dangerouslySetInnerHTML={{ __html: boldReplaced }}
          />
        );
      }

      return (
        <p key={i} dangerouslySetInnerHTML={{ __html: boldReplaced }} />
      );
    });
  }, []);

  const timeString = useMemo(() => {
    return message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [message.timestamp]);

  return (
    <div className={`${styles.messageWrapper} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      {!isUser && <div className={styles.avatar} aria-hidden="true">🗳️</div>}
      <div className={styles.messageBubble}>
        {message.isLoading ? (
          <TypingIndicator />
        ) : (
          <div className={styles.messageContent}>
            {formatContent(message.content)}
          </div>
        )}
        <span className={styles.messageTime}>{timeString}</span>
      </div>
      {isUser && <div className={`${styles.avatar} ${styles.userAvatar}`} aria-hidden="true">👤</div>}
    </div>
  );
});
MessageBubble.displayName = 'MessageBubble';

// ============================================================
// Main Component
// ============================================================

/**
 * Main AssistantChat component for AI interaction.
 * @returns {JSX.Element}
 */
export default function AssistantChat(): React.ReactNode {
  const { t } = useLanguage();
  const inputId = useId();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: '', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  /** Scroll to bottom on new messages */
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  /** Announce updates to screen readers */
  const announce = useCallback((text: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = '';
      setTimeout(() => {
        if (liveRegionRef.current) liveRegionRef.current.textContent = text;
      }, 100);
    }
  }, []);

  /** Update welcome message on language change */
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ ...prev[0], content: t.chat_welcome }];
      }
      return prev;
    });
  }, [t.chat_welcome]);

  /**
   * Sends user message to API and handles response.
   * @param {string} text Message content.
   */
  const handleSend = useCallback(async (text: string) => {
    const rawInput = text.trim();
    if (!rawInput || isLoading) return;

    setError(null);
    const sanitized = sanitizeString(rawInput);
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: sanitized, timestamp: new Date() };
    const loadingId = 'loading-' + Date.now();
    const loadingMsg: ChatMessage = { id: loadingId, role: 'assistant', content: '', timestamp: new Date(), isLoading: true };

    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => !m.isLoading && m.id !== 'welcome')
        .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: sanitized, history }),
      });

      if (!res.ok) throw new Error(t.chat_error || 'Connection failed');

      const data = await res.json();
      const assistantMsg: ChatMessage = { id: Date.now().toString(), role: 'assistant', content: data.response, timestamp: new Date() };

      setMessages(prev => prev.filter(m => m.id !== loadingId).concat(assistantMsg));
      announce(`Response received: ${data.response.substring(0, 50)}...`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
      setMessages(prev => prev.filter(m => m.id !== loadingId));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, isLoading, t.chat_error, announce]);

  return (
    <section id="assistant" className={styles.chatSection} aria-label="Election Assistant Chat">
      <div ref={liveRegionRef} aria-live="polite" className="sr-only" role="status" />

      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{t.faq_eyebrow}</span>
        <h2 className={styles.sectionTitle}>
          {t.hero_title_prefix} <span className="text-gradient">LokSaathi</span>
        </h2>
        <p className={styles.sectionSubtitle}>{t.hero_subtitle}</p>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.chatToolbar}>
          <span className={styles.statusText}>● {isLoading ? t.chat_loading : 'Ready'}</span>
          <button 
            className={styles.clearBtn} 
            onClick={() => {
              setMessages([{ id: 'welcome', role: 'assistant', content: t.chat_welcome, timestamp: new Date() }]);
              announce(t.chat_cleared);
              setError(t.chat_cleared); // Temporarily use error state to show a "toast" notification
              setTimeout(() => setError(null), 3000);
            }}
            disabled={isLoading}
          >
            Clear
          </button>

        </div>

        <div className={styles.messagesArea} role="log">
          {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className={styles.errorBanner} role="alert">
            <span>{error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <div className={styles.quickPromptsArea}>
          <div className={styles.quickPrompts}>
            {QUICK_PROMPTS.map(qp => (
              <button key={qp.id} className={styles.quickPromptChip} onClick={() => handleSend(qp.prompt)} disabled={isLoading}>
                {qp.icon} {qp.label}
              </button>
            ))}
          </div>
        </div>

        <form className={styles.inputArea} onSubmit={e => { e.preventDefault(); handleSend(input); }}>
          <div className={styles.inputWrapper}>
            <textarea
              id={inputId}
              ref={inputRef}
              className={styles.textInput}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend(input))}
              placeholder={t.chat_placeholder}
              disabled={isLoading}
              maxLength={2000}
            />
          </div>
          <button type="submit" className={styles.sendButton} disabled={!input.trim() || isLoading}>
            {isLoading ? <div className={styles.sendSpinner} /> : '↗'}
          </button>
        </form>
        <p className={styles.disclaimer}>{t.chat_disclaimer}</p>
      </div>
    </section>
  );
}
