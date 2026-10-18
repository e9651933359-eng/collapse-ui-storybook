import { CheckBox } from '../../../components/ui/CheckBox'
import { Progress } from '../../../components/ui/Progress'
import { Radio } from '../../../components/ui/Radio'
import './message-parts.css'

export type PollOption = {
  id: string
  label: string
  /** Число голосов — показывается в скобках рядом с процентом в режиме результатов. */
  count?: number
  /** Доля голосов 0–100 для режима результатов. */
  percent?: number
}

export type PollListProps = {
  options: PollOption[]
  /** question — голосование; answer — результаты с процентами и полосой. */
  condition?: 'question' | 'answer'
  /** Single — радио, Multiple — чекбоксы. */
  type?: 'single' | 'multiple'
  /** Выбранные варианты: при голосовании — текущий выбор, в результатах — собственный голос. */
  selected?: string[]
  onSelectedChange?: (selected: string[]) => void
  /** Имя группы радио. */
  name?: string
}

/** Figma my-Base «Poll» 17198:26124 / «Poll list» 17198:26142: Condition Question | Answer × Type Single | Multiple. */
export function PollList({ options, condition = 'question', type = 'single', selected = [], onSelectedChange, name = 'poll' }: PollListProps) {
  const toggle = (id: string) => {
    if (!onSelectedChange) return
    if (type === 'single') onSelectedChange([id])
    else onSelectedChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id])
  }

  return (
    <ul className={`poll-list poll-list--${condition}`} aria-label="Варианты ответа">
      {options.map((option) => {
        const checked = selected.includes(option.id)
        const control = type === 'single'
          ? <Radio size="s" name={name} checked={checked} disabled={condition === 'answer'} onChange={() => toggle(option.id)} aria-label={option.label} />
          : <CheckBox size="s" checked={checked} disabled={condition === 'answer'} onChange={() => toggle(option.id)} aria-label={option.label} />
        return (
          <li key={option.id} className={`poll-list__item ${checked ? 'is-selected' : ''}`}>
            <div className="poll-list__row">
              {control}
              <span className="poll-list__label">{option.label}</span>
              {condition === 'answer' && (
                <span className="poll-list__value">
                  {option.count !== undefined && <span>({option.count})</span>}
                  <strong>{option.percent ?? 0}%</strong>
                </span>
              )}
            </div>
            {condition === 'answer' && <Progress className="poll-list__progress" size="s" value={option.percent ?? 0} label={`${option.label}: ${option.percent ?? 0}%`} />}
          </li>
        )
      })}
    </ul>
  )
}
