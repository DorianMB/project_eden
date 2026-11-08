ServerEvents.recipes(event => {
    event.remove({ id: 'javd:portal_block' })
    event.shaped('javd:portal_block', [
        'NNN',
        'NSN',
        'NNN'
    ], {
        N: 'minecraft:netherite_ingot',
        S: 'ae2:singularity'
    })
})
