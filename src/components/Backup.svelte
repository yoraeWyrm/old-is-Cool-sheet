<script lang="ts">
    import { saveAs } from 'file-saver'
    import { sheet } from '../lib/store'
    import { compactSheet, normalizeSheet } from '../lib/model'
    import { inOBR, syncMessage } from '../lib/obr'

    let message = ''
    let text = ''

    function exportFile() {
        const blob = new Blob([JSON.stringify(compactSheet($sheet))], { type: 'application/json' })
        saveAs(blob, 'FichaOSE-' + $sheet.name + '-' + Date.now() + '.json')
    }

    function load(raw: string) {
        try {
            const parsed = JSON.parse(raw)
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('formato')
            sheet.set(normalizeSheet(parsed))
            message = 'Ficha carregada.'
        } catch (e) {
            message = 'Não foi possível ler esse arquivo ou texto.'
        }
    }

    function importFile(e: Event) {
        const input = e.target as HTMLInputElement
        const file = input.files && input.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => load(String(reader.result))
        reader.readAsText(file)
        input.value = ''
    }

    function makeText() {
        text = JSON.stringify(compactSheet($sheet), null, 1)
        message = 'Texto gerado. Copie e guarde onde preferir.'
    }
</script>

<section class="box">
    <h2>Backup</h2>
    <p class="hint">A ficha fica salva neste navegador. Exporte um arquivo para guardar uma cópia ou levar para outro computador.</p>
    <div class="grid g3">
        <button on:click={exportFile}>Exportar arquivo</button>
        <label class="f"><span>Importar arquivo</span><input type="file" accept=".json,application/json" on:change={importFile} /></label>
    </div>
    <details>
        <summary class="hint">Se o download não funcionar, use texto</summary>
        <div class="grid g2">
            <button class="ghost" on:click={makeText}>Gerar texto</button>
            <button class="ghost" on:click={() => load(text)}>Carregar do texto</button>
        </div>
        <textarea aria-label="Texto de backup" bind:value={text}></textarea>
    </details>
    {#if message}<p class="note">{message}</p>{/if}
    <p class="note">
        {#if $inOBR}Conectado ao Owlbear Rodeo. {$syncMessage}{:else}Fora do Owlbear Rodeo: a ficha funciona, mas não é enviada ao narrador.{/if}
    </p>
</section>
