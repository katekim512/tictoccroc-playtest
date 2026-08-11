import { useEffect, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Button } from '@dotss/ui'
import { EXPEDITION_THEME } from '../data/types'
import { josa } from '../lib/josa'
import { track, ageGroup, productId } from '../lib/analytics'
import './Result.css'

export default function Result({ profile, result, onRestart }) {
  const { code, type, products } = result
  const { name, age } = profile
  const theme = EXPEDITION_THEME[type.expedition]

  // 이름 조사: "서준은" / "코코는"
  const nameSubject = josa(name, '은/는')

  // 관찰 포인트: 첫 문장만 볼드, 둘째 문장부터는 일반
  const [obsFirst, ...obsRest] = type.observation
    .replace(/\*\*/g, '')
    .split('\n')
  const obsSecond = obsRest.join('\n')

  const isPick = p => p.title.includes('단독')

  // 결과 조회 + 추천 상품 노출 로깅
  useEffect(() => {
    track('result_view', {
      type_code: code,
      expedition: type.expedition,
      energy: code[0],
      immersion: code[1],
      style: code[2],
      age_group: ageGroup(age),
    })
    products.forEach((p, i) =>
      track('product_impression', {
        product_id: productId(p.url),
        expedition: type.expedition,
        slot: i + 1,
        is_pb: isPick(p),
      }),
    )
    // 결과 표시 1회
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openProduct = (p, slot) => {
    if (!p.url || p.url === '#') return
    track('product_click', {
      product_id: productId(p.url),
      product_name: p.title,
      expedition: type.expedition,
      slot,
      is_pb: isPick(p),
      link_url: p.url,
    })
    window.open(p.url, '_blank', 'noopener,noreferrer')
  }

  // 캐릭터 이미지를 base64로 미리 인라인 → 저장 캡처 시 fetch 없이 항상 포함
  const [charSrc, setCharSrc] = useState(type.image)
  useEffect(() => {
    let alive = true
    fetch(type.image)
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise((res, rej) => {
            const fr = new FileReader()
            fr.onload = () => res(fr.result)
            fr.onerror = rej
            fr.readAsDataURL(blob)
          }),
      )
      .then((dataUrl) => {
        if (alive) setCharSrc(dataUrl)
      })
      .catch(() => {
        /* 실패 시 원본 URL 유지 */
      })
    return () => {
      alive = false
    }
  }, [type.image])

  // 위 색칠된 히어로 영역만 카드 이미지로 저장
  const heroRef = useRef(null)
  const handleSaveImage = async () => {
    const node = heroRef.current
    if (!node) return
    track('image_save', { type_code: code })
    try {
      // 폰트·캐릭터 이미지가 완전히 로드된 뒤 캡처 (모바일에서 빈 이미지 방지)
      if (document.fonts?.ready) await document.fonts.ready
      const img = node.querySelector('img')
      if (img && !img.complete) {
        await new Promise((res) => {
          img.onload = res
          img.onerror = res
        })
      }
      if (img?.decode) {
        try {
          await img.decode()
        } catch {
          /* 무시 */
        }
      }

      // 저장 이미지에만 둥근 모서리 (클론에만 적용 — 화면은 각짐)
      const opts = { pixelRatio: 2, style: { borderRadius: '28px' } }
      // 모바일 사파리: 첫 캡처에 이미지가 빠지는 버그 → 한 번 워밍업 후 두 번째 결과 사용
      await toPng(node, opts)
      const dataUrl = await toPng(node, opts)

      const a = document.createElement('a')
      a.download = `${name}_${type.name}.png`
      a.href = dataUrl
      a.click()
    } catch (e) {
      window.alert('이미지 저장에 실패했어요. 다시 시도해주세요.')
    }
  }

  return (
    <div className='result'>
      <div className='r-hero' ref={heroRef} style={{ background: theme.bg }}>
        <div className='r-badge'>재미로 보는 놀이 성향 테스트예요</div>
        <div className='r-quote'>{type.quote}</div>
        <img className='r-char' src={charSrc} alt={type.name} />
        <div className='r-who'>
          {age ? `${age}세 ` : ''}
          {nameSubject}
        </div>
        <h2 className='r-typename'>{type.name}!</h2>
        <div className='r-role'>{type.typeName}</div>
        <p className='r-desc'>{type.desc}</p>
        <div className='r-hash'>
          {type.hashtags.map(h => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>

      <div className='r-sec'>
        {/* <h4>{josa(name, '이가/가')} 이런 활동에서 가장 몰입해요</h4> */}
        <h4>우리 아이의 탐험 신호</h4>
        <div className='r-observe-box'>
          <p className='r-observe'>
            <strong>
              {josa(name, '이는/는')} {obsFirst}
            </strong>
            {obsSecond && (
              <>
                {'\n'}
                {obsSecond}
              </>
            )}
          </p>
        </div>
      </div>

      <div className='r-sec'>
        <h4>{josa(name, '이를/를')} 위한 맞춤 프로그램</h4>
        <div className='r-exped'>🧭 추천 원정대 · {type.expedition} 원정대</div>
        {products.map((p, i) => (
          <button
            key={i}
            className={`prod ${isPick(p) ? 'hl' : ''}`}
            onClick={() => openProduct(p, i + 1)}
          >
            <img className='prod-thumb' src={p.thumbImg} alt='' />
            <span className='prod-info'>
              <span className='prod-t1'>
                {p.title}
                {isPick(p) && <span className='prod-pb'>째깍 PICK</span>}
              </span>
              <span className='prod-t2'>{p.meta}</span>
              <span className='prod-price'>{p.price}</span>
            </span>
            <span className='prod-arrow'>›</span>
          </button>
        ))}
      </div>

      <div className='r-cta'>
        <Button
          variant='outlined'
          color='primary'
          size='xLarge'
          inlineCSS={{ flex: 1 }}
          onClick={onRestart}
        >
          다시 하기
        </Button>
        <Button
          variant='filled'
          color='primary'
          size='xLarge'
          inlineCSS={{ flex: 1 }}
          onClick={handleSaveImage}
        >
          이미지 저장
        </Button>
      </div>
      <div className='r-note'>
        놀이 성향은 재미로 보는 참고용이에요 · 아이의 하루하루가 정답입니다 🐊
      </div>
    </div>
  )
}
