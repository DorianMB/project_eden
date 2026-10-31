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
})
