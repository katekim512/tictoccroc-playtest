import { EXPEDITION_THEME } from '../data/types'
import { josa } from '../lib/josa'
import { shareResult } from '../lib/kakao'
import './Result.css'

export default function Result({ profile, result, onRestart }) {
  const { type, products } = result
  const { name, age } = profile
  const theme = EXPEDITION_THEME[type.expedition]

  // 이름 조사: "서준은" / "코코는"
  const nameSubject = josa(name, '은/는')

  const openProduct = url => {
    if (!url || url === '#') return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleShare = () => {
    shareResult({ name, type })
  }

  return (
    <div className='result'>
      <div
        className='r-hero'
        style={{
          background: `linear-gradient(165deg, ${theme.from}, ${theme.to})`,
        }}
      >
        <div className='r-badge'>재미로 보는 놀이 성향 테스트예요</div>
        <div className='r-char'>{type.emoji}</div>
        <div className='r-who'>
          {age ? `${age}세 ` : ''}
          {nameSubject}
        </div>
        <h2 className='r-typename'>
          {type.animal} {type.name}!
        </h2>
        <div className='r-role'>{type.typeName}</div>
        <p className='r-desc'>{type.desc}</p>
        <div className='r-hash'>
          {type.hashtags.map(h => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>

      <div className='r-sec'>
        <h4>{josa(name, '이가/가')} 이런 활동에서 눈이 반짝여요</h4>
        <div className='spark'>
          {type.sparks.map(s => (
            <div key={s}>{s}</div>
          ))}
        </div>
      </div>

      <div className='r-sec'>
        <h4>{josa(name, '이를/를')} 위한 맞춤 프로그램</h4>
        <div className='r-exped'>🧭 추천 원정대 · {type.expedition} 원정대</div>
        {products.map((p, i) => (
          <button
            key={i}
            className={`prod ${p.isPB ? 'hl' : ''}`}
            onClick={() => openProduct(p.url)}
          >
            <span
              className='prod-thumb'
              style={{
                background: `linear-gradient(150deg, ${p.thumbFrom}, ${p.thumbTo})`,
              }}
            >
              {p.thumb}
            </span>
            <span className='prod-info'>
              <span className='prod-t1'>
                {p.title}
                {p.isPB && <span className='prod-pb'>째깍 PICK</span>}
              </span>
              <span className='prod-t2'>{p.meta}</span>
              <span className='prod-price'>{p.price}</span>
            </span>
            <span className='prod-arrow'>›</span>
          </button>
        ))}
      </div>

      <div className='r-cta'>
        <button className='btn ghost' onClick={onRestart}>
          다시 하기
        </button>
        <button className='btn' onClick={handleShare}>
          카카오톡 공유
        </button>
      </div>
      <div className='r-note'>
        놀이 성향은 재미로 보는 참고용이에요 · 아이의 하루하루가 정답입니다 🐊
      </div>
    </div>
  )
}
