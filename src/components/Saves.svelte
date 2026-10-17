<script lang="ts">
    import type { OseSheet } from '../lib/model'

    export let data: OseSheet
    export let ro = false

    const list = [
        { k: 'd', name: 'Morte e veneno' },
        { k: 'w', name: 'Varinhas' },
        { k: 'p', name: 'Paralisia e petrificação' },
        { k: 'b', name: 'Sopro' },
        { k: 's', name: 'Magias, bastões e cajados' },
    ]
</script>

<section class="box">
    <h2>Salvaguardas</h2>
    <table class="rows">
        <tbody>
            {#each list as s (s.k)}
                <tr>
                    <td>{s.name}</td>
                    <td class="n w-s"><input type="text" aria-label="Salvaguarda: {s.name}" bind:value={data.saves[s.k]} readonly={ro} /></td>
                </tr>
            {/each}
            <tr>
                <td class="hint">Mod. de SAB contra magia</td>
                <td class="n"><input type="text" aria-label="Modificador de SAB contra magia" bind:value={data.wisSaveMod} readonly={ro} /></td>
            </tr>
        </tbody>
    </table>
</section>
