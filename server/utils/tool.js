exports.getUserPropsServer = (user) => {
    return {
        _id: user.email,
        email: user.email,
        family_name: user.family_name,
        given_name: user.given_name,
    }
}