/**
 * Attaches a new user with Crewcharge or modifies the existing user preferences.
 *
 * @param {String} api_key - Your API key within Crewcharge.
 *
 * @param {String} analytics_tag - Your Analytics key with Crewcharge.
 *
 * @param {String} uid_hashed - Identifier of the user that needs to be a one-way hash. This must start with your Project key.
 *
 * @param {Object} attributes - Contains information about the user.
 * You can attach any attributes, but the needed ones are {@see recommended_user_attributes}
 *
 * @param {Object} privacy_preferences - Refers to modifying user's preferences with collecting data
 * on analytics, email, feedback, sms, etc. Valid values are {@see valid_privacy_preferences}
 *
 * @param {Boolean} test_user - Refers to whether the user must be attached as a test user within Crewcharge.
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
 * For example,
 * if you store { "id" : 1, "name": "Alice", "email": "alice@gmail.com" }
 *
 * DO NOT PASS 1, as the uid_hash, instead hash 1 and send it over.
 * [GDPR Rules]
 *
 */
async function attachUserAttributes({
                                        api_key,
                                        analytics_tag,
                                        uid_hashed,
                                        attributes,
                                        privacy_preferences,
                                        test_user
                                    }) {

    try {

        const crewcharge_preferences = privacy_preferences ? {...privacy_preferences} : null

        return await fetch(`${crewcharge_v1_endpoint}/api/v1/users/attach-attributes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "scope": ["user", "project"],
                "api-key": api_key
            },
            body: JSON.stringify({
                analytics_tag: analytics_tag,
                uid_hashed: uid_hashed,
                as_test_user: test_user,
                attributes: {...attributes},
                crewcharge_preferences: crewcharge_preferences
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
 * @param uid_hashed pass a hashed key of user id of your customer.
 * @param trigger_key the key you want to track (Obtain this from your Crewcharge Console)
 *
 * @return {Promise<Response|{ok: boolean, error: string}>}
 */
async function logTrigger({
                              analytics_tag,
                              uid_hashed,
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
                uid_hashed: uid_hashed,
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
    anon: false,
    test: false,
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
    logTrigger,
    crewcharge_v1_endpoint,
    valid_privacy_preferences,
    recommended_user_attributes
}