
const PORTAL_DIMENSION = 'eden:wasteland'
const OVERWORLD = 'minecraft:overworld'

// Coordonnées du portail dans la dimension
const PORTAL_X = 0
const PORTAL_Y = -12
const PORTAL_Z = 0

BlockEvents.rightClicked('eden:portal', event => {
    if (event.hand != 'MAIN_HAND') return

    const player = event.player
    const server = event.server
    const dimension = String(event.level.dimension)

    // Entrée dans la dimension
    if (dimension === OVERWORLD) {

        // Sauvegarde de la position du portail d'origine
        const data = player.persistentData

        data.putDouble('eden_return_x', event.block.x)
        data.putDouble('eden_return_y', event.block.y)
        data.putDouble('eden_return_z', event.block.z)

        server.runCommandSilent(
            `execute in ${PORTAL_DIMENSION} run forceload add ${PORTAL_X} ${PORTAL_Z}`
        )

        // Génération du portail de retour
        server.runCommandSilent(
            `execute in ${PORTAL_DIMENSION} run setblock ${PORTAL_X} ${PORTAL_Y} ${PORTAL_Z} eden:portal`
        )

        // Téléportation du joueur à côté du portail
        player.runCommandSilent(
            `execute in ${PORTAL_DIMENSION} run tp @s 0.5 ${PORTAL_Y} 2.5`
        )

        player.tell('§a[E.D.E.N.] Welcome to the Wasteland!')
    }

    // Retour vers l'Overworld
    else if (dimension === PORTAL_DIMENSION) {

        const data = player.persistentData

        const x = data.getDouble('eden_return_x') + 0.5
        const y = data.getDouble('eden_return_y') + 1
        const z = data.getDouble('eden_return_z') + 1.5

        player.runCommandSilent(
            `execute in ${OVERWORLD} run tp @s ${x} ${y} ${z}`
        )

        player.tell('§a[E.D.E.N.] Returning to the Overworld...')
    }
})
