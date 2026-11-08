const TIAB_LAST_LOGOUT = 'eden_tiab_last_logout'

// Temps maximum récupérable : 7 jours
// Mets 0 pour désactiver cette limite.
const TIAB_MAX_OFFLINE_SECONDS = 7 * 24 * 60 * 60

// Enregistrer la déconnexion
PlayerEvents.loggedOut(event => {
    var player = event.player

    player.persistentData.putLong(
        TIAB_LAST_LOGOUT,
        Date.now()
    )
})

// Récupérer le temps à la reconnexion
PlayerEvents.loggedIn(event => {
    var player = event.player
    var data = player.persistentData
    var now = Date.now()

    // Première connexion : initialisation
    if (!data.contains(TIAB_LAST_LOGOUT)) {
        data.putLong(TIAB_LAST_LOGOUT, now)
        return
    }

    var lastLogout = Number(
        data.getLong(TIAB_LAST_LOGOUT)
    )

    var offlineSeconds = Math.floor(
        (now - lastLogout) / 1000
    )

    // Empêche les valeurs négatives
    offlineSeconds = Math.max(0, offlineSeconds)

    // Limite facultative
    if (TIAB_MAX_OFFLINE_SECONDS > 0) {
        offlineSeconds = Math.min(
            offlineSeconds,
            TIAB_MAX_OFFLINE_SECONDS
        )
    }

    if (offlineSeconds <= 0) {
        data.putLong(TIAB_LAST_LOGOUT, now)
        return
    }

    // Commande exécutée par le SERVEUR (OP)
    var command =
        'tiab time add ' +
        player.username + ' ' +
        offlineSeconds

    event.server.runCommandSilent(command)

    // Mise à jour pour éviter de compter
    // plusieurs fois la même période
    data.putLong(TIAB_LAST_LOGOUT, now)

    console.info(
        '[E.D.E.N.] TIAB: ' +
        player.username +
        ' received ' +
        offlineSeconds +
        ' offline seconds.'
    )
})
