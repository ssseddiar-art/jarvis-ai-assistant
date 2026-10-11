import { useState, useRef, useEffect } from 'react'

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Сәлем, бауырым. Мен Q.Y.R.A.N. Сізге қалай көмектесе аламын?' }
  ])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const askAI = async () => {
    if (!text.trim()) return

    const userMessage = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setText('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Қате шықты.' }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Backend қосылмады. FastAPI серверін іске қосыңыз.' }])
    } finally {
      setLoading(false)
    }
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Бұл браузер дыбыс тануды қолдамайды.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'kk-KZ'
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setText(transcript)
    }

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const speak = (message) => {
    if (!message) return
    const utterance = new SpeechSynthesisUtterance(message)
    utterance.lang = 'kk-KZ'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="app-shell">
      <div className="chat-panel">
        <div className="header">
          <div className="logo-brand">
            <div className="logo-icon">Q</div>
            <div className="brand-name">Y.R.A.N</div>
          </div>
          <span className={`status ${isListening ? 'listening' : ''}`}>
            {isListening ? '🎙️ Тыңдап тұрмын...' : '✓ online'}
          </span>
        </div>

        <div className="messages-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.role}`}>
              <div className={`message-bubble ${msg.role}`}>
                {msg.content}
              </div>
              {msg.role === 'assistant' && (
                <button className="speak-btn" onClick={() => speak(msg.content)} title="Дауыспен оқу">
                  🔊
                </button>
              )}
            </div>
          ))}
          {loading && (
            <div className="message-row assistant">
              <div className="message-bubble assistant">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="composer">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Сіздің сұрағыңыз..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading) {
                askAI()
              }
            }}
            className="input-field"
          />
          <button 
            onClick={startListening} 
            className="voice-btn" 
            disabled={isListening}
            title="Микрофон"
          >
            {isListening ? '🎙️' : '🎤'}
          </button>
          <button 
            onClick={askAI} 
            disabled={loading || !text.trim()}
            className="send-btn"
          >
            {loading ? '⏳' : '→'}
          </button>
        </div>
      </div>
    </div>
  )
}
