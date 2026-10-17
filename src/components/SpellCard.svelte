<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import type { Spell } from '../lib/model'

    export let spell: Spell
    export let ro = false
    export let showMem = false

    const dispatch = createEventDispatcher()
    const names: Record<string, string> = { arcane: 'Arcana', divine: 'Divina', glamour: 'Glamour', rune: 'Runa' }
    const runeLevels: Record<string, string> = { lesser: 'Lesser', greater: 'Greater', mighty: 'Mighty' }

    $: tag =
        spell.type === 'rune'
            ? names.rune + ' · ' + runeLevels[spell.level]
            : spell.type === 'glamour'
              ? names.glamour
              : names[spell.type] + ' · Nv. ' + spell.level
</script>

<div class="card">
    <div class="card-head">
        <input class="card-name" type="text" placeholder="Nome da magia" aria-label="Nome da magia" bind:value={spell.name} readonly={ro} />
        <span class="tag">{tag}</span>
        {#if !ro}
            <button class="x" aria-label="Remover magia" on:click={() => dispatch('remove')}>&times;</button>
        {/if}
    </div>
    <div class="grid {showMem ? 'g3' : 'g2'}">
        {#if showMem}
            <label class="f"><span>Memorizada</span><input type="text" bind:value={spell.mem} readonly={ro} /></label>
        {/if}
        <label class="f"><span>Duração</span><input type="text" bind:value={spell.duration} readonly={ro} /></label>
        <label class="f"><span>Alcance</span><input type="text" bind:value={spell.range} readonly={ro} /></label>
    </div>
    <label class="f"><span>Descrição</span><textarea rows="2" bind:value={spell.desc} readonly={ro}></textarea></label>
</div>
