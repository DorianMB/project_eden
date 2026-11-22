const BeeReloadListener = Java.loadClass(
    'cy.jdkdigital.productivebees.setup.BeeReloadListener'
)

ServerEvents.loaded(event => {
    const bee = BeeReloadListener.INSTANCE.getData('productivebees:spirited_crystal')

    if (bee == null) {
        console.error('[E.D.E.N.] Spirited Bee not found!')
        return
    }

    bee.putBoolean('selfbreed', true)

    console.info('[E.D.E.N.] Spirited Bee self-breeding enabled!')
})