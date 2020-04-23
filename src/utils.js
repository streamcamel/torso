export function pathToCommand(path) {
    if(path !== undefined && path !== '') {
        let tokens = path.split('/');
        return tokens[1]

    }
    return '';
}

export function pathToSlug(path) {
    if(path !== undefined && path !== '') {
        let tokens = path.split('/');
        return tokens[2]

    }
    return '';
}