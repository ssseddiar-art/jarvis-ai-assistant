import { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const askAI = async () => {
    if (!text.trim()) return

    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      setReply(data.reply || 'Жауап жоқ.')
    } catch (error) {
      setReply('Backend қосылмады. FastAPI серверін іске қосыңыз.')
    } finally {
      setLoading(false)
    }
  }

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Бұл браузер дыбыс тануды қолдамайды.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'kk-KK'
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
      <div className="panel">
        <div className="brand-row">
          <div className="logo">Q.Y.R.A.N</div>
          <span className={`status ${isListening ? 'listening' : ''}`}>
            {isListening ? 'Тыңдап тұрмын...' : 'Қ ready'}
          </span>
        </div>

        <textarea
          className="input-box"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Сіздің сұрағыңыз..."
        />

        <div className="actions">
          <button onClick={startListening} className="secondary">
            🎙️ Дыбыс
          </button>
          <button onClick={askAI} disabled={loading || !text.trim()}>
            {loading ? 'Күте тұрыңыз...' : 'Жібер'}
          </button>
        </div>

        <div className="reply-box">
          <h3>Жауап</h3>
          <p>{reply || 'Жауап күтілуде...'}</p>
        </div>

        {reply && (
          <button onClick={() => speak(reply)} className="secondary full-width">
            🔊 Дауыспен оқу
          </button>
        )}
      </div>
    </div>
  )
}
