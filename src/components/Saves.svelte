<script lang="ts">
    import type { OseSheet } from '../lib/model'

    export let data: OseSheet
    export let ro = false

    const list = [
        { k: 'd', name: 'Ruína' },
        { k: 'w', name: 'Varinha' },
        { k: 'p', name: 'Paralisia' },
        { k: 'b', name: 'Sopro' },
        { k: 's', name: 'Feitiço' },
    ]
</script>

<section class="box">
    <h2>Salvaguardas</h2>
    <table class="rows">
        <tbody>
            {#each list as s (s.k)}
                <tr>
                    <td><span class="badge wide">{s.name}</span></td>
                    <td class="n w-s"><input type="text" aria-label="Salvaguarda: {s.name}" bind:value={data.saves[s.k]} readonly={ro} /></td>
                </tr>
            {/each}
            <tr>
                <td><span class="badge wide soft">Mod. de SAB contra magia</span></td>
                <td class="n"><input type="text" aria-label="Modificador de SAB contra magia" bind:value={data.wisSaveMod} readonly={ro} /></td>
            </tr>
        </tbody>
    </table>
</section>
