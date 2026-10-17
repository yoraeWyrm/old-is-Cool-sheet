<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import Header from './Header.svelte'
    import Abilities from './Abilities.svelte'
    import Saves from './Saves.svelte'
    import Combat from './Combat.svelte'
    import Weapons from './Weapons.svelte'
    import Armor from './Armor.svelte'
    import Gear from './Gear.svelte'
    import Coins from './Coins.svelte'
    import Skills from './Skills.svelte'

    export let data: OseSheet
    export let ro = false
</script>

<Header bind:data {ro} />

<div class="cols">
    <Abilities bind:data {ro} />
    <Saves bind:data {ro} />
</div>

<Combat bind:data {ro} />
<Weapons bind:data {ro} />

<section class="box">
    <h2>Atributos de classe e raça</h2>
    <textarea aria-label="Atributos de classe e raça" bind:value={data.classRace} readonly={ro}></textarea>
</section>

<Skills bind:data {ro} />
<Gear bind:data {ro} />
<Armor bind:data {ro} />
<Coins bind:data {ro} />

<section class="box">
    <h2>Antecedentes</h2>
    <textarea aria-label="Antecedentes" bind:value={data.background} readonly={ro}></textarea>
</section>

<section class="box">
    <h2>Anotações</h2>
    <textarea aria-label="Anotações do personagem" bind:value={data.charNotes} readonly={ro}></textarea>
</section>
