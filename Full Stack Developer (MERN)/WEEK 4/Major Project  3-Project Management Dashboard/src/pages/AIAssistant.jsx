import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Trash2,
  Plus,
  Lightbulb,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

import "./AIAssistant.css";

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    text: "Hi! I'm your TASKFLOW AI Assistant. I can help you plan projects, organize tasks, summarize progress, and suggest next steps.",
  },
];

const QUICK_ACTIONS = [
  {
    icon: BarChart3,
    title: "Analyze my project",
    prompt: "Analyze my current project progress.",
  },
  {
    icon: Lightbulb,
    title: "Suggest tasks",
    prompt: "Suggest tasks I should work on next.",
  },
  {
    icon: CheckCircle2,
    title: "Improve productivity",
    prompt: "Give me some productivity suggestions.",
  },
];

function createAssistantResponse(message) {
  const text = message.toLowerCase();

  if (
    text.includes("project") ||
    text.includes("progress")
  ) {
    return "I can help you review your project structure, identify pending work, and organize the next steps. Once the AI backend is connected, I can use your actual TASKFLOW project data for a personalized analysis.";
  }

  if (
    text.includes("task") ||
    text.includes("todo")
  ) {
    return "A useful approach is to separate tasks into urgent work, important work, and tasks that can wait. I can also help break a large task into smaller actionable tasks.";
  }

  if (
    text.includes("productivity") ||
    text.includes("productive")
  ) {
    return "Try focusing on a small number of important tasks at a time. Keep task descriptions clear, assign priorities, and regularly review your project progress.";
  }

  if (
    text.includes("hello") ||
    text.includes("hi")
  ) {
    return "Hello! 👋 I'm ready to help with your TASKFLOW projects and tasks.";
  }

  return "I understand. I can help you organize projects, break work into tasks, analyze progress, and plan your next steps. Connect an AI API to enable fully intelligent responses.";
}

export default function AIAssistant() {
  const [messages, setMessages] =
    useState(INITIAL_MESSAGES);

  const [input, setInput] = useState("");

  const [sending, setSending] = useState(false);

  function sendMessage(message = input) {
    const trimmed = message.trim();

    if (!trimmed || sending) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setSending(true);

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: createAssistantResponse(trimmed),
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setSending(false);
    }, 700);
  }

  function handleSubmit(event) {
    event.preventDefault();

    sendMessage();
  }

  function clearChat() {
    setMessages(INITIAL_MESSAGES);
  }

  return (
    <div className="ai-page">
      <div className="ai-page-header">
        <div>
          <div className="ai-eyebrow">
            <Sparkles size={15} />
            TASKFLOW AI
          </div>

          <h1>AI Assistant</h1>

          <p>
            Get help planning projects, organizing tasks,
            and improving your workflow.
          </p>
        </div>

        <button
          type="button"
          className="ai-clear-button"
          onClick={clearChat}
        >
          <Trash2 size={16} />
          Clear chat
        </button>
      </div>

      <div className="ai-layout">
        <aside className="ai-sidebar">
          <div className="ai-sidebar-title">
            <Sparkles size={17} />
            AI Assistant
          </div>

          <button
            type="button"
            className="ai-new-chat"
            onClick={clearChat}
          >
            <Plus size={17} />
            New conversation
          </button>

          <div className="ai-sidebar-info">
            <Bot size={22} />

            <strong>
              Your project copilot
            </strong>

            <p>
              Ask questions about tasks,
              projects, planning, and productivity.
            </p>
          </div>
        </aside>

        <section className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-avatar">
              <Bot size={21} />
            </div>

            <div>
              <strong>TASKFLOW AI</strong>

              <span>
                <span className="ai-online-dot" />
                Assistant ready
              </span>
            </div>
          </div>

          <div className="ai-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message ${
                  message.role === "user"
                    ? "user"
                    : "assistant"
                }`}
              >
                <div className="ai-message-avatar">
                  {message.role === "user" ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>

                <div className="ai-message-content">
                  <span className="ai-message-name">
                    {message.role === "user"
                      ? "You"
                      : "TASKFLOW AI"}
                  </span>

                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {sending && (
              <div className="ai-message assistant">
                <div className="ai-message-avatar">
                  <Bot size={16} />
                </div>

                <div className="ai-message-content">
                  <span className="ai-message-name">
                    TASKFLOW AI
                  </span>

                  <div className="ai-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ai-quick-actions">
            {QUICK_ACTIONS.map(
              ({
                icon: Icon,
                title,
                prompt,
              }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                >
                  <Icon size={15} />
                  {title}
                </button>
              )
            )}
          </div>

          <form
            className="ai-input-area"
            onSubmit={handleSubmit}
          >
            <textarea
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
              placeholder="Ask TASKFLOW AI anything..."
              rows={1}
              disabled={sending}
            />

            <button
              type="submit"
              className="ai-send-button"
              disabled={
                !input.trim() || sending
              }
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>

          <p className="ai-disclaimer">
            AI responses may need verification. Connect
            your AI provider to enable live AI responses.
          </p>
        </section>
      </div>
    </div>
  );
}