<script lang="ts">
    import type { OseSheet } from '../lib/model'
    import { AC_BASE } from '../lib/rules'
    import { acShown, armorBonus, attackTotal, fmt, itemCounts, movement, signed, sn, totalWeight } from '../lib/calc'

    export let data: OseSheet
    export let ro = false

    $: dac = data.settings.acType === 'dac'
    $: mode = data.settings.encumbrance
    $: ac = acShown(data)
    $: armor = armorBonus(data)
    $: dexMod = sn(data.abilities.dex.mod)
    $: reaction = signed(sn(data.abilities.cha.mod))
    $: attack = attackTotal(data)
    $: mov = movement(data)
    $: counts = itemCounts(data)
    $: load =
        mode === 'detailed'
            ? fmt(totalWeight(data))
            : mode === 'itemBased' || mode === 'itemBasedStr'
              ? counts.equipped + ' equip. / ' + counts.packed + ' mochila'
              : '—'
</script>

<section class="box">
    <h2>Combate e encontros</h2>

    <div class="grid g4">
        <label class="f"><span>PV</span><input type="text" bind:value={data.hp} readonly={ro} /></label>
        <label class="f"><span>PV máx.</span><input type="text" bind:value={data.hpMax} readonly={ro} /></label>
        <label class="f"><span>Dados de vida</span><input type="text" bind:value={data.hitDice} readonly={ro} /></label>
        <label class="f"><span>Mod. CON (PV)</span><input type="text" bind:value={data.conMod} readonly={ro} /></label>
    </div>

    <div class="grid g4">
        <div class="f"><span>CA {dac ? '(descendente)' : '(ascendente)'}</span><output class="calc hl">{fmt(ac)}</output></div>
        <div class="f"><span>Base</span><output class="calc">{AC_BASE}</output></div>
        <div class="f"><span>Mod. DES</span><output class="calc">{signed(dexMod)}</output></div>
        <div class="f"><span>Armadura, escudo e acessórios</span><output class="calc">{signed(armor)}</output></div>
    </div>

    <div class="grid g4">
        {#if dac}
            <label class="f"><span>THAC0 base</span><input type="text" bind:value={data.thac0} readonly={ro} /></label>
        {:else}
            <label class="f"><span>Ataque base (da classe)</span><input type="text" bind:value={data.attackBase} readonly={ro} /></label>
        {/if}
        <label class="f span2"><span>Extra (soma numérica ou dado)</span><input type="text" bind:value={data.extra} readonly={ro} /></label>
        <div class="f"><span>{dac ? 'THAC0 total' : 'Ataque total'}</span><output class="calc hl">{dac ? fmt(attack) : signed(attack)}</output></div>
    </div>
    <p class="hint">Somas no campo extra entram no total. Dados ficam só anotados. O acerto de cada arma, com o +Ataque dela, aparece na tabela de armas.</p>

    <div class="grid g4">
        <label class="f"><span>Iniciativa</span><input type="text" bind:value={data.initiative} readonly={ro} /></label>
        <div class="f"><span>Ajuste de reação</span><output class="calc hl">{reaction}</output></div>
        <div class="f"><span>Peso total</span><output class="calc hl">{load}</output></div>
        <div class="f"><span>Movimento base (encontro)</span><output class="calc">{mov ? fmt(mov.explore) + ' m (' + fmt(mov.encounter) + ' m)' : '—'}</output></div>
    </div>
</section>
