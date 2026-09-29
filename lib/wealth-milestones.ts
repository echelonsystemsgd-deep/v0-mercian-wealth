// ── Wealth Milestone & Affirmation Engine ─────────────────────────────────────
// Calculates monthly targets advancing on the 28th of every month:
// • Sep 2026: £10,000 / mo baseline
// • Oct 28: +£10,000 -> £20,000 / mo
// • Nov 28: +£10,000 -> £30,000 / mo
// • Dec 2026: Transitions to £100,000 / mo North Star standard

export interface MilestoneStage {
  id: string
  monthLabel: string
  year: number
  dateStr: string
  target: number
  isCurrent: boolean
  isCompleted: boolean
  isGrandVision?: boolean
  focus: string
  dailyRunRate: string
  clientsFormula: string
  mindsetShift: string
}

export interface WealthMilestoneState {
  currentMonthlyTarget: number
  ultimateTarget: number
  realizedRevenue: number
  realizedPipeline: number
  daysUntilNextStep: number
  nextStepDateStr: string
  nextStepTarget: number
  isDecemberOrBeyond: boolean
  timeline: MilestoneStage[]
  affirmations: {
    title: string
    quote: string
    focusArea: string
  }[]
  unitEconomics: {
    tier10k: {
      websites: string
      retainers: string
      systems: string
      dailyRunRate: string
    }
    tier100k: {
      retainers: string
      enterprises: string
      partnerships: string
      dailyRunRate: string
    }
  }
}

export function calculateWealthMilestone(
  customDate?: Date,
  realizedRevenue: number = 0,
  realizedPipeline: number = 495
): WealthMilestoneState {
  const now = customDate || new Date()
  const year = now.getFullYear()
  const month = now.getMonth() // 0 = Jan ... 8 = Sep, 9 = Oct, 10 = Nov, 11 = Dec
  const day = now.getDate()

  let currentMonthlyTarget = 10000
  let isDecemberOrBeyond = false

  if (year < 2026) {
    currentMonthlyTarget = 10000
  } else if (year === 2026) {
    if (month < 8) {
      // Prior to Sep 2026
      currentMonthlyTarget = 10000
    } else if (month === 8) {
      // September 2026 (Day 28 passed)
      currentMonthlyTarget = 10000
    } else if (month === 9) {
      // October 2026: advances on the 28th
      currentMonthlyTarget = day >= 28 ? 20000 : 10000
    } else if (month === 10) {
      // November 2026: advances on the 28th
      currentMonthlyTarget = day >= 28 ? 30000 : 20000
    } else if (month >= 11) {
      // December 2026: changes to £100,000 / month!
      currentMonthlyTarget = 100000
      isDecemberOrBeyond = true
    }
  } else {
    // 2027+
    currentMonthlyTarget = 100000
    isDecemberOrBeyond = true
  }

  // Calculate days until next 28th
  let nextDate = new Date(year, month, 28)
  if (day >= 28) {
    nextDate = new Date(year, month + 1, 28)
  }
  const diffTime = nextDate.getTime() - now.getTime()
  const daysUntilNextStep = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  const nextStepDateStr = nextDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  let nextStepTarget = currentMonthlyTarget + 10000
  if (nextDate.getMonth() === 11 || nextDate.getFullYear() > 2026) {
    nextStepTarget = 100000
  }

  // Milestone Stages
  const timeline: MilestoneStage[] = [
    {
      id: 'sep_26',
      monthLabel: 'September 2026',
      year: 2026,
      dateStr: '28 Sep 2026',
      target: 10000,
      isCurrent: year === 2026 && month === 8,
      isCompleted: year > 2026 || (year === 2026 && month > 8),
      focus: 'The £10,000 / mo Foundation: Building repeatable outreach velocity and establishing market proof.',
      dailyRunRate: '£333 / day',
      clientsFormula: '20 websites @ £500 (e.g. Sell Your Stamps UK) OR 10 Retainers @ £1,000/mo',
      mindsetShift: 'My time is high-leverage. Every day without outreach is capital left on the table.',
    },
    {
      id: 'oct_26',
      monthLabel: 'October 2026',
      year: 2026,
      dateStr: '28 Oct 2026',
      target: 20000,
      isCurrent: year === 2026 && month === 9,
      isCompleted: year > 2026 || (year === 2026 && month > 9),
      focus: 'The £20,000 / mo Acceleration: Stacking monthly recurring retainers alongside high-speed builds.',
      dailyRunRate: '£667 / day',
      clientsFormula: '20 Retainers @ £1,000/mo OR 8 Full Website & Growth Systems @ £2,500',
      mindsetShift: 'I am transitioning from project hunter to recurring wealth architect.',
    },
    {
      id: 'nov_26',
      monthLabel: 'November 2026',
      year: 2026,
      dateStr: '28 Nov 2026',
      target: 30000,
      isCurrent: year === 2026 && month === 10,
      isCompleted: year > 2026 || (year === 2026 && month > 10),
      focus: 'The £30,000 / mo Velocity: Institutional client trust, AI automation delivery, and multi-client retention.',
      dailyRunRate: '£1,000 / day',
      clientsFormula: '30 Retainers @ £1,000/mo OR 6 Enterprise Transformation Mandates @ £5,000',
      mindsetShift: '£1,000 every single day is my baseline reality. The systems do the lifting.',
    },
    {
      id: 'dec_26',
      monthLabel: 'December 2026 & Beyond',
      year: 2026,
      dateStr: 'December 2026',
      target: 100000,
      isCurrent: year === 2026 && month === 11,
      isCompleted: year > 2026,
      isGrandVision: true,
      focus: 'THE £100,000 / MO QUANTUM LEAP: Dominant market presence, enterprise retainer contracts, and wealth creation.',
      dailyRunRate: '£3,333 / day',
      clientsFormula: '100 Retainers @ £1,000/mo OR 20 Enterprise Growth Engines @ £5,000/mo',
      mindsetShift: 'I command an eight-figure vision. £100,000 a month is an inevitable consequence of my consistency.',
    },
  ]

  // Curated Affirmations
  const affirmations = [
    {
      title: 'Wealth Identity',
      quote: 'I am the architect of a £100,000/month recurring wealth vehicle. Every interaction generates enterprise ROI.',
      focusArea: 'Conviction & Standard',
    },
    {
      title: 'Realized Pipeline Reality',
      quote: '£495 from Stamp Valuation Website is proof of concept. The pipeline is real, the machine is calibrated, and scale is next.',
      focusArea: 'Market Traction',
    },
    {
      title: 'Relentless Execution',
      quote: 'I do not wait for momentum; I manufacture it through daily outreach, high-ticket positioning, and relentless speed.',
      focusArea: 'Daily Discipline',
    },
    {
      title: 'The 28th Progression',
      quote: 'Every 28 days my standards rise by £10,000 until December crowns the £100,000/month standard. I refuse to play small.',
      focusArea: 'Exponential Growth',
    },
  ]

  return {
    currentMonthlyTarget,
    ultimateTarget: 100000,
    realizedRevenue,
    realizedPipeline,
    daysUntilNextStep,
    nextStepDateStr,
    nextStepTarget,
    isDecemberOrBeyond,
    timeline,
    affirmations,
    unitEconomics: {
      tier10k: {
        websites: '20 one-time builds @ £500 (like Stamp Valuation)',
        retainers: '10 recurring retainers @ £1,000 / month',
        systems: '4 full AI automation growth systems @ £2,500',
        dailyRunRate: '£333 / day required',
      },
      tier100k: {
        retainers: '100 client retainers @ £1,000 / month',
        enterprises: '20 enterprise accounts @ £5,000 / month',
        partnerships: '10 strategic growth partnerships @ £10,000 / month',
        dailyRunRate: '£3,333 / day required',
      },
    },
  }
}
