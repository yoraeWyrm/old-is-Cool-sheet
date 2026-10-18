// Cálculos da ficha: CA, ataque, peso e movimento. Funções puras, sem interface.

import type { OseSheet, Location, Weapon, GearItem } from './model'
import {
  BASIC_MOVEMENT, COIN_WEIGHT, DETAILED_MOVEMENT, ITEM_BASED_MOVEMENT,
  AC_BASE, DESCENDING_AC_CONSTANT, ENCOUNTER_DIVISOR,
} from './rules'

// Número com sinal. Aceita vírgula ou ponto, e "+2". Vazio ou inválido vale 0.
export function sn(v: unknown): number {
  const n = parseFloat(String(v ?? '').trim().replace(',', '.'))
  return Number.isFinite(n) ? n : 0
}

// Número que não pode ser negativo (pesos, quantidades, moedas).
export function pn(v: unknown): number {
  return Math.max(0, sn(v))
}

export function round(n: number): number {
  return Math.round(n * 1_000_000) / 1_000_000
}

export function fmt(n: number): string {
  return round(n).toLocaleString('pt-BR', { maximumFractionDigits: 2 })
}

// Mostra o sinal: +2, 0, -1
export function signed(n: number): string {
  const r = round(n)
  return r > 0 ? '+' + fmt(r) : fmt(r)
}

// Soma de uma expressão só com números e sinais (ex.: "2+1-0,5"). Retorna null se tiver
// qualquer outra coisa (como dados "1d6"), ou se estiver vazia.
export function evalSum(text: string): number | null {
  const t = String(text ?? '').trim()
  if (!t) return null
  const terms = t.match(/[+-]?\s*\d+(?:[.,]\d+)?/g)
  if (!terms) return null
  const rest = t.replace(/[+-]?\s*\d+(?:[.,]\d+)?/g, '').trim()
  if (rest !== '') return null
  return round(terms.reduce((sum, term) => sum + sn(term.replace(/\s+/g, '')), 0))
}

// ----- Classe de armadura -----

export function armorBonus(s: OseSheet): number {
  return round(s.armor.filter((a) => a.worn).reduce((t, a) => t + sn(a.ac), 0))
}

// CA ascendente = 10 + modificador de DES + armaduras, escudos e acessórios equipados.
export function acAscending(s: OseSheet): number {
  return round(AC_BASE + sn(s.abilities.dex.mod) + armorBonus(s))
}

export function acDescending(s: OseSheet): number {
  return DESCENDING_AC_CONSTANT - acAscending(s)
}

export function acShown(s: OseSheet): number {
  return s.settings.acType === 'dac' ? acDescending(s) : acAscending(s)
}

// ----- Ataque -----

// O campo extra pode ter uma soma (entra no total) ou dados (só fica anotado).
export function extraBonus(s: OseSheet): number {
  return evalSum(s.extra) ?? 0
}

// Ascendente: ataque base + extra. Descendente: THAC0 - extra.
export function attackTotal(s: OseSheet): number {
  const extra = extraBonus(s)
  return s.settings.acType === 'dac' ? round(sn(s.thac0) - extra) : round(sn(s.attackBase) + extra)
}

// ----- Armas -----

// Acerto da arma: ataque total (base + extra) com o +Ataque da arma.
// Com CA descendente, o +Ataque diminui o THAC0.
export function weaponHit(s: OseSheet, w: Weapon): number {
  const bonus = sn(w.atk)
  return s.settings.acType === 'dac' ? round(attackTotal(s) - bonus) : round(attackTotal(s) + bonus)
}

export function weaponHitText(s: OseSheet, w: Weapon): string {
  const hit = weaponHit(s, w)
  return s.settings.acType === 'dac' ? fmt(hit) : signed(hit)
}

// Dano da arma: dado + (+Ataque + +Dano). O +Ataque soma no acerto e no dano; o +Dano só no dano.
export function weaponDamage(w: Weapon): string {
  const bonus = round(sn(w.atk) + sn(w.dmg))
  const die = w.die.trim()
  if (!die) return bonus === 0 ? '' : signed(bonus)
  return bonus === 0 ? die : die + signed(bonus)
}

// ----- Peso e carga -----

export function coinsWeight(s: OseSheet): number {
  const c = s.coins
  return round((pn(c.pp) + pn(c.gp) + pn(c.ep) + pn(c.sp) + pn(c.cp)) * COIN_WEIGHT)
}

// Peso de uma linha de equipamento: quantidade x peso de cada unidade. Vazio quando é zero.
export function gearLineText(g: GearItem): string {
  const v = round(pn(g.qty) * pn(g.weight))
  return v ? fmt(v) : ''
}

export function totalWeight(s: OseSheet): number {
  const weapons = s.weapons.reduce((t, w) => t + pn(w.weight), 0)
  const armor = s.armor.reduce((t, a) => t + pn(a.weight), 0)
  const gear = s.gear.reduce((t, g) => t + pn(g.qty) * pn(g.weight), 0)
  return round(coinsWeight(s) + weapons + armor + gear)
}

// Conta itens por local para o modo "por itens": tamanho 0 não conta; tamanho 2 conta em dobro.
export function itemCounts(s: OseSheet): { equipped: number; packed: number } {
  const counts: Record<Location, number> = { equipped: 0, packed: 0, none: 0 }
  const add = (loc: Location, size: string, qty: number) => { counts[loc] += Math.max(0, sn(size)) * qty }
  s.weapons.forEach((w) => add(w.loc, w.size, 1))
  s.armor.forEach((a) => add(a.loc, a.size, 1))
  s.gear.forEach((g) => add(g.loc, g.size, pn(g.qty)))
  return { equipped: counts.equipped, packed: counts.packed }
}

// Em metros: movimento base (exploração) e movimento de encontro.
export interface Movement { explore: number; encounter: number }

function fromExplore(explore: number): Movement {
  return {
    explore,
    encounter: Math.round((explore / ENCOUNTER_DIVISOR) * 10) / 10,
  }
}

// Movimento segundo o tipo de carga escolhido. Retorna null quando a carga não é contada.
export function movement(s: OseSheet): Movement | null {
  const mode = s.settings.encumbrance
  if (mode === 'none') return null

  if (mode === 'basic') {
    let type: 'unarmored' | 'light' | 'heavy' = 'unarmored'
    const order = { unarmored: 0, light: 1, heavy: 2 } as const
    s.armor.filter((a) => a.worn).forEach((a) => { if (order[a.type] > order[type]) type = a.type })
    const row = BASIC_MOVEMENT[type]
    return fromExplore(s.carryingTreasure ? row.withTreasure : row.withoutTreasure)
  }

  if (mode === 'detailed') {
    const w = totalWeight(s)
    const band = DETAILED_MOVEMENT.find(([max]) => w <= max)
    return fromExplore(band ? band[1] : 0)
  }

  // itemBased / itemBasedStr: o modificador de FOR aumenta os limites de itens na mochila.
  const { equipped, packed } = itemCounts(s)
  const bonus = mode === 'itemBasedStr' ? sn(s.abilities.str.mod) : 0
  const band = ITEM_BASED_MOVEMENT.find((b) => equipped <= b.maxEquipped && packed <= b.maxPacked + bonus)
  return fromExplore(band ? band.movement : 0)
}
