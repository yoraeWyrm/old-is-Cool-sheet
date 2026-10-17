<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import { newSkill } from '../lib/model'

    export let data: OseSheet
    export let ro = false

    function add() {
        data.skills = [...data.skills, newSkill()]
    }
    function remove(id: string) {
        data.skills = data.skills.filter((s) => s.id !== id)
        if (data.skills.length === 0) data.skills = [newSkill()]
    }
</script>

<section class="box">
    <h2>Perícias de exploração</h2>
    <table class="rows">
        <thead>
            <tr>
                <th>Nome</th>
                <th class="w-t">Rolagem</th>
                <th>Descrição</th>
                {#if !ro}<th class="w-x"></th>{/if}
            </tr>
        </thead>
        <tbody>
            {#each data.skills as s (s.id)}
                <tr>
                    <td><input type="text" aria-label="Nome da perícia" bind:value={s.name} readonly={ro} /></td>
                    <td><input type="text" aria-label="Rolagem" bind:value={s.roll} readonly={ro} /></td>
                    <td><input type="text" aria-label="Descrição" bind:value={s.desc} readonly={ro} /></td>
                    {#if !ro}
                        <td><button class="x" aria-label="Remover perícia" on:click={() => remove(s.id)}>&times;</button></td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
    {#if !ro}<button class="ghost add" on:click={add}>Adicionar perícia</button>{/if}
</section>
