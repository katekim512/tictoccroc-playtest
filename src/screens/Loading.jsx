import { useEffect, useState } from 'react'
import './Loading.css'

const MESSAGES = [
  '놀이 에너지를 재는 중',
  '몰입 스타일을 살피는 중',
  '노는 방식을 맞춰보는 중',
]

export default function Loading({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      onDone()
      return
    }

    const t1 = window.setTimeout(() => setPhase(1), 900)
    const t2 = window.setTimeout(() => setPhase(2), 1700)
    const done = window.setTimeout(onDone, 2500)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(done)
    }
  }, [onDone])

  return (
    <div className="loading">
      <div className="croc-spin">🐊</div>
      <h3 className="loading-title">째깍째깍... 분석 중이에요</h3>
      <div className="loading-msg">
        {MESSAGES.map((m, i) => (
          <div key={i} className={`msg-line ${i <= phase ? 'on' : ''}`}>
            {m} {i < phase ? '✓' : i === phase ? '…' : ''}
          </div>
        ))}
      </div>
      <div className="loading-bar">
        <i />
      </div>
    </div>
  )
}
