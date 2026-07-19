// 한글 조사 선택 유틸 — 마지막 글자의 받침 유무로 결정
// hasBatchim('서준') → true, hasBatchim('코코') → false
export function hasBatchim(word) {
  if (!word) return false
  const last = word[word.length - 1]
  const code = last.charCodeAt(0)
  // 한글 음절 영역이 아니면 받침 없는 것으로 간주 (영문/숫자 뒤)
  if (code < 0xac00 || code > 0xd7a3) return false
  return (code - 0xac00) % 28 !== 0
}

// 이름 뒤 조사 붙이기: josa('서준', '은/는') → '서준은'
export function josa(word, pair) {
  const [withBatchim, without] = pair.split('/')
  return word + (hasBatchim(word) ? withBatchim : without)
}
