export const sortArgsHelper = (sort) => {
    let sortArgs = {
        _id: null,
        email: null,
        family_name: null,
        given_name: null,
        name: null,
        picture: null
    }

    for (const key in sortArgs) {
        if (sort[key]) {
            sortArgs[key] = sort[key];
        } else {
            sortArgs[key] = null;
        }
    }

    return sortArgs;
}