import fs from "fs";

export const writeLinesToFile = (filePath: string, lines: string[]): void => {
    const fileContent = lines.join('\n');
    fs.writeFileSync(filePath, fileContent, {encoding: 'utf-8', flag: "w"});
};

export const readAllLinesFromFile = (filePath: string): string[] => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.split('\n');
};
