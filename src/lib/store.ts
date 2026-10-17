// Estado da ficha deste jogador, guardado no navegador (como no DummySheet).

import { writable } from 'svelte/store'
import { defaultSheet, normalizeSheet } from './model'
import type { OseSheet } from './model'

const KEY = 'fichaose:v1'

function load(): OseSheet {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return normalizeSheet(JSON.parse(raw))
  } catch (e) {
    /* usa a ficha inicial */
  }
  return defaultSheet()
}

export const sheet = writable<OseSheet>(load())

sheet.subscribe((value) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value))
  } catch (e) {
    /* sem armazenamento disponível */
  }
})
