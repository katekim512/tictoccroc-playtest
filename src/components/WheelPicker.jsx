import { useEffect, useRef } from 'react'
import './WheelPicker.css'

const ITEM_H = 44 // 각 숫자 칸 높이(px) — CSS와 반드시 일치
const PAD_COUNT = 2 // 위/아래 여백 칸 수 (가운데 정렬용)

// 아이폰 시계 알람처럼 세로로 굴려서 가운데 값을 고르는 휠 피커
export default function WheelPicker({ min, max, value, onChange, unit = '' }) {
  const ref = useRef(null)
  const dragRef = useRef(null)
  const snapTimer = useRef(0)

  const items = []
  for (let v = min; v <= max; v += 1) items.push(v)

  // 최초 마운트 시 현재 값 위치로 스크롤 (이후엔 사용자 스크롤이 주도)
  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTop = (value - min) * ITEM_H
    // 마운트 1회만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const valueFromScroll = () => {
    const el = ref.current
    if (!el) return value
    const idx = Math.round(el.scrollTop / ITEM_H)
    const clamped = Math.max(0, Math.min(items.length - 1, idx))
    return min + clamped
  }

  const snapToNearest = () => {
    const el = ref.current
    if (!el) return
    const v = valueFromScroll()
    el.scrollTo({ top: (v - min) * ITEM_H, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const v = valueFromScroll()
    if (v !== value) onChange(v)
    // 트랙패드/휠은 CSS scroll-snap이 스냅해주지만, 안전하게 정지 후 보정
    window.clearTimeout(snapTimer.current)
    snapTimer.current = window.setTimeout(snapToNearest, 120)
  }

  // 마우스 드래그 지원 (터치는 네이티브 스크롤에 맡김)
  // 실제로 움직였을 때만 드래그로 처리 → 단순 클릭은 onClick으로 넘어감
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    dragRef.current = {
      startY: e.clientY,
      startTop: ref.current.scrollTop,
      id: e.pointerId,
      moved: false,
    }
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d) return
    const dy = e.clientY - d.startY
    if (!d.moved && Math.abs(dy) > 3) {
      d.moved = true
      ref.current.setPointerCapture(d.id)
    }
    if (d.moved) ref.current.scrollTop = d.startTop - dy
  }
  const onPointerUp = () => {
    const d = dragRef.current
    dragRef.current = null
    if (d && d.moved) snapToNearest() // 클릭이면 onClick이 처리
  }

  return (
    <div className="wheel-wrap" style={{ height: ITEM_H * (PAD_COUNT * 2 + 1) }}>
      <div className="wheel-band" style={{ top: ITEM_H * PAD_COUNT, height: ITEM_H }} />
      <div
        className="wheel"
        ref={ref}
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div style={{ height: ITEM_H * PAD_COUNT }} />
        {items.map((v) => (
          <div
            key={v}
            className={`wheel-item ${v === value ? 'active' : ''}`}
            style={{ height: ITEM_H }}
            onClick={() => {
              const el = ref.current
              el.scrollTo({ top: (v - min) * ITEM_H, behavior: 'smooth' })
            }}
          >
            {v}
            {unit && <span className="wheel-unit">{unit}</span>}
          </div>
        ))}
        <div style={{ height: ITEM_H * PAD_COUNT }} />
      </div>
    </div>
  )
}
