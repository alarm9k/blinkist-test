import {Router} from 'express';
import {v4 as uuid} from 'uuid';
import {getABTestsForPage} from './database-mock';
import {testRandomizerMock} from './utils';

export const api = Router();

api.post('/track-event', async (req, res) => {
    if (req.cookies && req.cookies.userId) {
        console.log(`Tracking event "${req.body.event}" for location "${req.body.path}", user: "${req.cookies.userId}"`);
    }
    res.send({});
});

api.post('/track-page-view', async (req, res) => {
    if (!req.cookies || (req.cookies && !req.cookies.userId)) {
        console.log(`Tracking page view, location "${req.body.path}", new user`);
        res.cookie('userId', uuid()).send({});
    } else {
        console.log(`Tracking page view, location "${req.body.path}", user "${req.cookies.userId}"`);
        res.send({});
    }
});

api.post('/abtest', async (req, res) => {
    const pageId = String(req.body.pageId);
    if (req.cookies && req.cookies[`ab-test-${pageId}`] !== undefined) {
        // The user has already been assigned to a group for tests on this page.
        console.log('AB-test: already has AB-test cookie');
        res.send({});
    } else {
        const abTests = getABTestsForPage(pageId);

        if(abTests) {
            // If we have set up any AB-tests for this page, assign the user to one of the groups.
            console.log('AB-test: assigning new user to a group');
            const assignedGroup = testRandomizerMock(abTests);
            res.cookie(`ab-test-${pageId}`, assignedGroup).send({pageId: assignedGroup});
        } else {
            // No tests have been defined for this page.
            res.send({});
        }
    }
});