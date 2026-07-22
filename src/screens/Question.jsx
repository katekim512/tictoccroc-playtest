import { useState } from 'react'
import { questions } from '../data/questions'
import './Question.css'

export default function Question({ initialAnswers, onExit, onComplete }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers || {})
  const [locked, setLocked] = useState(false) // 자동 전환 중 중복 탭 방지

  const q = questions[index]
  const total = questions.length
  const progress = ((index + 1) / total) * 100
  const selected = answers[q.id]

  const goPrev = () => {
    if (locked) return
    if (index === 0) onExit()
    else setIndex((i) => i - 1)
  }

  // 탭 → 선택 표시 → 잠깐 뒤 자동으로 다음 문항 (마지막은 완료)
  const choose = (value) => {
    if (locked) return
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    setLocked(true)
    window.setTimeout(() => {
      if (index === total - 1) {
        onComplete(next)
      } else {
        setIndex((i) => i + 1)
        setLocked(false)
      }
    }, 260)
  }

  return (
    <div className="question">
      <div className="q-head">
        <div className="q-top">
          <button className="q-icon" onClick={onExit} aria-label="닫기">
            ✕
          </button>
        </div>
        <div className="progress">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="q-count">
          Q{index + 1} / {total}
        </div>
      </div>

      <div className="q-body" key={q.id}>
        <h2 className="q-title">
          {q.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < q.title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>

        <div className="opts">
          {q.options.map((opt, i) => {
            const isSel = selected === opt.value
            return (
              <button
                key={i}
                className={`opt ${isSel ? 'sel' : ''}`}
                onClick={() => choose(opt.value)}
              >
                <span className="opt-ic">{opt.icon}</span>
                <span className="opt-t">
                  {opt.label.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < opt.label.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </span>
                {isSel && <span className="opt-check">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="q-nav">
        <button className="q-prev" onClick={goPrev}>
          ← {index === 0 ? '처음으로' : '이전 질문'}
        </button>
      </div>
    </div>
  )
}
