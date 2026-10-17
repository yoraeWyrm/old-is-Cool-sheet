<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import Backup from './Backup.svelte'

    export let data: OseSheet
    export let ro = false

    const modes = {
        none: 'A carga não é contada.',
        basic: 'Movimento pelo tipo da armadura equipada e por estar carregando tesouro.',
        detailed: 'Soma o peso de moedas, armas, armadura e equipamento, e dá o movimento pelo peso total.',
        itemBased: 'Conta itens equipados e na mochila, pelo tamanho de cada um.',
        itemBasedStr: 'Como o anterior, mas o modificador de FOR aumenta o limite da mochila.',
    }
</script>

<section class="box">
    <h2>Configurações</h2>
    <div class="grid g2">
        <label class="f">
            <span>Tipo de classe de armadura</span>
            <select bind:value={data.settings.acType} disabled={ro}>
                <option value="aac">Ascendente (CAA)</option>
                <option value="dac">Descendente (CAD, com THAC0)</option>
            </select>
        </label>
        <label class="f">
            <span>Tipo de carga</span>
            <select bind:value={data.settings.encumbrance} disabled={ro}>
                <option value="none">Nenhuma</option>
                <option value="basic">Básica</option>
                <option value="detailed">Detalhada (por peso)</option>
                <option value="itemBased">Por itens</option>
                <option value="itemBasedStr">Por itens (com modificador de FOR)</option>
            </select>
        </label>
    </div>
    <p class="hint">{modes[data.settings.encumbrance]}</p>
    <p class="hint">Os valores de movimento ficam no arquivo <code>src/lib/rules.ts</code> do projeto e podem ser editados.</p>
</section>

{#if !ro}
    <Backup />
{/if}
