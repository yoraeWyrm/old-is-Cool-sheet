<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import { newSpell } from '../lib/model'

    export let data: OseSheet
    export let ro = false

    function add() {
        data.spells = [...data.spells, newSpell()]
    }
    function remove(id: string) {
        data.spells = data.spells.filter((s) => s.id !== id)
        if (data.spells.length === 0) data.spells = [newSpell()]
    }
</script>

<section class="box">
    <h2>Magias por nível</h2>
    <table class="rows">
        <thead>
            <tr>
                <th></th>
                {#each data.slots as _, i}<th class="n">Nv. {i + 1}</th>{/each}
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Disponíveis</th>
                {#each data.slots as slot, i}
                    <td class="n"><input type="text" aria-label="Magias disponíveis do nível {i + 1}" bind:value={slot.avail} readonly={ro} /></td>
                {/each}
            </tr>
            <tr>
                <th scope="row">Total</th>
                {#each data.slots as slot, i}
                    <td class="n"><input type="text" aria-label="Total de magias do nível {i + 1}" bind:value={slot.total} readonly={ro} /></td>
                {/each}
            </tr>
        </tbody>
    </table>
</section>

<section class="box">
    <h2>Magias</h2>
    <table class="rows">
        <thead>
            <tr>
                <th class="n w-s">Mem.</th>
                <th>Nome</th>
                <th class="n w-s">Nv.</th>
                <th class="w-t">Duração</th>
                <th class="w-t">Alcance</th>
                <th>Descrição</th>
                {#if !ro}<th class="w-x"></th>{/if}
            </tr>
        </thead>
        <tbody>
            {#each data.spells as s (s.id)}
                <tr>
                    <td class="n"><input type="text" aria-label="Memorizada" bind:value={s.mem} readonly={ro} /></td>
                    <td><input type="text" aria-label="Nome da magia" bind:value={s.name} readonly={ro} /></td>
                    <td class="n"><input type="text" aria-label="Nível da magia" bind:value={s.level} readonly={ro} /></td>
                    <td><input type="text" aria-label="Duração" bind:value={s.duration} readonly={ro} /></td>
                    <td><input type="text" aria-label="Alcance" bind:value={s.range} readonly={ro} /></td>
                    <td><input type="text" aria-label="Descrição da magia" bind:value={s.desc} readonly={ro} /></td>
                    {#if !ro}
                        <td><button class="x" aria-label="Remover magia" on:click={() => remove(s.id)}>&times;</button></td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
    {#if !ro}<button class="ghost add" on:click={add}>Adicionar magia</button>{/if}
</section>
