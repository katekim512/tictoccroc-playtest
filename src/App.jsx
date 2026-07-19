import { useEffect, useState } from 'react'
import { initKakao } from './lib/kakao'
import Intro from './screens/Intro'
import Profile from './screens/Profile'
import Question from './screens/Question'
import Loading from './screens/Loading'
import Result from './screens/Result'
import { buildResult } from './lib/scoring'

// 화면 흐름: intro → profile → question → loading → result
export default function App() {
  const [step, setStep] = useState('intro')
  const [profile, setProfile] = useState({ name: '', age: '' })
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  // 카카오 SDK 초기화 (키가 설정돼 있을 때만)
  useEffect(() => {
    initKakao()
  }, [])

  const startOver = () => {
    setProfile({ name: '', age: '' })
    setAnswers({})
    setResult(null)
    setStep('intro')
  }

  const handleQuizDone = (finalAnswers) => {
    setAnswers(finalAnswers)
    setResult(buildResult(finalAnswers))
    setStep('loading')
  }

  return (
    <div className="app-shell">
      <div className="frame">
        {step === 'intro' && <Intro onStart={() => setStep('profile')} />}

        {step === 'profile' && (
          <Profile
            initial={profile}
            onBack={() => setStep('intro')}
            onNext={(p) => {
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
