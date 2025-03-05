import fs from "fs";

export const writeLinesToFile = (filePath: string, lines: string[]): void => {
    const fileContent = lines.join('\n');
    fs.writeFileSync(filePath, fileContent, 'utf-8');
};

export const readAllLinesFromFile = (filePath: string): string[] => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.split('\n');
};
