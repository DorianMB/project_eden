StartupEvents.registry('block', event => {
    event.create('eden:portal')
        .displayName('E.D.E.N. Portal')
        .hardness(5.0)
        .resistance(50.0)
        .requiresTool(true)
        .tagBlock('minecraft:mineable/pickaxe')
        .lightLevel(10)
})

