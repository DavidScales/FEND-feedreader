/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* Place all tests withing the $() function, since some of these
 * tests require DOM elements to be ready before execution.
 */
$(function() {

    /* Ensure that there are RSS feeds in the allFeeds variable,
     * and that they contain the necessary data.
     */
    describe('RSS Feeds', function() {

        /* Ensure that the allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /* Loop through each feed the allFeeds object and
         * ensures it has a URL defined and that the URL is
         * not empty.
         */
        it('contain url\'s', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
        });

        /* Loop through each feed the allFeeds object and
         * ensures it has a name defined and that the name is
         * not empty.
         */
        it('contain names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
        });

    });


    /* Ensure that the menu is hidden by default, and that its
     * visibility toggling functions as intended.
     */
    describe('The Menu', function() {

        /* Ensure the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            var isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBeTruthy();
        });

         /* Ensure the menu changes visibility when the menu icon
          * is clicked.
          */
        it('visibility is toggled on click', function() {
            // Cache menu icon and hidden state of menu
            var menuIcon = $('.menu-icon-link');
            var isHidden;
            // Trigger and check hidden state
            menuIcon.trigger('click');
            isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBeFalsy();
            // Trigger and check hidden state
            menuIcon.trigger('click');
            isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBeTruthy();
        });

    });


    /* Ensure that the initial feed is loaded and contains entries.
     */
    describe('Initial Entries', function() {

        /* Ensure that when the loadFeed function is called and completes
         * its work, there is at least a single .entry element within the
         * .feed container.
         */
        beforeEach(function(done) {
            // Load initial news feed
            loadFeed(0, done);
        });

        it('contains at least one .entry element', function() {
            // Check news feed length
            var feed = $('.feed .entry');
            expect(feed.length).toBeGreaterThan(0);
        });

    });


    /* Ensure that changing news feeds will load and display new data.
     */
    describe('New Feed Selection', function() {

        /* Ensure that when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        var loaded,
            updated;

        it('updates content', function(done){
            // Ensure there are multiple feeds
            expect(allFeeds.length).toBeGreaterThan(1);

            // Load initial news feed
            loadFeed(0, function() {
                // Cache initial news feed html
                loaded = $('.feed').html();
                // Update news feed
                loadFeed(1, function() {
                    // Cache updated news feed html
                    updated = $('.feed').html();
                    // Compare initial and updated news feed hmtl
                    expect(updated).not.toEqual(loaded);
                    done();
                });
            });
        });

    });

}());
