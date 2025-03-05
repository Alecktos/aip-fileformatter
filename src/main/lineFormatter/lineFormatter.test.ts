import { expect, test } from 'vitest'
import {parseLine} from "./lineFormatter";

test('parse first line', () => {
    expect(parseLine('ACUR	3176002665	25-03-31	1	4	ACUR'))
        .toBe('3176 0026 65	1	2025-03-31')
})

test('parse second line', () => {
    expect(parseLine('ACUR	3176002665	25-05-15	0,4	4	ACUR'))
        .toBe('3176 0026 65	0,4	2025-05-15')
})