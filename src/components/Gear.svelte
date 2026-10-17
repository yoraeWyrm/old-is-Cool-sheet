<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import { newGear } from '../lib/model'

    export let data: OseSheet
    export let ro = false

    $: showWeight = data.settings.encumbrance === 'detailed'
    $: showItems = data.settings.encumbrance === 'itemBased' || data.settings.encumbrance === 'itemBasedStr'

    function add() {
        data.gear = [...data.gear, newGear()]
    }
    function remove(id: string) {
        data.gear = data.gear.filter((g) => g.id !== id)
        if (data.gear.length === 0) data.gear = [newGear()]
    }
</script>

<section class="box">
    <h2>Equipamento</h2>
    <table class="rows">
        <thead>
            <tr>
                <th class="n w-s">Qtd</th>
                <th>Nome</th>
                <th>Descrição</th>
                {#if showWeight}<th class="n w-n">Peso</th>{/if}
                {#if showItems}<th class="w-s">Tam.</th><th class="w-l">Local</th>{/if}
                {#if !ro}<th class="w-x"></th>{/if}
            </tr>
        </thead>
        <tbody>
            {#each data.gear as g (g.id)}
                <tr>
                    <td class="n"><input type="text" aria-label="Quantidade" bind:value={g.qty} readonly={ro} /></td>
                    <td><input type="text" aria-label="Nome do item" bind:value={g.name} readonly={ro} /></td>
                    <td><input type="text" aria-label="Descrição do item" bind:value={g.desc} readonly={ro} /></td>
                    {#if showWeight}
                        <td class="n"><input type="text" aria-label="Peso de cada unidade" bind:value={g.weight} readonly={ro} /></td>
                    {/if}
                    {#if showItems}
                        <td>
                            <select aria-label="Tamanho do item" bind:value={g.size} disabled={ro}>
                                <option value="0">0</option><option value="1">1</option><option value="2">2</option>
                            </select>
                        </td>
                        <td>
                            <select aria-label="Local do item" bind:value={g.loc} disabled={ro}>
                                <option value="equipped">Equipado</option><option value="packed">Mochila</option><option value="none">Fora</option>
                            </select>
                        </td>
                    {/if}
                    {#if !ro}
                        <td><button class="x" aria-label="Remover item" on:click={() => remove(g.id)}>&times;</button></td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
    {#if showWeight}<p class="hint">O peso é o de cada unidade. O total multiplica pela quantidade.</p>{/if}
    {#if !ro}<button class="ghost add" on:click={add}>Adicionar item</button>{/if}
</section>
