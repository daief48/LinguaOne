import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Check, Globe, Mail, MapPin, User as UserIcon } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { BottomSheet } from '../components/ui/Overlay'
import { useApp } from '../context/appContext'
import { user } from '../data/mock'

const COUNTRIES = ['Bangladesh', 'United Kingdom', 'United States', 'Germany', 'Japan', 'Australia']
const NATIVE = ['Bengali', 'English', 'Spanish', 'German', 'Japanese', 'Arabic']

function Field({ icon: IconCmp, label, value, onChange, type = 'text', readOnly = false, onPick }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block">{label}</span>
      <span className="relative flex items-center">
        <IconCmp size={16} className="pointer-events-none absolute left-3.5 text-ink-400" strokeWidth={2.3} />
        {onPick ? (
          <button
            type="button"
            onClick={onPick}
            className="focus-ring press flex h-[52px] w-full items-center rounded-2xl border border-ink-200 bg-white pl-10 pr-4 text-left text-[14.5px] font-medium text-ink-900 hover:border-ink-300"
          >
            {value}
          </button>
        ) : (
          <input
            type={type}
            value={value}
            readOnly={readOnly}
            onChange={(e) => onChange(e.target.value)}
            className={`focus-ring h-[52px] w-full rounded-2xl border border-ink-200 pl-10 pr-4 text-[14.5px] font-medium text-ink-900 hover:border-ink-300 ${
              readOnly ? 'bg-ink-50 text-ink-500' : 'bg-white'
            }`}
          />
        )}
      </span>
    </label>
  )
}

export default function Account() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const [name, setName] = useState(user.fullName)
  const [email, setEmail] = useState(user.email)
  const [country, setCountry] = useState('Bangladesh')
  const [native, setNative] = useState('Bengali')
  const [picker, setPicker] = useState(null)
  const [saving, setSaving] = useState(false)

  const save = () => {
    setSaving(true)
    window.setTimeout(() => {
      setSaving(false)
      showToast('Profile updated', { variant: 'success' })
      navigate('/settings')
    }, 800)
  }

  const pickerConfig =
    picker === 'country'
      ? { title: 'Country', options: COUNTRIES, value: country, set: setCountry }
      : picker === 'native'
        ? { title: 'Native language', options: NATIVE, value: native, set: setNative }
        : null

  return (
    <div className="flex flex-1 flex-col pb-8">
      <TopBar title="Personal details" subtitle="Account" backTo="/settings" />

      <div className="flex-1 px-4 pt-3">
        {/* avatar */}
        <div className="flex flex-col items-center py-4">
          <div className="relative">
            <div className="grid h-[86px] w-[86px] place-items-center rounded-[30px] bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 font-display text-[30px] font-extrabold text-white shadow-glow">
              {user.initials}
            </div>
            <button
              type="button"
              onClick={() => showToast('Photo upload is disabled in this demo', { variant: 'default' })}
              aria-label="Change photo"
              className="press focus-ring absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border border-ink-100 bg-white text-violet-600 shadow-card"
            >
              <Camera size={16} strokeWidth={2.4} />
            </button>
          </div>
          <p className="mt-3 text-[12px] font-semibold text-ink-400">Member since {user.memberSince}</p>
        </div>

        <div className="space-y-3.5">
          <Field icon={UserIcon} label="Full name" value={name} onChange={setName} />
          <Field icon={Mail} label="Email" type="email" value={email} onChange={setEmail} />
          <Field icon={MapPin} label="Country" value={country} onPick={() => setPicker('country')} />
          <Field icon={Globe} label="Native language" value={native} onPick={() => setPicker('native')} />
        </div>

        <div className="mt-5 rounded-2xl border border-ink-100 bg-ink-50 p-3.5">
          <p className="text-[12.5px] leading-relaxed text-ink-500">
            Your native language helps Aria explain grammar in a way that makes sense to you.
          </p>
        </div>
      </div>

      <div className="mt-auto px-4 pb-6 pt-4">
        <Button onClick={save} size="xl" loading={saving} icon={saving ? undefined : Check}>
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>

      <BottomSheet open={Boolean(pickerConfig)} onClose={() => setPicker(null)} title={pickerConfig?.title}>
        <div className="space-y-2 pb-2">
          {pickerConfig?.options.map((o) => {
            const active = o === pickerConfig.value
            return (
              <button
                key={o}
                type="button"
                onClick={() => {
                  pickerConfig.set(o)
                  setPicker(null)
                }}
                className={`press focus-ring flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition ${
                  active ? 'border-violet-200 bg-violet-50/70' : 'border-ink-100 bg-white hover:border-ink-200'
                }`}
              >
                <span className="flex-1 text-[14px] font-semibold text-ink-800">{o}</span>
                {active && (
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                    <Check size={13} strokeWidth={3.2} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </BottomSheet>
    </div>
  )
}
