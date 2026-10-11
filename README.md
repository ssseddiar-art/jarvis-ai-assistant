:root {
  --bg-main: #050b14;
  --bg-panel: #0b1625;
  --gold-primary: #d4a574;
  --gold-light: #f0d99f;
  --text-main: #e8f0ff;
  --text-muted: #a5b3c1;
  --border-gold: rgba(212, 165, 116, 0.35);
  --glow-gold: rgba(212, 165, 116, 0.15);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #050b14 0%, #0a1620 50%, #050b14 100%);
  color: var(--text-main);
  font-family: 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif;
}

body {
  overflow: hidden;
}

.app-shell {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.chat-panel {
  width: min(900px, 100%);
  height: 100%;
  max-height: 92vh;
  background: rgba(11, 22, 37, 0.85);
  border: 1px solid var(--border-gold);
  border-radius: 28px;
  box-shadow: 0 0 60px var(--glow-gold), 0 20px 80px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(212, 165, 116, 0.12);
  background: rgba(18, 30, 48, 0.6);
}

.logo-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #0a1620;
  font-size: 1.3rem;
  box-shadow: 0 0 20px rgba(212, 165, 116, 0.3);
}

.brand-name {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  background: linear-gradient(90deg, var(--gold-light), var(--gold-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.status {
  font-size: 0.85rem;
  color: var(--text-muted);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.status.listening {
  color: #7cffb3;
  opacity: 1;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-row {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-row.user {
  justify-content: flex-end;
}

.message-row.assistant {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 75%;
  padding: 14px 18px;
  border-radius: 18px;
  line-height: 1.6;
  word-wrap: break-word;
}

.message-bubble.user {
  background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
  color: #0a1620;
  font-weight: 600;
  border-radius: 18px 4px 18px 18px;
}

.message-bubble.assistant {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(212, 165, 116, 0.12);
  color: var(--text-main);
  border-radius: 4px 18px 18px 18px;
}

.speak-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.6;
}

.task-box {
  padding: 0 24px 12px;
  border-top: 1px solid rgba(212, 165, 116, 0.12);
  background: rgba(18, 30, 48, 0.4);
}

.task-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.task-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(212, 165, 116, 0.18);
  border-radius: 10px;
  color: var(--text-main);
  padding: 10px 12px;
  outline: none;
}

.task-btn {
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
  color: #0a1620;
  font-weight: 700;
  padding: 10px 14px;
  cursor: pointer;
}

.task-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text-main);
  font-size: 0.95rem;
}

.task-item {
  padding: 8px 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(212, 165, 116, 0.1);
  border-radius: 10px;
}

.task-empty {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.typing-indicator {
  display: flex;
  gap: 4px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold-primary);
  animation: bounce 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-10px); opacity: 1; }
}

.composer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid rgba(212, 165, 116, 0.12);
  background: rgba(18, 30, 48, 0.6);
}

.input-field {
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(212, 165, 116, 0.18);
  border-radius: 14px;
  color: var(--text-main);
  padding: 14px 18px;
  font-size: 1rem;
  outline: none;
}

.voice-btn, .send-btn {
  background: rgba(212, 165, 116, 0.12);
  border: 1px solid rgba(212, 165, 116, 0.25);
  border-radius: 12px;
  color: var(--text-main);
  cursor: pointer;
  font-size: 1.1rem;
  padding: 12px 14px;
}

.send-btn {
  background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
  color: #0a1620;
  font-weight: 700;
  border: none;
}

@media (max-width: 640px) {
  .chat-panel {
    border-radius: 20px;
  }

  .message-bubble {
    max-width: 90%;
  }
}
