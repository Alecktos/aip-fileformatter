export const parseLine = (line: string): string => {
    if(line === '') {
        return '';
    }
    const chunks = line.split(/[\t ]+/)
        .map((chunk) => chunk.trim())
        .filter((chunk) => chunk.length > 0);

    if (containsOnlyUpperCaseLetters(chunks[0])) {
        chunks.splice(0, 1); // remove first index
    }

    if (containsOnlyUpperCaseLetters(chunks[chunks.length - 1])) {
        chunks.splice(chunks.length - 1, 1); // remove last index
    }

    if(containsOnlyOneNumber(chunks[chunks.length - 1])) {
        chunks.splice(chunks.length - 1, 1); // remove last index if is an number
    }

    //Add century if not exist
    if (chunks[1].replaceAll('-', '').length === 6) {
        chunks[1] = `20${chunks[1]}`
    }

    // Change place to last of line
    const removedDate = chunks.splice(1, 1);
    chunks.push(removedDate[0]);

    chunks[0] = splitFirstColumn(chunks[0]);

    return chunks.join('\t');
}

const containsOnlyOneNumber = (str: string): boolean => {
    return str.match(/\d/g).length === 1;
}

const containsOnlyUpperCaseLetters = (str: string): boolean => {
    return /^[A-Z]+$/.test(str);
}

const splitFirstColumn = (firstColumn: string): string => {
    return firstColumn.replace(/(\d{4})(\d{4})(\d{2})/, '$1 $2 $3');
}