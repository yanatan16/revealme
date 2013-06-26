<!-- revealme options

title: RevealMe Presentations
theme: sky
transition: cube

-->

# revealme

An in-browser presentation experience using [reveal.js][1].

# Using revealme

revealme is a github-proxy, and all files are stored there.

- Github repository: [github.com/yanatan16/revealme](https://github.com/yanatan16/revealme)
- Revealme presentation: [revealme.herokuapp.com/yanatan16/revealme](http://revealme.herokuapp.com/yanatan16/revealme)

## Formats

Revealme accepts any `.html` format that [reveal.js][1]. It has also been extended to take raw markdown.

Revealme will create a slide for every h1 and h2 markdown header (# / ## or ==== / ----). It will make any h1 a horizontal slide and any h2 a vertical slide.

_Note_: Right now, you cannot mix the two formats.

## Linking

Revealme links have two options:

		revealme.herokuapp.com/<github-user>/<github-repository>

will read the README.md file in the master branch of the repository.

		revealme.herokuapp.com/<github-user>/<github-repository>/<git-branch>/<file-path>.<ext>

will refer directly to files in your repository. For example:

		revealme.herokuapp.com/yanatan16/revealme/master/example/example.html

## Options

There are a couple of options available to each presentation. Just stick these in an html comment at the top of your presentation in a simple format:

    <!-- revealme options
    title: My Title Text
    theme: beige
    transition: concave
    -->

## Available Options

- Titles affect the <title> on the page.
- There are a set of themes that come with [reveal.js][1]: sky, beige, simple, serif, night, default
		- hint: You can change this on any presentation with the query parameter theme: [Try it](?theme=serif)
- Available Transitions: default, cube, page, concave, zoom, linear, fade, none
    - hint: Use the transition query parameter: [Try it](?transition=cube)

# Thanks

Many thanks to the [Hakim El Hattab](http://hakim.se/) for authoring the beautiful [reveal.js](http://lab.hakim.se/reveal-js/).

[1]: http://lab.hakim.se/reveal-js/ "reveal.js"