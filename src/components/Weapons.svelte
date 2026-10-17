<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import { newWeapon } from '../lib/model'
    import { weaponDamage, weaponHitText } from '../lib/calc'

    export let data: OseSheet
    export let ro = false

    $: showWeight = data.settings.encumbrance === 'detailed'
    $: showItems = data.settings.encumbrance === 'itemBased' || data.settings.encumbrance === 'itemBasedStr'

    function add() {
        data.weapons = [...data.weapons, newWeapon()]
    }
    function remove(id: string) {
        data.weapons = data.weapons.filter((w) => w.id !== id)
        if (data.weapons.length === 0) data.weapons = [newWeapon()]
    }
</script>

<section class="box">
    <h2>Armas</h2>
    <table class="rows">
        <thead>
            <tr>
                <th>Nome</th>
                <th class="n w-n">+Ataque</th>
                <th class="w-n">Dado de dano</th>
                <th class="n w-n">+Dano</th>
                {#if showWeight}<th class="n w-n">Peso</th>{/if}
                <th class="n w-n" title="Ataque total + o +Ataque da arma">Acerto</th>
                <th class="w-t" title="Dado + (+Ataque + +Dano)">Dano total</th>
                {#if showItems}<th class="w-s">Tam.</th><th class="w-l">Local</th>{/if}
                {#if !ro}<th class="w-x"></th>{/if}
            </tr>
        </thead>
        <tbody>
            {#each data.weapons as w (w.id)}
                <tr>
                    <td><input type="text" aria-label="Nome da arma" bind:value={w.name} readonly={ro} /></td>
                    <td class="n"><input type="text" aria-label="Bônus de ataque" bind:value={w.atk} readonly={ro} /></td>
                    <td><input type="text" aria-label="Dado de dano" bind:value={w.die} readonly={ro} /></td>
                    <td class="n"><input type="text" aria-label="Bônus de dano" bind:value={w.dmg} readonly={ro} /></td>
                    {#if showWeight}
                        <td class="n"><input type="text" aria-label="Peso da arma" bind:value={w.weight} readonly={ro} /></td>
                    {/if}
                    <td class="n"><output>{weaponHitText(data, w)}</output></td>
                    <td><output>{weaponDamage(w)}</output></td>
                    {#if showItems}
                        <td>
                            <select aria-label="Tamanho do item" bind:value={w.size} disabled={ro}>
                                <option value="0">0</option><option value="1">1</option><option value="2">2</option>
                            </select>
                        </td>
                        <td>
                            <select aria-label="Local do item" bind:value={w.loc} disabled={ro}>
                                <option value="equipped">Equipado</option><option value="packed">Mochila</option><option value="none">Fora</option>
                            </select>
                        </td>
                    {/if}
                    {#if !ro}
                        <td><button class="x" aria-label="Remover arma" on:click={() => remove(w.id)}>&times;</button></td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
    <p class="hint">O +Ataque soma no acerto e no dano. O +Dano soma só no dano.</p>
    {#if !ro}<button class="ghost add" on:click={add}>Adicionar arma</button>{/if}
</section>
