// Valores de regras usados no cálculo de carga e movimento.
// Edite este arquivo para adaptar a ficha à sua mesa.

// Cada moeda pesa 1 (no modo detalhado, o peso é contado em moedas).
export const COIN_WEIGHT = 1

// Modo básico: movimento de exploração (pés por turno) pelo tipo da armadura mais pesada equipada.
export const BASIC_MOVEMENT = {
  unarmored: { withTreasure: 90, withoutTreasure: 120 },
  light: { withTreasure: 60, withoutTreasure: 90 },
  heavy: { withTreasure: 30, withoutTreasure: 60 },
} as const

// Modo detalhado: [peso máximo, movimento]. Acima do último peso, o movimento é 0.
export const DETAILED_MOVEMENT: Array<[number, number]> = [
  [400, 120],
  [600, 90],
  [800, 60],
  [1600, 30],
]

// Modo por itens: máximo de itens equipados e na mochila para cada faixa de movimento.
export const ITEM_BASED_MOVEMENT = [
  { maxEquipped: 3, maxPacked: 10, movement: 120 },
  { maxEquipped: 5, maxPacked: 12, movement: 90 },
  { maxEquipped: 7, maxPacked: 14, movement: 60 },
  { maxEquipped: 9, maxPacked: 16, movement: 30 },
]

// CA ascendente sem armadura, escudo ou acessórios.
export const AC_BASE = 10

// CA descendente = constante - CA ascendente.
export const DESCENDING_AC_CONSTANT = 19

// Encontro = movimento / 3 (pés por rodada). Viagem = movimento / 5 (milhas por dia).
export const ENCOUNTER_DIVISOR = 3
export const OVERLAND_DIVISOR = 5
