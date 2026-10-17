<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import Portrait from './Portrait.svelte'

    export let data: OseSheet
    export let ro = false
</script>

<section class="box head">
    <Portrait bind:data {ro} />
    <div>
        <div class="grid g2">
            <label class="f"><span>Nome</span><input type="text" bind:value={data.name} readonly={ro} /></label>
            <label class="f"><span>Título</span><input type="text" bind:value={data.title} readonly={ro} /></label>
        </div>
        <div class="grid g3">
            <label class="f"><span>Raça</span><input type="text" bind:value={data.race} readonly={ro} /></label>
            <label class="f"><span>Classe</span><input type="text" bind:value={data.cls} readonly={ro} /></label>
            <label class="f"><span>Alinhamento</span><input type="text" bind:value={data.alignment} readonly={ro} /></label>
        </div>
        <div class="grid g3">
            <label class="f"><span>Nível</span><input type="text" bind:value={data.level} readonly={ro} /></label>
            <label class="f"><span>XP</span><input type="text" bind:value={data.xp} readonly={ro} /></label>
            <label class="f"><span>XP para o próximo nível</span><input type="text" bind:value={data.next} readonly={ro} /></label>
        </div>
    </div>
</section>
