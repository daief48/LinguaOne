import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Users } from 'lucide-react'
import { FlowHeader } from '../components/layout/FlowHeader'
import { Button } from '../components/ui/Button'
import { Flag } from '../components/ui/Flag'
import { useApp } from '../context/appContext'
import { languages } from '../data/mock'

export default function LanguageSelect() {
  const navigate = useNavigate()
  const { languageId, setLanguageId } = useApp()
  const selected = languages.find((l) => l.id === languageId)

  return (
    <div className="flex flex-1 flex-col">
      <FlowHeader
        step={1}
        title="What do you want to learn?"
        subtitle="Pick a language. You can add more later — your AI teacher speaks all of them."
        backTo="/onboarding"
      />

      <div className="mt-6 grid grid-cols-2 gap-3 px-5 pb-4">
        {languages.map((lang, i) => {
          const active = lang.id === languageId
          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => setLanguageId(lang.id)}
              className={`press focus-ring relative overflow-hidden rounded-3xl border p-3.5 text-left transition-all duration-300 animate-slide-up ${
                active
                  ? 'border-violet-300 bg-gradient-to-br from-violet-50 to-cyan-50/60 shadow-card ring-1 ring-violet-200'
                  : 'border-ink-100 bg-white shadow-soft hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card'
              }`}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              {active && (
                <span className="absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow">
                  <Check size={13} strokeWidth={3.2} />
                </span>
              )}
              <Flag code={lang.id} size={34} />
              <span className="mt-2.5 block font-display text-[15px] font-extrabold text-ink-900">
                {lang.name}
              </span>
              <span className="mt-1 block text-[11.5px] leading-snug text-ink-400">{lang.desc}</span>
              <span className="mt-2 flex items-center gap-1 text-[10.5px] font-bold text-ink-300">
                <Users size={10} strokeWidth={2.8} />
                {lang.learners} learners
              </span>
            </button>
          )
        })}
      </div>

      <div className="sticky bottom-0 mt-auto bg-gradient-to-t from-white via-white/95 to-transparent px-5 pb-6 pt-4 safe-bottom">
        <div className="mb-3 flex items-center justify-center gap-2 text-[12.5px] font-semibold text-ink-400">
          <Flag code={selected?.id} size={18} />
          Learning <span className="font-extrabold text-ink-800">{selected?.name}</span>
        </div>
        <Button onClick={() => navigate('/goal')} size="xl" iconRight={ArrowRight}>
          Continue
        </Button>
      </div>
    </div>
  )
}
