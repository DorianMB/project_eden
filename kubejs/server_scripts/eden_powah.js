ServerEvents.recipes(event => {
    event.custom({
        type: 'powah:energizing',
        ingredients: [
            { item: 'eden:infinity_alloy' },
            { item: 'advanced_ae:quantum_processor' },
            { item: 'powah:energy_cell_nitro' }
        ],
        energy: 1000000000,
        result: {
            id: 'eden:infinity_quantum_battery',
            count: 1
        }
    }).id('eden:powah/infinity_quantum_battery')
})
