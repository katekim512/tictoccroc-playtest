import { useState } from 'react'
import WheelPicker from '../components/WheelPicker'
import './Profile.css'

const AGE_MIN = 1
const AGE_MAX = 10

export default function Profile({ initial, onBack, onNext }) {
  const [name, setName] = useState(initial?.name || '')
  const [age, setAge] = useState(initial?.age || 5)

  const trimmed = name.trim()
  const canNext = trimmed.length > 0 && age !== ''

  const submit = () => {
    if (!canNext) return
    onNext({ name: trimmed, age })
  }

  return (
    <div className='profile'>
      <div className='profile-head'>
        <button className='profile-back' onClick={onBack} aria-label='뒤로'>
          ←
        </button>
      </div>

      <div className='profile-body'>
        <div className='profile-egg'>🐊</div>
        <div className='profile-eyebrow'>🐣 시작 전에 알려주세요</div>
        <h2 className='profile-title'>
          우리 아이의 이름을
          <br />
          알려주세요
        </h2>

        <div className='field'>
          <label className='field-label' htmlFor='child-name'>
            아이 이름 (또는 별명)
          </label>
          <input
            id='child-name'
            className='text-input'
            type='text'
            inputMode='text'
            maxLength={12}
            placeholder='예) 서준'
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') submit()
            }}
            autoFocus
          />
        </div>

        <div className='field'>
          <label className='field-label'>아이 나이</label>
          <WheelPicker
            min={AGE_MIN}
            max={AGE_MAX}
            value={age}
            onChange={setAge}
            unit='세'
          />
        </div>
      </div>

      <div className='profile-foot'>
        <button className='btn' onClick={submit} disabled={!canNext}>
          테스트 시작하기
        </button>
      </div>
    </div>
  )
}
