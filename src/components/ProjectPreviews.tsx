import type { ProjectId } from '../data/projects'

/**
 * Illustrative interface mock-ups, drawn in HTML/CSS. They are NOT screenshots
 * and contain no real data, metrics or benchmarks, only placeholder shapes and
 * generic sample text. The card labels them "Project preview · illustrative".
 */

function VeriFlowPreview() {
  const rows = [
    { w: 62, badge: 'ok' },
    { w: 48, badge: 'wait' },
    { w: 70, badge: 'ok' },
    { w: 54, badge: 'flag' },
    { w: 66, badge: 'wait' },
  ]
  const label = { ok: 'Verified', wait: 'Pending', flag: 'Review' } as const
  return (
    <div className="pv pv--vf">
      <aside className="pv-vf__side">
        <i className="pv-logo" />
        <b className="on" />
        <b />
        <b />
        <b />
      </aside>
      <div className="pv-vf__main">
        <div className="pv-vf__top">
          <span className="pv-title">Verification records</span>
          <span className="pv-pill">Admin</span>
        </div>
        <div className="pv-vf__stats">
          <div><small>Verified</small><i style={{ width: '72%' }} className="ok" /></div>
          <div><small>Pending</small><i style={{ width: '46%' }} className="wait" /></div>
          <div><small>Needs review</small><i style={{ width: '24%' }} className="flag" /></div>
        </div>
        <div className="pv-vf__tools">
          <span className="pv-search">Search records…</span>
          <span className="pv-chip">Status ▾</span>
          <span className="pv-chip">Sort ▾</span>
        </div>
        <div className="pv-vf__table">
          {rows.map((r, i) => (
            <div className="pv-row" key={i}>
              <i className="pv-avatar" />
              <span className="pv-bar" style={{ width: `${r.w}%` }} />
              <em className={`pv-badge pv-badge--${r.badge}`}>{label[r.badge as keyof typeof label]}</em>
            </div>
          ))}
        </div>
        <div className="pv-vf__pager">
          <b>‹</b>
          <b className="on">1</b>
          <b>2</b>
          <b>3</b>
          <b>›</b>
        </div>
      </div>
    </div>
  )
}

function KLinkPreview() {
  return (
    <div className="pv pv--kl">
      <div className="pv-kl__col">
        <div className="pv-kl__panel">
          <div className="pv-kl__head">
            <span className="pv-title">Communication analysis</span>
            <span className="pv-lang">EN · multilingual input</span>
          </div>
          <p className="pv-kl__msg">“Send me the report. I needed it yesterday.”</p>
          <div className="pv-kl__risk">
            <small>Communication risk</small>
            <div className="pv-meter" role="presentation">
              <i /><i /><i className="on" /><i className="on" /><i />
            </div>
            <em>Sounds abrupt</em>
          </div>
        </div>
        <div className="pv-kl__panel pv-kl__panel--summary">
          <span className="pv-title">Meeting summary</span>
          <span className="pv-line" style={{ width: '92%' }} />
          <span className="pv-line" style={{ width: '78%' }} />
          <span className="pv-line" style={{ width: '60%' }} />
        </div>
      </div>
      <div className="pv-kl__col">
        <div className="pv-kl__panel pv-kl__panel--rewrite">
          <span className="pv-title">Professional rewrite</span>
          <p>“Could you share the report when you have a moment? It would help me a lot today.”</p>
          <div className="pv-kl__actions">
            <span className="pv-chip pv-chip--accent">Apply</span>
            <span className="pv-chip">Intent</span>
          </div>
        </div>
        <div className="pv-kl__panel pv-kl__panel--modules">
          <span className="pv-mod">Predictor</span>
          <span className="pv-mod">Intent</span>
          <span className="pv-mod">Meetings</span>
          <span className="pv-mod">Simulator</span>
        </div>
      </div>
    </div>
  )
}

function QuizPreview() {
  return (
    <div className="pv pv--qz">
      <div className="pv-qz__cats">
        <div className="pv-cat on"><i />Frontend frameworks</div>
        <div className="pv-cat"><i />Database fundamentals</div>
      </div>
      <div className="pv-qz__panel">
        <div className="pv-qz__progress">
          <small>Question 2 of 5</small>
          <div className="pv-track"><i style={{ width: '40%' }} /></div>
        </div>
        <p className="pv-qz__q">Which hook runs side effects in a React component?</p>
        <ul className="pv-qz__opts">
          <li>useState</li>
          <li className="sel">useEffect</li>
          <li>useRef</li>
          <li>useMemo</li>
        </ul>
      </div>
    </div>
  )
}

export function ProjectPreview({ id }: { id: ProjectId }) {
  if (id === 'veriflow') return <VeriFlowPreview />
  if (id === 'klink') return <KLinkPreview />
  return <QuizPreview />
}
