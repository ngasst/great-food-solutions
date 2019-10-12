async function dateIncrementor(model, base, field = "number") {
    if (!model || !base) {
        throw new Error("Model and string base must be provided!");
    }

    // get previous entry
    try {
        const res = await model
            .find({})
            .sort({ createdAt: -1 })
            .limit(1);
        const last = res[0];
        // if none exist, start at one
        let value = `${base}-001`;
        // if some exist, increment by one then save
        if (!!last) {
            const val = last[field];
            const num = val.split(val.lastIndexOf("-") + 1);
            const numb = parseInt(num);
            const increment = numb++;
            const str = getString(increment);
            value = `${base}-${str}`;
        }
        return value;
    } catch (error) {
        throw err;
    }
}

function getString(num) {
    const numb = parseInt(num);

    if (numb < 10) {
        return `00${numb}`;
    } else if (numb >= 10 && numb < 99) {
        return `0${numb}`;
    } else {
        return `${numb}`;
    }
}
