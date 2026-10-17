<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import { newArmor } from '../lib/model'
    import { armorBonus, signed } from '../lib/calc'

    export let data: OseSheet

    export let ro = false

    $: showWeight = data.settings.encumbrance === 'detailed'
    $: showType = data.settings.encumbrance === 'basic'
    $: showItems = data.settings.encumbrance === 'itemBased' || data.settings.encumbrance === 'itemBasedStr'
    $: bonus = armorBonus(data)

    function add() {
        data.armor = [...data.armor, newArmor()]
    }
    function remove(id: string) {
        data.armor = data.armor.filter((a) => a.id !== id)
        if (data.armor.length === 0) data.armor = [newArmor()]
    }
</script>

<section class="box">
    <h2>Armadura, escudo e acessórios</h2>
    <table class="rows">
        <thead>
            <tr>
                <th>Nome</th>
                <th class="n w-n">CA</th>
                {#if showWeight}<th class="n w-n">Peso</th>{/if}
                <th class="w-c" title="Marque para somar o valor na CA">Equipado</th>
                {#if showType}<th class="w-t">Tipo</th>{/if}
                {#if showItems}<th class="w-s">Tam.</th><th class="w-l">Local</th>{/if}
                {#if !ro}<th class="w-x"></th>{/if}
            </tr>
        </thead>
        <tbody>
            {#each data.armor as a (a.id)}
                <tr>
                    <td><input type="text" aria-label="Nome da armadura" bind:value={a.name} readonly={ro} /></td>
                    <td class="n"><input type="text" aria-label="Bônus de CA" bind:value={a.ac} readonly={ro} /></td>
                    {#if showWeight}
                        <td class="n"><input type="text" aria-label="Peso da armadura" bind:value={a.weight} readonly={ro} /></td>
                    {/if}
                    <td class="c"><input type="checkbox" aria-label="Equipado" bind:checked={a.worn} disabled={ro} /></td>
                    {#if showType}
                        <td>
                            <select aria-label="Tipo de armadura" bind:value={a.type} disabled={ro}>
                                <option value="unarmored">Nenhum</option><option value="light">Leve</option><option value="heavy">Pesada</option>
                            </select>
                        </td>
                    {/if}
                    {#if showItems}
                        <td>
                            <select aria-label="Tamanho do item" bind:value={a.size} disabled={ro}>
                                <option value="0">0</option><option value="1">1</option><option value="2">2</option>
                            </select>
                        </td>
                        <td>
                            <select aria-label="Local do item" bind:value={a.loc} disabled={ro}>
                                <option value="equipped">Equipado</option><option value="packed">Mochila</option><option value="none">Fora</option>
                            </select>
                        </td>
                    {/if}
                    {#if !ro}
                        <td><button class="x" aria-label="Remover armadura" on:click={() => remove(a.id)}>&times;</button></td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
    <p class="hint">A CA começa em 10. Digite o bônus de cada peça (couro +2, escudo +1, anel +1) e marque como equipada para somar na CA ({signed(bonus)} no total). Use uma linha para cada armadura, escudo ou acessório.</p>
    {#if !ro}<button class="ghost add" on:click={add}>Adicionar peça</button>{/if}
</section>
