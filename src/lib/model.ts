// Modelo de dados da ficha: tipos, valores iniciais, normalização e versão enxuta para sincronizar.

export type AcType = 'aac' | 'dac'
export type EncumbranceType = 'none' | 'basic' | 'detailed' | 'itemBased' | 'itemBasedStr'
export type ArmorType = 'unarmored' | 'light' | 'heavy'
export type Location = 'equipped' | 'packed' | 'none'

export interface Ability { score: string; mod: string }
export interface Weapon { id: string; name: string; atk: string; die: string; dmg: string; weight: string; size: string; loc: Location }
export interface GearItem { id: string; qty: string; name: string; desc: string; weight: string; size: string; loc: Location }
export interface ArmorItem { id: string; name: string; ac: string; weight: string; worn: boolean; type: ArmorType; size: string; loc: Location }
export interface Skill { id: string; name: string; roll: string; desc: string }
// arcane e divine: níveis 1 a 6. glamour: sem nível (uso livre). rune: lesser, greater ou mighty.
export type SpellType = 'arcane' | 'divine' | 'glamour' | 'rune'
export interface Spell { id: string; type: SpellType; level: string; mem: string; name: string; duration: string; range: string; desc: string }
export interface SpellSlot { avail: string; total: string }

export interface OseSheet {
  v: number
  name: string
  title: string
  race: string
  alignment: string
  cls: string
  level: string
  xp: string
  next: string
  image: string
  abilities: { str: Ability; int: Ability; wis: Ability; dex: Ability; con: Ability; cha: Ability }
  saves: { d: string; w: string; p: string; b: string; s: string }
  wisSaveMod: string
  hp: string
  hpMax: string
  hitDice: string
  conMod: string
  attackBase: string
  thac0: string
  extra: string
  initiative: string
  classRace: string
  weapons: Weapon[]
  gear: GearItem[]
  armor: ArmorItem[]
  coins: { pp: string; gp: string; ep: string; sp: string; cp: string }
  carryingTreasure: boolean
  skills: Skill[]
  arcaneSlots: SpellSlot[]
  divineSlots: SpellSlot[]
  spells: Spell[]
  charNotes: string
  notes: string
  settings: { acType: AcType; encumbrance: EncumbranceType }
}

let seq = 0
export function uid(): string {
  seq += 1
  return 'r' + Date.now().toString(36) + seq.toString(36) + Math.random().toString(36).slice(2, 5)
}

export const newWeapon = (): Weapon => ({ id: uid(), name: '', atk: '', die: '', dmg: '', weight: '', size: '1', loc: 'equipped' })
export const newGear = (): GearItem => ({ id: uid(), qty: '1', name: '', desc: '', weight: '', size: '1', loc: 'packed' })
export const newArmor = (): ArmorItem => ({ id: uid(), name: '', ac: '', weight: '', worn: false, type: 'unarmored', size: '1', loc: 'equipped' })
export const newSkill = (name = ''): Skill => ({ id: uid(), name, roll: '', desc: '' })
export const newSpell = (type: SpellType = 'arcane', level = '1'): Spell => ({ id: uid(), type, level, mem: '', name: '', duration: '', range: '', desc: '' })

const ability = (): Ability => ({ score: '', mod: '' })

export const DEFAULT_SKILLS = [
  'Ouvir ruídos',
  'Arrombar portas',
  'Encontrar portas secretas',
  'Encontrar armadilhas',
  'Forragear na natureza',
  'Caçar na natureza',
]

export function defaultSheet(): OseSheet {
  return {
    v: 1,
    name: 'Personagem',
    title: '',
    race: '',
    alignment: '',
    cls: '',
    level: '',
    xp: '',
    next: '',
    image: '',
    abilities: { str: ability(), int: ability(), wis: ability(), dex: ability(), con: ability(), cha: ability() },
    saves: { d: '', w: '', p: '', b: '', s: '' },
    wisSaveMod: '',
    hp: '',
    hpMax: '',
    hitDice: '',
    conMod: '',
    attackBase: '',
    thac0: '',
    extra: '',
    initiative: '',
    classRace: '',
    weapons: [newWeapon()],
    gear: [newGear()],
    armor: [newArmor()],
    coins: { pp: '', gp: '', ep: '', sp: '', cp: '' },
    carryingTreasure: false,
    skills: DEFAULT_SKILLS.map((n) => newSkill(n)),
    arcaneSlots: [1, 2, 3, 4, 5, 6].map(() => ({ avail: '', total: '' })),
    divineSlots: [1, 2, 3, 4, 5, 6].map(() => ({ avail: '', total: '' })),
    spells: [],
    charNotes: '',
    notes: '',
    settings: { acType: 'aac', encumbrance: 'detailed' },
  }
}

const str = (v: unknown, f = ''): string => (typeof v === 'string' ? v : v == null || typeof v === 'object' ? f : String(v))
const obj = (v: unknown): Record<string, any> => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, any>) : {})
const oneOf = <T extends string>(v: unknown, list: readonly T[], f: T): T => (list.includes(v as T) ? (v as T) : f)
const LOCATIONS = ['equipped', 'packed', 'none'] as const
const ARMOR_TYPES = ['unarmored', 'light', 'heavy'] as const

const SPELL_TYPES = ['arcane', 'divine', 'glamour', 'rune'] as const
const NUMBER_LEVELS = ['1', '2', '3', '4', '5', '6'] as const
const RUNE_LEVELS = ['lesser', 'greater', 'mighty'] as const

function spellRow(r: Record<string, any>): Spell {
  // Magias de fichas antigas não tinham tipo e valem como arcanas.
  const type = oneOf(r.type, SPELL_TYPES, 'arcane')
  let level = ''
  if (type === 'arcane' || type === 'divine') level = oneOf(str(r.level), NUMBER_LEVELS, '1')
  if (type === 'rune') level = oneOf(str(r.level), RUNE_LEVELS, 'lesser')
  return { id: uid(), type, level, mem: str(r.mem), name: str(r.name), duration: str(r.duration), range: str(r.range), desc: str(r.desc) }
}

// Aceita qualquer objeto (arquivo importado, dados de outro jogador) e devolve uma ficha válida.
export function normalizeSheet(d: unknown): OseSheet {
  const base = defaultSheet()
  const s = obj(d)
  if (!Object.keys(s).length) return base

  const abil = (k: keyof OseSheet['abilities']): Ability => ({
    score: str(obj(obj(s.abilities)[k]).score),
    mod: str(obj(obj(s.abilities)[k]).mod),
  })
  const rows = <T>(v: unknown, make: (r: Record<string, any>) => T, fallback: () => T[]): T[] => {
    const arr = Array.isArray(v) ? v : null
    if (!arr) return fallback()
    const out = arr.map((r) => make(obj(r)))
    return out.length ? out : fallback()
  }

  const saves = obj(s.saves)
  const coins = obj(s.coins)
  const settings = obj(s.settings)
  const slotList = (v: unknown): SpellSlot[] => {
    const arr = Array.isArray(v) ? v : []
    return base.arcaneSlots.map((_, i) => ({ avail: str(obj(arr[i]).avail), total: str(obj(arr[i]).total) }))
  }
  // Fichas antigas tinham uma lista única de espaços de magia, que passa a valer para as arcanas.
  const arcaneIn = s.arcaneSlots !== undefined ? s.arcaneSlots : s.slots

  return {
    v: 1,
    name: str(s.name, base.name),
    title: str(s.title),
    race: str(s.race),
    alignment: str(s.alignment),
    cls: str(s.cls),
    level: str(s.level),
    xp: str(s.xp),
    next: str(s.next),
    image: /^https?:\/\/\S+$/i.test(str(s.image).trim()) ? str(s.image).trim() : '',
    abilities: { str: abil('str'), int: abil('int'), wis: abil('wis'), dex: abil('dex'), con: abil('con'), cha: abil('cha') },
    saves: { d: str(saves.d), w: str(saves.w), p: str(saves.p), b: str(saves.b), s: str(saves.s) },
    wisSaveMod: str(s.wisSaveMod),
    hp: str(s.hp),
    hpMax: str(s.hpMax),
    hitDice: str(s.hitDice),
    conMod: str(s.conMod),
    attackBase: str(s.attackBase),
    thac0: str(s.thac0),
    extra: str(s.extra),
    initiative: str(s.initiative),
    classRace: str(s.classRace),
    weapons: rows(s.weapons, (r) => ({
      id: uid(), name: str(r.name), atk: str(r.atk), die: str(r.die), dmg: str(r.dmg), weight: str(r.weight),
      size: str(r.size, '1'), loc: oneOf(r.loc, LOCATIONS, 'equipped'),
    }), () => [newWeapon()]),
    gear: rows(s.gear, (r) => ({
      id: uid(), qty: r.qty === undefined ? '1' : str(r.qty), name: str(r.name), desc: str(r.desc), weight: str(r.weight),
      size: str(r.size, '1'), loc: oneOf(r.loc, LOCATIONS, 'packed'),
    }), () => [newGear()]),
    armor: rows(s.armor, (r) => ({
      id: uid(), name: str(r.name), ac: str(r.ac), weight: str(r.weight), worn: r.worn === true,
      type: oneOf(r.type, ARMOR_TYPES, 'unarmored'), size: str(r.size, '1'), loc: oneOf(r.loc, LOCATIONS, 'equipped'),
    }), () => [newArmor()]),
    coins: { pp: str(coins.pp), gp: str(coins.gp), ep: str(coins.ep), sp: str(coins.sp), cp: str(coins.cp) },
    carryingTreasure: s.carryingTreasure === true,
    skills: rows(s.skills, (r) => ({ id: uid(), name: str(r.name), roll: str(r.roll), desc: str(r.desc) }), () => [newSkill()]),
    arcaneSlots: slotList(arcaneIn),
    divineSlots: slotList(s.divineSlots),
    spells: rows(s.spells, spellRow, () => []),
    charNotes: str(s.charNotes),
    notes: str(s.notes),
    settings: {
      acType: oneOf(settings.acType, ['aac', 'dac'] as const, 'aac'),
      encumbrance: oneOf(settings.encumbrance, ['none', 'basic', 'detailed', 'itemBased', 'itemBasedStr'] as const, 'detailed'),
    },
  }
}

// Versão enxuta para sincronizar com o narrador: sem ids e sem linhas totalmente vazias.
export function compactSheet(sh: OseSheet): unknown {
  const strip = <T extends { id: string }>(rows: T[], empty: (r: T) => boolean) =>
    rows.filter((r) => !empty(r)).map(({ id, ...rest }) => rest)
  return {
    ...sh,
    weapons: strip(sh.weapons, (r) => !r.name && !r.atk && !r.die && !r.dmg && !r.weight),
    gear: strip(sh.gear, (r) => !r.name && !r.desc && !r.weight),
    armor: strip(sh.armor, (r) => !r.name && !r.ac && !r.weight),
    skills: strip(sh.skills, (r) => !r.name && !r.roll && !r.desc),
    spells: strip(sh.spells, (r) => !r.name && !r.desc && !r.mem && !r.duration && !r.range),
  }
}
