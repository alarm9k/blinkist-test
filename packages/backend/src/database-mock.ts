export type PageUrl = string;

export interface ABTest {
    originalPage: PageUrl;
    tests: PageUrl[];
}

// In real life would check the datastore to see if AB-tests are defined for a given page.
// Since we have only one sample page, this mock always returns a defined test.
export function getABTestsForPage(pageUrl: PageUrl): ABTest {
    console.log(`AB-test is running for page "${pageUrl}"`);
    return {
        originalPage: 'article-1.html',
        tests: [
            'article-1-test-1.html'
        ]
    };
}