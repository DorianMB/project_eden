/*
 * Project E.D.E.N. - TIAB Offline Time
 *
 * Shared setting: eden_tiab_enabled
 * Default: DISABLED
 */

const TIAB_LAST_LOGOUT = 'eden_tiab_last_logout'

// Maximum offline accumulation: 7 days
// Set to 0 for unlimited time
const TIAB_MAX_OFFLINE_SECONDS = 7 * 24 * 60 * 60

// Save logout timestamp
PlayerEvents.loggedOut(event => {
    var player = event.player

    player.persistentData.putLong(
        TIAB_LAST_LOGOUT,
        Date.now()
    )
})

// Award offline time on login
PlayerEvents.loggedIn(event => {
    var player = event.player
    var data = player.persistentData
    var now = Date.now()

    // Get last logout time
    if (!data.contains(TIAB_LAST_LOGOUT)) {
        data.putLong(TIAB_LAST_LOGOUT, now)
        return
    }

    var lastLogout = Number(
        data.getLong(TIAB_LAST_LOGOUT)
    )

    // Calculate offline time
    var offlineSeconds = Math.floor(
        (now - lastLogout) / 1000
    )

    offlineSeconds = Math.max(
        0,
        offlineSeconds
    )

    // Apply optional limit
    if (TIAB_MAX_OFFLINE_SECONDS > 0) {
        offlineSeconds = Math.min(
            offlineSeconds,
            TIAB_MAX_OFFLINE_SECONDS
        )
    }

    // Consume previous timestamp regardless
    // of the feature's enabled state
    data.putLong(TIAB_LAST_LOGOUT, now)

    // Shared server setting
    var enabled = event.server.persistentData
        .getBoolean('eden_tiab_enabled')

    if (!enabled) {
        return
    }

    if (offlineSeconds <= 0) {
        return
    }

    // Execute as server console
    var command =
        'tiab time add ' +
        player.username + ' ' +
        offlineSeconds

    event.server.runCommandSilent(command)

    console.info(
        '[E.D.E.N.] TIAB: ' +
        player.username +
        ' received ' +
        offlineSeconds +
        ' offline seconds.'
    )
})
