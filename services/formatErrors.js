export function formatErrors(errors) {  // returns array | null
    let arrayOfErrors = [];

    if (errors.value !== null) {
        if (errors.value.data.errors !== undefined) {
            let {...messages} = errors.value.data.errors;

            for (const [key, value] of Object.entries(messages)) {
                arrayOfErrors.push(...value);
            }
        }

        if (errors.value.data.errors === undefined) {
            arrayOfErrors.push(errors.value.data.message);
        }
    }

    return arrayOfErrors.length > 0 ? arrayOfErrors : null;

}