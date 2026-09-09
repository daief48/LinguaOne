import { Bookmark, Mic, Quote, Volume2 } from 'lucide-react'
import { tint as getTint } from '../../data/tints'

/** Full swipe-deck card. */
export function VocabularyCard({ item, saved = false, onListen, onSpeak, onSave, className = '', style }) {
  const t = getTint(item.tint || 'violet')
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[30px] border border-ink-100 bg-white p-5 shadow-float ${className}`}
      style={style}
    >
      <div className={`pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${t.grad} opacity-[0.13] blur-2xl`} />

      <div className="relative flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${t.soft} ${t.text}`}>{item.type}</span>
        <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-bold text-ink-500">{item.level}</span>
        <button
          type="button"
          onClick={onSave}
          aria-label={saved ? 'Remove from saved' : 'Save word'}
          className={`press focus-ring ml-auto grid h-9 w-9 place-items-center rounded-full transition ${
            saved ? 'bg-amber-50 text-amber-500' : 'bg-ink-100 text-ink-400 hover:text-ink-700'
          }`}
        >
          <Bookmark size={16} strokeWidth={2.4} className={saved ? 'fill-amber-400' : ''} />
        </button>
      </div>

      <div className="relative mt-5">
        <h2 className="font-display text-[34px] font-extrabold leading-none tracking-[-0.03em] text-ink-900">
          {item.word}
        </h2>
        <p className="mt-2 font-mono text-[14px] font-medium text-ink-400">{item.phonetic}</p>
      </div>

      <p className="relative mt-4 text-[15px] font-medium leading-relaxed text-ink-700">{item.meaning}</p>

      <div className="relative mt-4 rounded-2xl border border-ink-100 bg-ink-50/70 p-3.5">
        <Quote size={14} className={`mb-1.5 ${t.text}`} strokeWidth={2.5} />
        <p className="text-[13.5px] font-medium italic leading-relaxed text-ink-600">“{item.example}”</p>
      </div>

      {item.synonyms?.length > 0 && (
        <div className="relative mt-3.5">
          <span className="eyebrow">Similar words</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.synonyms.map((s) => (
              <span key={s} className="rounded-full bg-ink-100 px-2.5 py-1 text-[12px] font-semibold text-ink-600">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative mt-auto grid grid-cols-2 gap-2 pt-5">
        <button
          type="button"
          onClick={onListen}
          className="press focus-ring flex h-11 items-center justify-center gap-1.5 rounded-xl2 border border-ink-200 bg-white text-[13.5px] font-bold text-ink-700 hover:border-ink-300"
        >
          <Volume2 size={16} strokeWidth={2.4} />
          Listen
        </button>
        <button
          type="button"
          onClick={onSpeak}
          className={`press focus-ring flex h-11 items-center justify-center gap-1.5 rounded-xl2 bg-gradient-to-r text-[13.5px] font-bold text-white ${t.grad} ${t.glow}`}
        >
          <Mic size={16} strokeWidth={2.4} />
          Speak
        </button>
      </div>
    </div>
  )
}

/** Small horizontal word card — "Today's Vocabulary" on Home. */
export function VocabularyMiniCard({ item, saved, onSave, onListen, className = '' }) {
  const t = getTint(item.tint || 'violet')
  return (
    <div
      className={`surface relative w-[190px] shrink-0 overflow-hidden p-3.5 lift ${className}`}
    >
      <div className={`pointer-events-none absolute -right-8 -top-9 h-24 w-24 rounded-full bg-gradient-to-br ${t.grad} opacity-[0.12] blur-xl`} />
      <div className="relative flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display text-[17px] font-extrabold leading-tight text-ink-900">{item.word}</h3>
          <p className="mt-0.5 font-mono text-[11px] text-ink-400">{item.phonetic}</p>
        </div>
        <button
          type="button"
          onClick={onSave}
          aria-label={saved ? 'Remove from saved' : 'Save word'}
          className={`press grid h-7 w-7 shrink-0 place-items-center rounded-full transition ${
            saved ? 'bg-amber-50 text-amber-500' : 'bg-ink-100 text-ink-400'
          }`}
        >
          <Bookmark size={13} strokeWidth={2.5} className={saved ? 'fill-amber-400' : ''} />
        </button>
      </div>
      <p className="relative mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-ink-500">{item.meaning}</p>
      <button
        type="button"
        onClick={onListen}
        className={`press focus-ring relative mt-3 flex h-8 w-full items-center justify-center gap-1.5 rounded-xl ${t.soft} ${t.text} text-[12px] font-bold`}
      >
        <Volume2 size={13} strokeWidth={2.5} />
        Listen
      </button>
    </div>
  )
}

export default VocabularyCard
