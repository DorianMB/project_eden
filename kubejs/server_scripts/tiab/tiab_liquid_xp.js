/*
 * Project E.D.E.N.
 * Liquid XP -> Time in a Bottle
 *
 * 10000 mB de Liquid XP = 600 secondes
 * Minecraft 1.21.1 / NeoForge
 */

// Configuration
const EDEN_XP_COST = 10000
const EDEN_TIME_REWARD = 1000
const EDEN_XP_DEBUG = false

// Identifiants supplémentaires acceptés.
// À compléter seulement si nécessaire.
const EDEN_XP_EXTRA_FLUIDS = []

// API NeoForge
const $Capabilities = Java.loadClass(
    'net.neoforged.neoforge.capabilities.Capabilities'
)

const $FluidAction = Java.loadClass(
    'net.neoforged.neoforge.fluids.capability.IFluidHandler$FluidAction'
)

const $Direction = Java.loadClass(
    'net.minecraft.core.Direction'
)

const $Registries = Java.loadClass(
    'net.minecraft.core.registries.BuiltInRegistries'
)

// Vérifie si le fluide est de l'XP liquide
function edenIsXPFluid(fluidId) {
    var id = String(fluidId).toLowerCase()

    if (EDEN_XP_EXTRA_FLUIDS.indexOf(id) !== -1) {
        return true
    }

    // Détection générique des noms contenant
    // xp ou experience comme mot distinct.
    return /(^|[:_\/])(xp|experience)([_\/]|$)/.test(id)
}

// Récupère l'identifiant d'un fluide
function edenGetFluidId(stack) {
    return String(
        $Registries.FLUID.getKey(stack.getFluid())
    )
}

// Recherche un réservoir accessible
function edenFindXPHandler(level, pos) {
    var sides = [
        null,
        $Direction.UP,
        $Direction.DOWN,
        $Direction.NORTH,
        $Direction.SOUTH,
        $Direction.EAST,
        $Direction.WEST
    ]

    for (var s = 0; s < sides.length; s++) {
        var handler = level.getCapability(
            $Capabilities.FluidHandler.BLOCK,
            pos,
            sides[s]
        )

        if (handler == null) {
            continue
        }

        for (var i = 0; i < handler.getTanks(); i++) {
            var stored = handler.getFluidInTank(i)

            if (stored.isEmpty()) {
                continue
            }

            var fluidId = edenGetFluidId(stored)

            if (EDEN_XP_DEBUG) {
                console.info(
                    '[E.D.E.N.] Fluid found: ' +
                    fluidId + ' (' +
                    stored.getAmount() + ' mB)'
                )
            }

            if (!edenIsXPFluid(fluidId)) {
                continue
            }

            if (stored.getAmount() < EDEN_XP_COST) {
                continue
            }

            // Simule le retrait, sans modifier le tank
            var request = stored.copyWithAmount(
                EDEN_XP_COST
            )

            var simulated = handler.drain(
                request,
                $FluidAction.SIMULATE
            )

            if (
                simulated.isEmpty() ||
                simulated.getAmount() !== EDEN_XP_COST ||
                edenGetFluidId(simulated) !== fluidId
            ) {
                continue
            }

            return {
                handler: handler,
                tank: i,
                fluidId: fluidId,
                request: request
            }
        }
    }

    return null
}

// Clic droit sur un bloc avec la bouteille
BlockEvents.rightClicked(event => {

    // Check shared TIAB setting
    // Missing key = disabled by default
    if (!event.server.persistentData.getBoolean(
        'eden_tiab_enabled'
    )) {
        return
    }


    if (String(event.hand) !== 'MAIN_HAND') {
        return
    }

    // Time in a Bottle uniquement
    if (
        String(event.item.id) !==
        'tiab:time_in_a_bottle'
    ) {
        return
    }

    var player = event.player
    var level = event.level
    var block = event.block

    try {
        var result = edenFindXPHandler(
            level,
            block.pos
        )

        if (result == null) {
            // Aucun réservoir XP compatible
            // ou quantité insuffisante
            return
        }

        // Quantité avant extraction
        var before = result.handler
            .getFluidInTank(result.tank)
            .getAmount()

        // Consommation réelle du fluide
        var drained = result.handler.drain(
            result.request,
            $FluidAction.EXECUTE
        )

        if (
            drained.isEmpty() ||
            drained.getAmount() !== EDEN_XP_COST ||
            edenGetFluidId(drained) !== result.fluidId
        ) {
            console.warn(
                '[E.D.E.N.] XP extraction failed'
            )
            event.cancel()
            return
        }

        // Vérification de la diminution réelle
        var after = result.handler
            .getFluidInTank(result.tank)
            .getAmount()

        if (before - after !== EDEN_XP_COST) {
            console.warn(
                '[E.D.E.N.] XP tank amount did not ' +
                'decrease as expected. No reward.'
            )
            event.cancel()
            return
        }

        // Commande exécutée par la console serveur
        var command =
            'tiab time add ' +
            player.username + ' ' +
            EDEN_TIME_REWARD

        event.server.runCommandSilent(command)

        player.tell(
            '§b[E.D.E.N.] §a+' + EDEN_TIME_REWARD + ' seconds stored! ' +
            '§7(-' + EDEN_XP_COST + ' mB Liquid XP)'
        )

        if (EDEN_XP_DEBUG) {
            console.info(
                '[E.D.E.N.] ' + player.username +
                ' converted ' + EDEN_XP_COST + ' mB of ' +
                result.fluidId +
                ' into ' + EDEN_TIME_REWARD + ' seconds.'
            )
        }

        // Empêche l'interaction normale avec le tank
        event.cancel()

    } catch (error) {
        console.error(
            '[E.D.E.N.] TIAB conversion error: ' +
            error
        )
    }
})
