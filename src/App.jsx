import { useEffect, useState } from 'react'
import { initKakao } from './lib/kakao'
import { initAnalytics, pageView, track, ageGroup } from './lib/analytics'
import Intro from './screens/Intro'
import Profile from './screens/Profile'
import Question from './screens/Question'
import Loading from './screens/Loading'
import Result from './screens/Result'
import { buildResult, buildResultFromCode } from './lib/scoring'

// 화면 흐름: intro → profile → question → loading → result
export default function App() {
  const sharedCode = new URLSearchParams(window.location.search)
    .get('type')
    ?.toUpperCase()
  const sharedName = new URLSearchParams(window.location.search).get('name')
  const sharedResult = buildResultFromCode(sharedCode)
  const [step, setStep] = useState(sharedResult ? 'result' : 'intro')
  const [profile, setProfile] = useState({
    name: sharedResult ? sharedName || '우리 아이' : '',
    age: '',
  })
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(sharedResult)

  // 카카오 SDK · GA4 초기화 (키/ID가 설정돼 있을 때만)
  useEffect(() => {
    initKakao()
    initAnalytics()
  }, [])

  // 스크린 전환마다 page_view 전송 (SPA)
  useEffect(() => {
    pageView(step)
  }, [step])

  const startOver = () => {
    track('restart_click')
    setProfile({ name: '', age: '' })
    setAnswers({})
    setResult(null)
    setStep('intro')
  }

  const handleQuizDone = finalAnswers => {
    setAnswers(finalAnswers)
    setResult(buildResult(finalAnswers))
    setStep('loading')
  }

  return (
    <div className='app-shell'>
      <div className='frame'>
        {step === 'intro' && (
          <Intro
            onStart={() => {
              track('test_start')
              setStep('profile')
            }}
          />
        )}

        {step === 'profile' && (
          <Profile
            initial={profile}
            onBack={() => setStep('intro')}
            onNext={p => {
              track('profile_submit', {
                age_group: ageGroup(p.age),
                age: Number(p.age) || undefined,
              })
              setProfile(p)
              setStep('question')
            }}
          />
        )}

        {step === 'question' && (
          <Question
            initialAnswers={answers}
            onExit={() => setStep('profile')}
            onComplete={handleQuizDone}
          />
        )}

        {step === 'loading' && <Loading onDone={() => setStep('result')} />}

        {step === 'result' && result && (
          <Result profile={profile} result={result} onRestart={startOver} />
        )}
      </div>
    </div>
  )
}
