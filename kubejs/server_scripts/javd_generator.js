ServerEvents.tags('block', event => {
    event.removeAll('javd:generator')
    event.add('javd:generator', 'minecraft:stone')
})
