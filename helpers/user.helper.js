exports.sigup = {
    isValiedBody: (data) => {
        if (!data.name || !data.email || !data.location) {
            return false
        }
        return true
    }
}