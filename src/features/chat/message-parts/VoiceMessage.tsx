import { ArrowDown, Pause, Play, X } from 'lucide-react'
import { Loader } from '../../../components/ui/Loader'
import './message-parts.css'

/**
 * Figma my-Base «Voice message» 10115:69192, Condition:
 * Loading (отмена загрузки), Not loading (скачать), Default / Not listened, Playback, Pause, Disabled.
 * Технические допущения: Default и Not listened в MCP визуально совпадают; индикатор «не прослушано» не показан.
 */
export type VoiceMessageState = 'default' | 'loading' | 'not-loaded' | 'playback' | 'pause' | 'disabled'

export type VoiceMessageProps = {
  state?: VoiceMessageState
  /** Время справа от кнопки: общая длительность или остаток при воспроизведении. */
  time?: string
  /** Доля воспроизведённого 0–1: проигранные столбики полностью закрашены. */
  progress?: number
  onToggle?: () => void
  onCancelLoading?: () => void
  onDownload?: () => void
  onTranscribe?: () => void
}

/** Форма волны из Figma Record 13870:22087: s=4px, m=12px, l=24px. */
const waveform = 'smmlms ssssssssss mmlm ssssss smmmmlll mm ssss mmmm slll m ssssss mmlm sss mmlm ss smmmm ssssmsss smmsssms'.replace(/ /g, '').split('') as Array<'s' | 'm' | 'l'>

export function VoiceMessage({ state = 'default', time = '00:06', progress, onToggle, onCancelLoading, onDownload, onTranscribe }: VoiceMessageProps) {
  const disabled = state === 'disabled'
  const transcriptionDisabled = disabled || state === 'loading' || state === 'not-loaded'
  const played = state === 'playback' || state === 'pause' ? Math.round((progress ?? 0.12) * waveform.length) : 0
  const handlePrimary = state === 'loading' ? onCancelLoading : state === 'not-loaded' ? onDownload : onToggle
  const primaryLabel = state === 'loading' ? 'Отменить загрузку' : state === 'not-loaded' ? 'Скачать голосовое сообщение' : state === 'playback' ? 'Пауза' : 'Воспроизвести'
  const Icon = state === 'loading' ? X : state === 'not-loaded' ? ArrowDown : state === 'playback' ? Pause : Play

  return (
    <div className={`voice-message voice-message--${state}`}>
      <button type="button" className="voice-message__button" aria-label={primaryLabel} disabled={disabled} onClick={handlePrimary}>
        {state === 'loading' && <Loader className="voice-message__ring" size="large" tone="light" label="Загрузка" />}
        <Icon aria-hidden="true" />
      </button>
      <span className="voice-message__time">{time}</span>
      <span className="voice-message__wave" aria-hidden="true">
        {waveform.map((height, index) => <i key={index} className={`voice-message__bar ${index < played ? 'is-played' : ''}`} data-height={height} />)}
      </span>
      <button type="button" className="voice-message__transcription" aria-label="Расшифровка" disabled={transcriptionDisabled} onClick={onTranscribe}>
        {/* «→T» из Figma IcTranscriptionOutline: стрелка и буква Т */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2.5 12h7M6.5 8.5 10 12l-3.5 3.5" />
          <path d="M13.5 7.5h8M17.5 7.5v10" />
        </svg>
      </button>
    </div>
  )
}
