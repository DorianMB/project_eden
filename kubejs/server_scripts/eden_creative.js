ServerEvents.recipes(event => {
    event.custom({
        type: 'powah:energizing',
        ingredients: [
            { item: 'eden:infinity_alloy' },
            { item: 'eden:infinity_alloy' },
            { item: 'powah:energy_cell_nitro' },
            { item: 'powah:energy_cell_nitro' },
            { item: 'powah:energy_cell_nitro' },
            { item: 'powah:energy_cell_nitro' },
            { item: 'extendedcrafting:ultimate_singularity' }
        ],
        energy: 2000000000,
        result: {
            id: 'powah:energy_cell_creative',
            count: 1
        }
    }).id('powah:energy_cell_creative')

    event.custom({
        type: 'powah:energizing',
        ingredients: [
            { item: 'ae2omnicells:creative_ae_cell_biginteger' },
            { item: 'eden:infinity_alloy' },
            { item: 'eden:infinity_quantum_battery' },
            { item: 'powah:energy_cell_creative' },
            { item: 'extendedcrafting:ultimate_singularity' },
        ],
        energy: 10000000000,
        result: {
            id: 'ae2:creative_storage_cell',
            count: 1
        }
    }).id('ae2:creative_storage_cell')

    event.custom({
        type: 'powah:energizing',
        ingredients: [
            { item: 'ae2omnicells:creative_ae_cell_biginteger' },
            { item: 'eden:infinity_alloy' },
            { item: 'eden:infinity_quantum_battery' },
            { item: 'modularrouters:puller_module_2' },
            { item: 'extendedcrafting:ultimate_singularity' },
        ],
        energy: 10000000000,
        result: {
            id: 'modularrouters:creative_module',
            count: 1
        }
    }).id('modularrouters:creative_module')

    event.custom({
        type: 'powah:energizing',
        ingredients: [
            { item: 'ae2omnicells:creative_ae_cell_biginteger' },
            { item: 'eden:infinity_alloy' },
            { item: 'eden:infinity_quantum_battery' },
            { item: 'functionalstorage:netherite_upgrade' },
            { item: 'extendedcrafting:ultimate_singularity' },
        ],
        energy: 10000000000,
        result: {
            id: 'functionalstorage:creative_vending_upgrade',
            count: 1
        }
    }).id('functionalstorage:creative_vending_upgrade')
})