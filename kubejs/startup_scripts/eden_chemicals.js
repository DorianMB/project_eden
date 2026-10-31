const $Chemical = Java.loadClass('mekanism.api.chemical.Chemical')
const $ChemicalBuilder = Java.loadClass('mekanism.api.chemical.ChemicalBuilder')

StartupEvents.registry('mekanism:chemical', event => {
    event.createCustom('eden:nether_star', () =>
        new $Chemical(
            $ChemicalBuilder.builder()
                .tint(0xF4F4FF)
        )
    )
})
