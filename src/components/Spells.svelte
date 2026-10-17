<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import SpellGroup from './SpellGroup.svelte'

    export let data: OseSheet
    export let ro = false

    const levels = ['1', '2', '3', '4', '5', '6']
    const runes = [
        { id: 'lesser', name: 'Lesser' },
        { id: 'greater', name: 'Greater' },
        { id: 'mighty', name: 'Mighty' },
    ]
</script>

<section class="box">
    <h2>Magias arcanas</h2>
    {#each levels as lv, i (lv)}
        <SpellGroup bind:data {ro} type="arcane" level={lv} heading={'Nível ' + lv} slotKind="arcane" slotIndex={i} />
    {/each}
</section>

<section class="box">
    <h2>Magias divinas</h2>
    {#each levels as lv, i (lv)}
        <SpellGroup bind:data {ro} type="divine" level={lv} heading={'Nível ' + lv} slotKind="divine" slotIndex={i} />
    {/each}
</section>

<section class="box">
    <h2>Glamour</h2>
    <p class="hint">Magias de glamour podem ser usadas sempre.</p>
    <SpellGroup bind:data {ro} type="glamour" level="" />
</section>

<section class="box">
    <h2>Runas</h2>
    {#each runes as r (r.id)}
        <SpellGroup bind:data {ro} type="rune" level={r.id} heading={r.name} />
    {/each}
</section>
