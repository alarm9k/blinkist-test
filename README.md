# What is this?
This is a coding challenge I was asked to do at Blinkist. The task description is included in the `task-description.md`.

# How to run
- Clone the repo and make sure you have `yarn` and `node`.
- From the project root run `yarn install`.
- From `packages/backend` run `yarn start` to start the API on port 3001.
- From `packages/cdn-mock` run `yarn start` to start the CDN mock on port 3002, which is a simple http-server that serves static html.
- In the browser go to `http://127.0.0.1:3002/article-1.html` to load the sample article. You will either see the original article or the test article, assigned randomly. The choice persists on page reloads. To emulate a new user and potentially be assigned to another group, delete the cookies for `http://127.0.0.1:3002` and refresh the page. The AB-testing and the tracking APIs will thus treat the client as a new user and will issue new cookies.

# System design
## Implemented design

We had these two primary aspects that influenced our design:
- We are testing only the visual aspects of the page (not a backend algorithm).
- The test pages are static (drawn with some no-code CMS by non-engineers?) and are pre-rendered and served from a CDN.

This makes it possible to shift a lot of AB-testing logic to the client-side. A user only needs to check with AB-testing endpoint once per tested article. All subsequent page reloads interact directly with the CDN.
## Other possible designs
- We could also use our own backend to serve a particular version of the page based on the user's cookie. This approach is incompatible with the CDN, though, and would shift the workload and the traffic to our backend.
- Some CDNs (Cloudflare?) offer AB-testing functionality based on the custom logic.

# How AB-testing works
## New user visits the page.
When a new user loads an article, an inlined javascript asks the AB-testing API endpoint if there are any tests running against the page with this particular ID (page URL is used as an ID). If a test has been defined for this page, the API assigns the user to either the control group or one of the test groups. The response sets a cookie which name contains the current page ID and the value is either an empty string (for control groups) or a CDN URL of a replacement (test) page. If there is a replacement page, the client-side javascript loads the page from the CDN and overwrites the current page's html.

## A known user revisits the page
The user goes to the original page's URL. The html starts to load and the inline javascript checks if there is a cookie for this page URL. If there is, we don't need to go to the AB-testing API. Instead, based on the cookie value we either allow the original page to load (if we are in the control group) or load the replacement page directly from the CDN and replace the contents of our current page.

## Search robot visits the page
- If the bot doesn't run javascript, it will just get the original page for indexing.
- If the bot _does_ run javascript (like Googlebot), the script will check the UserAgent string and will exit if it detects a search bot. In this case the bot will also get the original page for indexing.

# How tracking works
The javascript sends the current page and the tracked event type (in case of events) to the tracking endpoints. The userId and test group they belong to (if any) are taken from the cookies.

# Other notes
This is a POC, which means that a lot of corners have been cut. That includes project tooling, lack of defensiveness in the code (no checks, sanitization, validations, etc), testing, etc.