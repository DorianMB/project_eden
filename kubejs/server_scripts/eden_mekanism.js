ServerEvents.recipes(event => {

    // Nether Star -> 40 unités de Chemical
    event.custom({
        type: 'mekanism:chemical_conversion',
        input: {
            item: 'minecraft:nether_star',
            count: 1
        },
        output: {
            id: 'eden:nether_star',
            amount: 40
        }
    }).id('eden:mekanism/nether_star_conversion')

    // Atomic Alloy + Nether Star Chemical -> Infinity Alloy
    event.custom({
        type: 'mekanism:metallurgic_infusing',
        item_input: {
            item: 'mekanism:alloy_atomic',
            count: 1
        },
        chemical_input: {
            chemical: 'eden:nether_star',
            amount: 40
        },
        output: {
            id: 'eden:infinity_alloy',
            count: 1
        },
        per_tick_usage: false
    }).id('eden:mekanism/infinity_alloy')

})
