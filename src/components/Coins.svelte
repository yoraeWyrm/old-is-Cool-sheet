<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import { coinsWeight, fmt, totalWeight } from '../lib/calc'

    export let data: OseSheet
    export let ro = false

    $: mode = data.settings.encumbrance
    $: weight = totalWeight(data)
    $: coins = coinsWeight(data)
</script>

<section class="box">
    <h2>Moedas</h2>
    <div class="grid g5">
        <label class="f"><span>Platina</span><input type="text" bind:value={data.coins.pp} readonly={ro} /></label>
        <label class="f"><span>Ouro</span><input type="text" bind:value={data.coins.gp} readonly={ro} /></label>
        <label class="f"><span>Electro</span><input type="text" bind:value={data.coins.ep} readonly={ro} /></label>
        <label class="f"><span>Prata</span><input type="text" bind:value={data.coins.sp} readonly={ro} /></label>
        <label class="f"><span>Cobre</span><input type="text" bind:value={data.coins.cp} readonly={ro} /></label>
    </div>
    {#if mode === 'detailed'}
        <p class="hint">Peso das moedas: {fmt(coins)}. Peso total carregado: <strong>{fmt(weight)}</strong>.</p>
    {:else if mode === 'basic'}
        <label class="hint"><input type="checkbox" bind:checked={data.carryingTreasure} disabled={ro} /> Carregando tesouro</label>
    {/if}
</section>
