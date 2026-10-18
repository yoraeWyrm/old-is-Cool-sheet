// Valores de regras usados no cálculo de carga e movimento.
// Edite este arquivo para adaptar a ficha à sua mesa.

// Cada moeda pesa 1 (no modo detalhado, o peso é contado em moedas).
export const COIN_WEIGHT = 1

// Movimento em metros por turno de exploração (o movimento de encontro é este valor dividido por 3).

// Modo básico: pelo tipo da armadura mais pesada equipada.
export const BASIC_MOVEMENT = {
  unarmored: { withTreasure: 27, withoutTreasure: 36 },
  light: { withTreasure: 18, withoutTreasure: 27 },
  heavy: { withTreasure: 9, withoutTreasure: 18 },
} as const

// Modo detalhado: [peso máximo, movimento]. Acima do último peso, o movimento é 0.
export const DETAILED_MOVEMENT: Array<[number, number]> = [
  [400, 36],
  [600, 27],
  [800, 18],
  [1600, 9],
]

// Modo por itens: máximo de itens equipados e na mochila para cada faixa de movimento.
export const ITEM_BASED_MOVEMENT = [
  { maxEquipped: 3, maxPacked: 10, movement: 36 },
  { maxEquipped: 5, maxPacked: 12, movement: 27 },
  { maxEquipped: 7, maxPacked: 14, movement: 18 },
  { maxEquipped: 9, maxPacked: 16, movement: 9 },
]

// CA ascendente sem armadura, escudo ou acessórios.
export const AC_BASE = 10

// CA descendente = constante - CA ascendente.
export const DESCENDING_AC_CONSTANT = 19

// Movimento de encontro = movimento base / 3.
export const ENCOUNTER_DIVISOR = 3
