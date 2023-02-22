import {ABTest, PageUrl} from './database-mock';

// Takes an abTest object and returns either an empty string (thus assigning the user to the control group),
// or one of the replacement page URLs (and thus assigning the user to one of the test groups). The probabilities
// of each outcome are equal here, which may not be the case in real life.
export function testRandomizerMock(abTest: ABTest): PageUrl | '' {
    const randomIndex = Math.floor(Math.random() * (abTest.tests.length + 1));
    if(randomIndex === 0) {
        return '';
    } else {
        return abTest.tests[randomIndex - 1];
    }
}