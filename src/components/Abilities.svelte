<script lang="ts">
    import type { OseSheet } from '../lib/model'

    export let data: OseSheet
    export let ro = false

    const list = [
        { k: 'str', ab: 'FOR', fx: 'Ataque e dano corpo a corpo, abrir portas' },
        { k: 'int', ab: 'INT', fx: 'Idiomas, alfabetização' },
        { k: 'wis', ab: 'SAB', fx: 'Salvaguardas contra magia' },
        { k: 'dex', ab: 'DES', fx: 'Ataque à distância, CA, iniciativa' },
        { k: 'con', ab: 'CON', fx: 'Pontos de vida' },
        { k: 'cha', ab: 'CAR', fx: 'Reações, seguidores, lealdade' },
    ]
</script>

<section class="box">
    <h2>Atributos</h2>
    <table class="rows abil">
        <thead>
            <tr><th></th><th class="n w-s">Valor</th><th class="n w-s">Mod.</th><th>Afeta</th></tr>
        </thead>
        <tbody>
            {#each list as a (a.k)}
                <tr>
                    <th scope="row">{a.ab}</th>
                    <td class="n"><input type="text" aria-label="Valor de {a.ab}" bind:value={data.abilities[a.k].score} readonly={ro} /></td>
                    <td class="n"><input type="text" aria-label="Modificador de {a.ab}" bind:value={data.abilities[a.k].mod} readonly={ro} /></td>
                    <td class="hint">{a.fx}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>
