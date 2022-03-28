/**
 * Attaches a new user with Crewcharge or modifies the existing user preferences.
 *
 * @param {String} api_key - Your API key within Crewcharge.
 *
 * @param {String} uid - Identifier of the user that can be user id or email.
 *
 * @param {Object} attributes - Contains information about the user.
 * You can attach any attributes, but the needed ones are {@see recommended_user_attributes}
 *
 * @param {Boolean} test_user - Refers to whether the user must be attached as a test user within Crewcharge.
 *
 * @return {Object} Returns error or success message.
 *
 * 1. Error Example
 * {
 *     ok: false,
 *     error: "Invalid options"
 * }
 *
 * 2. Success Example
 *
 * {
 *     ok: true,
 *     message: "All good! 👍"
 * }
 *
 *
 */
async function attachUserAttributes({
                                        api_key,
                                        uid,
                                        attributes,
                                        test_user= false
                                    }) {

    try {

        return await fetch(`${crewcharge_v1_endpoint}/api/v1/users/attach-attributes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "scope": ["user", "project"],
                "api-key": api_key
            },
            body: JSON.stringify({
                uid: uid,
                as_test_user: test_user,
                attributes: {...attributes},
            })
        })
    } catch (e) {
        console.error(e)
        return {
            ok: false,
            error: e ?? "Unexpected error happened!"
        }
    }

}

/**
 * Attaches a new user with Crewcharge or modifies the existing user preferences.
 *
 * @param {String} api_key - Your API key within Crewcharge.
 *
 * @param {String} uid - Identifier of the user that can be user id or email.
 *
 * @param {Object} privacy_preferences - Refers to modifying user's preferences with collecting data
 * on analytics, email, feedback, sms, etc. Valid values are {@see valid_privacy_preferences}
 *
 * @return {Object} Returns error or success message.
 *
 * 1. Error Example
 * {
 *     ok: false,
 *     error: "Invalid privacy options"
 * }
 *
 * 2. Success Example
 *
 * {
 *     ok: true,
 *     message: "All good! 👍"
 * }
 *
 *
 */
async function changePrivacyPreferences({
                                        api_key,
                                        uid,
                                        privacy_preferences,
                                    }) {

    try {

        return await fetch(`${crewcharge_v1_endpoint}/api/v1/users/attach-attributes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "scope": ["user", "project"],
                "api-key": api_key
            },
            body: JSON.stringify({
                uid: uid,
                as_test_user: test_user,
                attributes: {...attributes},
                privacy_preferences: privacy_preferences
            })
        })
    } catch (e) {
        console.error(e)
        return {
            ok: false,
            error: e ?? "Unexpected error happened!"
        }
    }

}

/**
 * @param analytics_tag is your tag obtained for this project.
 * @param uid - Identifier of the user that can be user id or email.
 * @param trigger_key the key you want to track (Obtain this from your Crewcharge Console)
 *
 * @return {Promise<Response|{ok: boolean, error: string}>}
 */
async function logTrigger({
                              analytics_tag,
                              uid,
                              trigger_key
                          }) {
    try {
        return await fetch(`${crewcharge_v1_endpoint}/api/v1/log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                analytics_tag: analytics_tag,
                uid: uid,
                trigger_key: trigger_key
            })
        })
    } catch (e) {
        console.error(e)
        return {
            ok: false,
            error: e ?? "Unexpected error happened!"
        }
    }
}

const recommended_user_attributes = {
    pii_name: "pii_name",
    pii_email: "pii_email",
    pii_image: "pii_image",
    locale: "locale"
}

const valid_privacy_preferences = {
    analytics: {
        pii: false
    }, feedback: {
        email: false,
        push: false,
        sms: false,
        in_app: true
    }, marketing: {
        email: false,
        push: false,
        sms: false,
        in_app: true,
    },
}

const crewcharge_v1_endpoint = `https://app.crewcharge.com`;

module.exports = {
    attachUserAttributes,
    changePrivacyPreferences,
    logTrigger,
    crewcharge_v1_endpoint,
    valid_privacy_preferences,
    recommended_user_attributes
}