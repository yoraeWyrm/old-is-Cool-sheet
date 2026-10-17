<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import { inOBR, selectedTokenImage } from '../lib/obr'

    export let data: OseSheet
    export let ro = false

    let open = false
    let message = ''
    let broken = false

    $: if (data.image) broken = false
    $: hasImage = !!data.image && !broken

    function onUrl(e: Event) {
        const value = (e.target as HTMLInputElement).value.trim()
        if (value === '') {
            data.image = ''
            message = ''
        } else if (/^https?:\/\/\S+$/i.test(value)) {
            data.image = value
            message = ''
        } else {
            message = 'Use um endereço que comece com http:// ou https://.'
        }
    }

    function clearImage() {
        data.image = ''
        message = ''
    }

    async function useToken() {
        const result = await selectedTokenImage()
        if (result.url) {
            data.image = result.url
            message = ''
            open = false
        } else {
            message = result.error || ''
        }
    }
</script>

<div class="portrait">
    {#if hasImage}
        <img class="pic" src={data.image} alt="Imagem do personagem" referrerpolicy="no-referrer" on:error={() => (broken = true)} />
    {:else}
        <div class="pic ph">{ro ? 'Sem imagem' : broken ? 'Imagem indisponível' : 'Sem imagem'}</div>
    {/if}
    {#if !ro}
        <button class="ghost" on:click={() => (open = !open)}>{hasImage ? 'Trocar imagem' : 'Adicionar imagem'}</button>
        {#if open}
            <div class="panel">
                <input type="text" placeholder="https://..." value={data.image} on:change={onUrl} aria-label="Endereço da imagem" />
                {#if $inOBR}
                    <button class="ghost" on:click={useToken}>Usar token selecionado</button>
                {/if}
                <button class="ghost" on:click={clearImage}>Remover imagem</button>
                {#if message}<p class="note">{message}</p>{/if}
            </div>
        {/if}
    {/if}
</div>
