<script lang="ts">
    import type { OseSheet, SpellType } from '../lib/model'
    import { newSpell } from '../lib/model'
    import SpellCard from './SpellCard.svelte'

    export let data: OseSheet
    export let ro = false
    export let type: SpellType
    export let level = ''
    export let heading = ''
    // 'arcane' ou 'divine' mostram os espaços de magia deste nível; vazio não mostra.
    export let slotKind = ''
    export let slotIndex = 0

    $: showMem = type === 'arcane' || type === 'divine'
    $: count = data.spells.filter((s) => s.type === type && s.level === level).length

    function add() {
        data.spells = [...data.spells, newSpell(type, level)]
    }
    function remove(id: string) {
        data.spells = data.spells.filter((s) => s.id !== id)
    }
</script>

<div class="group">
    {#if heading || slotKind}
        <div class="group-head">
            <h3>{heading}</h3>
            {#if slotKind === 'arcane'}
                <span class="slots">
                    <label>Disponíveis <input type="text" aria-label="Magias disponíveis" bind:value={data.arcaneSlots[slotIndex].avail} readonly={ro} /></label>
                    <label>Total <input type="text" aria-label="Total de magias" bind:value={data.arcaneSlots[slotIndex].total} readonly={ro} /></label>
                </span>
            {:else if slotKind === 'divine'}
                <span class="slots">
                    <label>Disponíveis <input type="text" aria-label="Magias disponíveis" bind:value={data.divineSlots[slotIndex].avail} readonly={ro} /></label>
                    <label>Total <input type="text" aria-label="Total de magias" bind:value={data.divineSlots[slotIndex].total} readonly={ro} /></label>
                </span>
            {/if}
        </div>
    {/if}

    {#each data.spells as s, i (s.id)}
        {#if s.type === type && s.level === level}
            <SpellCard bind:spell={data.spells[i]} {ro} {showMem} on:remove={() => remove(s.id)} />
        {/if}
    {/each}

    {#if count === 0}
        <p class="hint">Nenhuma magia aqui.</p>
    {/if}
    {#if !ro}
        <button class="ghost add" on:click={add}>Adicionar magia</button>
    {/if}
</div>
