<script lang="ts">
    import type { OseSheet } from '../lib/model'

    export let data: OseSheet
    export let ro = false
</script>

<section class="box">
    <h2>Notas</h2>
    <textarea aria-label="Notas" style="min-height: 24rem" bind:value={data.notes} readonly={ro}></textarea>
</section>
