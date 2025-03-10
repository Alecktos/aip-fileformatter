import { expect, test } from 'vitest'
import {changeDate} from "./dateFormatter";

test('Test add 60 days on original file', () => {
    expect(changeDate('ACUR	3176002665	25-03-31	1	4	ACUR', 60))
        .toBe('ACUR	3176002665	25-05-30	1	4	ACUR')
});

test('Test add 30 days on changed file', () => {
    expect(changeDate('3176 0026 65	0,4	2025-05-15', 30))
        .toBe('3176 0026 65	0,4	2025-06-14')
});