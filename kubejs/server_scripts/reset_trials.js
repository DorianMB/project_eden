ServerEvents.tags('block', event => {
    event.removeAll('resettable_trial_chambers:items_to_reset')
    event.add('resettable_trial_chambers:items_to_reset', 'minecraft:nether_star')
})