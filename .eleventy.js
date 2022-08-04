const fs = require("fs");

module.exports = function (eleventyConfig) {
	// Copy the `img` and `css` folders to the output
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("js");

	// Override Browsersync defaults (used only with --serve)
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, browserSync) {
				const content_404 = fs.readFileSync("_site/404.html");

				browserSync.addMiddleware("*", (req, res) => {
					// Provides the 404 content without redirect.
					res.writeHead(404, {
						"Content-Type": "text/html; charset=UTF-8",
					});
					res.write(content_404);
					res.end();
				});
			},
		},
		ui: false,
		ghostMode: false,
	});

	function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	}

	eleventyConfig.addFilter("filterTagList", filterTagList)

	// Create an array of all tags
	eleventyConfig.addCollection("tagList", function(collection) {
		let tagSet = new Set();
		collection.getAll().forEach(item => {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		});

		return filterTagList([...tagSet]);
	});

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: ["md", "njk", "html", "liquid"],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// -----------------------------------------------------------------
		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Don’t worry about leading and trailing slashes, we normalize these.

		// If you don’t have a subdirectory, use "" or "/" (they do the same thing)
		// This is only used for link URLs (it does not affect your file structure)
		// Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

		// You can also pass this in on the command line using `--pathprefix`

		// Optional (default is shown)
		pathPrefix: "/",
		// -----------------------------------------------------------------

		// These are all optional (defaults are shown):
		dir: {
			input: ".",
			includes: "_includes",
			data: "_data",
			output: "_site",
		},
	};
};
