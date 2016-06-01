/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('contain url\'s', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('contain names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });

    });


    /* TODO: Write a new test suite named "The menu". */
    describe('The Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('is hidden by default', function() {
            var isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBeTruthy();
         });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('visibility is toggled on click', function() {
            // Cache menu icon and hidden state of menu
            var menuIcon = $('.menu-icon-link');
            var initialState,
                middleState,
                finalState;
            // Get initial hidden state
            initialState = $('body').hasClass('menu-hidden');
            // Trigger change
            menuIcon.trigger('click');
            // Get middle state
            middleState = $('body').hasClass('menu-hidden');
            // Compate middle state and initial state
            expect(middleState).not.toEqual(initialState);
            // Trigger change
            menuIcon.trigger('click');
            // Get final state
            finalState = $('body').hasClass('menu-hidden');
            // Compare final state and initial state
            expect(finalState).toEqual(initialState);
          });


    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            // Ensure that allFeeds is defined and not empty
            /*
            TODO - this test is redundant with 'RSS Feeds are defined',
            but without it, the this spec is dependant on that spec...
            */
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toEqual(0);
            // Load initial news feed
            loadFeed(0, function() {
                // Signal termination of beforeEach
                done();
            });
        });

        it('contains at least one .entry element', function(done) {
            var feed = $('.feed');
            expect( feed.find('.entry').length ).not.toBe(0);
            // Signal termination of spec
            done();
         });

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var loaded,
            updated;

        beforeEach(function(done) {
            // Ensure that allFeeds is defined and has multiple entries
            /*
            TODO - this test is semi redundant with 'RSS Feeds are defined',
            but without it, the this spec is partially dependant on that spec...
            */
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(1);
            // Load initial news feed
            loadFeed(0, function() {
                // Signal termination of beforeEach
                done();
            });
        });

        beforeEach(function(done) {
            // Cache initial news feed html
            loaded = $('.feed').html();
            // Update to next news feed
            loadFeed(1, function() {
                // Signal termination of beforeEach
                done();
            });
        });

        it('updates content', function(done){
            // Cache updated news feed html
            updated = $('.feed').html();
            // Compare initial and updated news feed hmtl
            expect(updated).not.toEqual(loaded);
            // Signal termination of spec
            done();
        });

    });

}());
