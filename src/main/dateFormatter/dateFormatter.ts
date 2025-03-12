import { parse, format, addDays } from 'date-fns';

enum DateFormats {
    WITHOUT_CENTURY= 'yy-MM-dd',
    WITH_CENTURY = 'yyyy-MM-dd'
}

export const changeDate =  (line: string, daysToAdd: number) => {
    line = replaceDateByRegex(DateFormats.WITHOUT_CENTURY, line, daysToAdd);
    line = replaceDateByRegex(DateFormats.WITH_CENTURY, line, daysToAdd);

    return line;
}

const replaceDateByRegex = (dateFormat: DateFormats, line: string, daysToAdd: number) => {
    let dateRegex;
    if(dateFormat === DateFormats.WITH_CENTURY) {
        dateRegex = /\b\d{4}-\d{2}-\d{2}\b/;
    } else if(dateFormat === DateFormats.WITHOUT_CENTURY) {
        dateRegex = /\b\d{2}-\d{2}-\d{2}\b/;
    } else {
        return line;
    }

    const match = line.match(dateRegex);
    if (match) {
        const date = parse(match[0], dateFormat, new Date());
        const newDate = addDays(date, daysToAdd);
        const formattedDate = format(newDate, dateFormat);
        return line.replace(dateRegex, formattedDate);
    }
    return line
}