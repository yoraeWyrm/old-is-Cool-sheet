<script lang="ts">
    import { sheet } from './lib/store'
    import { isGM, players, NS, inOBR, syncMessage } from './lib/obr'
    import { normalizeSheet } from './lib/model'
    import type { OseSheet } from './lib/model'
    import Character from './components/Character.svelte'
    import Spells from './components/Spells.svelte'
    import Notes from './components/Notes.svelte'
    import Settings from './components/Settings.svelte'

    const tabs = [
        { id: 'char', label: 'Personagem' },
        { id: 'spells', label: 'Magias' },
        { id: 'notes', label: 'Notas' },
        { id: 'settings', label: 'Configurações' },
    ]

    let tab = 'char'
    let viewing = 'me'


    // Jogadores que já publicaram uma ficha (só o narrador usa esta lista).
    $: others = $players.filter((p) => p.metadata && p.metadata[NS])
    $: other = viewing === 'me' ? null : others.find((p) => p.id === viewing)
    $: viewed = other ? (normalizeSheet(other.metadata[NS]) as OseSheet) : null

    // Volta à ficha própria caso o jogador selecionado não esteja mais disponível.
    $: if (viewing !== 'me' && !others.some((p) => p.id === viewing)) {
        viewing = 'me'
    }


    function optionLabel(p: { name: string; metadata: Record<string, unknown> }): string {
        return p.name + ' (' + normalizeSheet(p.metadata[NS]).name + ')'
    }
</script>

<main class="app">
    <nav class="topbar">
        <div class="tabs">
            {#each tabs as t (t.id)}
                <button class="tab" class:on={tab === t.id} on:click={() => (tab = t.id)}>{t.label}</button>
            {/each}
        </div>
        {#if $isGM}
            <label class="viewing">
                <span>Ficha de</span>
                <select bind:value={viewing}>
                    <option value="me">Minha ficha</option>
                    {#each others as p (p.id)}
                        <option value={p.id}>{optionLabel(p)}</option>
                    {/each}
                </select>
            </label>
        {/if}
    </nav>

    {#if viewed}
        {#if tab === 'char'}
            <Character data={viewed} ro={true} />
        {:else if tab === 'spells'}
            <Spells data={viewed} ro={true} />
        {:else if tab === 'notes'}
            <Notes data={viewed} ro={true} />
        {:else}
            <Settings data={viewed} ro={true} />
        {/if}
    {:else}
        {#if tab === 'char'}
            <Character bind:data={$sheet} />
        {:else if tab === 'spells'}
            <Spells bind:data={$sheet} />
        {:else if tab === 'notes'}
            <Notes bind:data={$sheet} />
        {:else}
            <Settings bind:data={$sheet} />
        {/if}
    {/if}
</main>
