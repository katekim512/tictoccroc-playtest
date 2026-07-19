import { questions } from '../data/questions'
import { getType } from '../data/types'
import { getProducts } from '../data/products'

// 축별로 어떤 두 글자가 대립하는지 (동점 방지용 tie-break 기본값 포함)
const AXIS_LETTERS = {
  energy: ['A', 'B'],
  immersion: ['X', 'Y'],
  style: ['P', 'F'],
}

// answers: { q1: 'A', q2: 'B', ... }  (questions.js의 value)
// 각 축 3문항의 다수결로 글자를 정하고, 세 글자를 이어 유형 코드를 만든다.
export function scoreAnswers(answers) {
  const axisOrder = ['energy', 'immersion', 'style']
  const code = axisOrder
    .map((axis) => {
      const [first, second] = AXIS_LETTERS[axis]
      let firstCount = 0
      let secondCount = 0
      questions
        .filter((q) => q.axis === axis)
        .forEach((q) => {
          const v = answers[q.id]
          if (v === first) firstCount += 1
          else if (v === second) secondCount += 1
        })
      // 3문항이므로 동점은 없지만, 안전하게 첫 글자를 우선한다.
      return firstCount >= secondCount ? first : second
    })
    .join('')

  return code
}

// 결과 페이지에 필요한 모든 것을 묶어서 반환
export function buildResult(answers) {
  const code = scoreAnswers(answers)
  const type = getType(code)
  const products = getProducts(type.expedition)
  return { code, type, products }
}
