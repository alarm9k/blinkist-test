With this task, we would like to get a better understanding of your hands-on development skills and workflow.

The task below is meant to assess skills that we think are crucial for this position. There is no “correct” solution to this test. Use your own judgment and what you know about Blinkist so far. **We primarily want to see how you think**, so the more you can back up your ideas with strong arguments, the better.

We kindly ask you to submit your solution as a PDF, but feel free to include links to a code sandbox, Github Pages, or any other tool. The deadline for submission is **3 working days from when you receive the challenge**, if you need more time please get in touch to let us know. We estimate it shouldn’t take you more than **2-4h** to complete the challenge.

We hope you enjoy it. 😊

Best of luck!

# Context

---

To get a better understanding of your work and thought process, we’ve put together a coding problem designed to help us make informed and fair hiring decisions. Feel free to reach out to us (**web-circle@blinkist.com**) if you have any questions.

We’d love to see your code and get insights into:

- how you approach such a task in general
- assumptions and rationale behind your decisions
- how you construct an architecture

Please make sure to cover technical insights as well as process and product considerations.

### **Description**

Imagine we have a blog with many articles. The goal of these articles is to inspire readers to learn and become Blinkist users. We’re constantly experimenting with different content formats – book lists, images and videos, quotes, etc.

**The challenge: We’d like to use AB-testing to learn which content formats work and which don’t. In addition, we want to empower our content editors to launch AB-tests without engineering support.**

### **A/B Testing 101**

In this case, launching an AB-test means having a couple of versions (variations) of the same article and randomly show some users one variation and some users the other. The variation that leads to more clicks on the “Sign up” button (or any action/metric we want) wins and we roll it out to all users.

A default version of an article (or a part of an article) that we want to test is called **a control variation**. A new version we’re introducing is called **a test variation**.

### **Tech Details**

- All articles are cached via a CDN. It means all variations will be added by content editors to the article and rendered into the DOM.
- We’re using an in-house web analytics tool. It has “pageview” and “event” endpoints that we talk to via our `analytics-api.js`. For the challenge you can assume visitor’s consent to tracking was given already #gdpr. ;)

Here’s a sandbox where you can see how an article would look like without AB-test logic on the page: [https://codesandbox.io/s/blinkist-web-coding-challenge-2023-w4z4uo](https://codesandbox.io/s/blinkist-web-coding-challenge-2023-w4z4uo)

### **Acceptance Criteria**

Implement the following logic while keeping the broader goal in mind:

1. A visitor has a consistent experience of one variation (assigned randomly) per article when they browse the blog.

2. The analytics backend (maintained by another team) is able to determine the winning variation using the CTR (click-through rate) on the “Sign up” CTA by unique visitors.

3. Editors can run multiple AB-tests on the same article. For example, one AB-test will test a hero image and another AB-test will test the outro copy.

Feel free to use a Codesandbox, deploy your solution to Github Pages or use any other way to share it with us. In addition to code, we’d like to understand

- your thought process
- assumptions and rationale behind your decisions
- tradeoffs, problems, or limitations of the design
- ideas for improvement