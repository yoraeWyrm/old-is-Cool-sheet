// Integração com o Owlbear Rodeo: envio da ficha ao narrador, lista de jogadores e imagem de token.

import OBR from '@owlbear-rodeo/sdk'
import type { Player, Image } from '@owlbear-rodeo/sdk'
import { writable } from 'svelte/store'
import { compactSheet } from './model'
import { sheet } from './store'

// Chave dos metadados do jogador onde a ficha é publicada.
export const NS = 'br.fichaose/sheet'

export const inOBR = writable(false)
export const isGM = writable(false)
export const myId = writable('')
export const players = writable<Player[]>([])
export const syncMessage = writable('')

let timer: ReturnType<typeof setTimeout> | undefined

async function publish(value: unknown) {
  try {
    await OBR.player.setMetadata({ [NS]: value })
    syncMessage.set('Ficha enviada ao narrador.')
  } catch (e) {
    syncMessage.set('Não foi possível enviar a ficha ao narrador. Ela pode estar grande demais.')
  }
}

export function startOBR() {
  OBR.onReady(async () => {
    inOBR.set(true)
    myId.set(await OBR.player.getId())
    const gm = (await OBR.player.getRole()) === 'GM'
    isGM.set(gm)

    if (gm) {
      // O narrador lê as fichas que os jogadores publicam. A ficha dele fica só no navegador.
      players.set(await OBR.party.getPlayers())
      OBR.party.onChange((party) => players.set(party))
    } else {
      sheet.subscribe((value) => {
        clearTimeout(timer)
        timer = setTimeout(() => publish(compactSheet(value)), 600)
      })
    }
  })
}

export async function selectedTokenImage(): Promise<{ url?: string; error?: string }> {
  try {
    const ids = await OBR.player.getSelection()
    if (!ids || ids.length === 0) return { error: 'Selecione um token no mapa e tente de novo.' }
    const items = await OBR.scene.items.getItems(ids)
    const token = items.find((i) => i.type === 'IMAGE') as Image | undefined
    const url = token && token.image ? token.image.url : ''
    if (!/^https?:\/\/\S+$/i.test(url)) return { error: 'O token selecionado não tem uma imagem que possa ser usada.' }
    return { url }
  } catch (e) {
    return { error: 'Não foi possível ler o token. Abra uma cena e tente de novo.' }
  }
}
