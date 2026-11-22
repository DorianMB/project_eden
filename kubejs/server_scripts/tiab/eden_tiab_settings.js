/*
 * Project E.D.E.N. - TIAB Settings
 *
 * Shared setting for:
 * - Liquid XP -> Time conversion
 * - Offline time accumulation
 *
 * Default: DISABLED
 * Admin only
 */

const EDEN_TIAB_ENABLED_KEY = 'eden_tiab_enabled'

// Admin command: /edentime
ServerEvents.basicCommand('edentime', event => {
    var action = String(event.input)
        .trim()
        .toLowerCase()

    var data = event.server.persistentData

    if (action === 'true') {
        data.putBoolean(EDEN_TIAB_ENABLED_KEY, true)

        event.respond(
            '§b[E.D.E.N.] §aTime features enabled.'
        )
        return
    }

    if (action === 'false') {
        data.putBoolean(EDEN_TIAB_ENABLED_KEY, false)

        event.respond(
            '§b[E.D.E.N.] §cTime features disabled.'
        )
        return
    }

    if (action === 'status') {
        var enabled = data.getBoolean(
            EDEN_TIAB_ENABLED_KEY
        )

        event.respond(
            '§b[E.D.E.N.] §fTime features: ' +
            (enabled ? '§aENABLED' : '§cDISABLED')
        )
        return
    }

    event.respond(
        '§eUsage: /edentime true | false | status'
    )
})
