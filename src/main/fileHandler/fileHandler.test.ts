import {afterEach, expect, test} from "vitest";
import {readAllLinesFromFile, writeLinesToFile} from "./fileHandler";
import fs from "fs";

const testFilePath = "./test.txt";
const fileLines = ["test", "test2", "test3"];

test('Test write and read file', () => {
    writeLinesToFile(testFilePath, fileLines)

    readAllLinesFromFile(testFilePath).forEach((line, index) => {
        expect(line).toBe(fileLines[index]);
    });

});

afterEach(() => {
    fs.unlink(testFilePath, (err) => {
        if (err) {
            console.error('Error deleting the file:', err);
        } else {
            console.log('File deleted successfully');
        }
    });
});