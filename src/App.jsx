import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import { AppShell } from './components/layout/AppShell'

import Splash from './screens/Splash'
import Onboarding from './screens/Onboarding'
import LanguageSelect from './screens/LanguageSelect'
import LearningGoal from './screens/LearningGoal'
import DailyGoal from './screens/DailyGoal'
import PlacementTest from './screens/PlacementTest'
import PlacementResult from './screens/PlacementResult'
import LearningPlan from './screens/LearningPlan'
import Home from './screens/Home'
import Learn from './screens/Learn'
import LessonDetail from './screens/LessonDetail'
import Conversation from './screens/Conversation'
import GrammarCorrection from './screens/GrammarCorrection'
import Pronunciation from './screens/Pronunciation'
import Listening from './screens/Listening'
import Vocabulary from './screens/Vocabulary'
import Ielts from './screens/Ielts'
import IeltsSpeaking from './screens/IeltsSpeaking'
import Practice from './screens/Practice'
import Progress from './screens/Progress'
import Premium from './screens/Premium'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Login from './screens/Login'
import Notifications from './screens/Notifications'
import Achievements from './screens/Achievements'
import Help from './screens/Help'
import Account from './screens/Account'
import LessonStudy from './screens/LessonStudy'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            {/* Onboarding flow */}
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/language" element={<LanguageSelect />} />
            <Route path="/goal" element={<LearningGoal />} />
            <Route path="/daily-goal" element={<DailyGoal />} />
            <Route path="/placement" element={<PlacementTest />} />
            <Route path="/placement-result" element={<PlacementResult />} />
            <Route path="/plan" element={<LearningPlan />} />

            {/* Main tabs */}
            <Route path="/home" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />

            {/* Feature screens */}
            <Route path="/login" element={<Login />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings/account" element={<Account />} />
            <Route path="/lesson/:lessonId/study" element={<LessonStudy />} />
            <Route path="/lesson/:lessonId" element={<LessonDetail />} />
            <Route path="/conversation" element={<Conversation />} />
            <Route path="/grammar" element={<GrammarCorrection />} />
            <Route path="/pronunciation" element={<Pronunciation />} />
            <Route path="/listening" element={<Listening />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/ielts" element={<Ielts />} />
            <Route path="/ielts/speaking" element={<IeltsSpeaking />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
