<!-- revealme options

title: RevealMe Presentations
theme: sky
transition: default

-->

# revealme

An in-browser presentation experience using [reveal.js](http://lab.hakim.se/reveal-js/)

# Using revealme

revealme is a github-proxy, and all files are stored there.

- Github repository: [github.com/yanatan16/revealme](https://github.com/yanatan16/revealme)
- Revealme presentation: [revealme.herokuapp.com/yanatan16/revealme](http://revealme.herokuapp.com/yanatan16/revealme)

## Formats

Revealme accepts any `.html` format that [reveal.js](http://lab.hakim.se/reveal-js/). It has also been extended to take raw markdown (supports Github-flavored too!).

---

Revealme will create a slide for every h1 and h2 markdown header (# / ## or ==== / ----). It will make any h1 a horizontal slide and any h2 a vertical slide, unless `horizOnly` is used.

## Linking

Revealme links have three options:

	revealme.herokuapp.com/<github-user>/<github-repository>
    revealme.herokuapp.com/<github-user>/<github-repository>/<git-branch>
    revealme.herokuapp.com/<github-user>/<github-repository>/<git-branch>/<file-path>.<ext>

The top one will read the README.md file in the master branch of the repository, while the second will read the README.md in the branch specified. The third will will refer directly to files in your repository. For example:

	revealme.herokuapp.com/yanatan16/revealme/master/example/example.html

## Gist Linking

Revealme now supports linking from gists:

```
revealme.herokuapp.com/<github-user>/<gist-id>
revealme.herokuapp.com/<github-user>/<gist-id>/<filename.md>
```

## Options

There are a couple of options available to each presentation. Just stick these in an html comment at the top of your presentation in a simple format:

    <!-- revealme options
    title: My Title Text
    theme: beige
    transition: concave
    horizOnly: true
    -->

## Available Options

- Titles affect the <title> on the page.
- There are a set of themes that come with [reveal.js](http://lab.hakim.se/reveal-js/): sky, beige, simple, serif, night, default
	- hint: [?theme=serif](http://revealme.herokuapp.com/yanatan16/revealme?theme=serif#/1/4)
- Available Transitions: default, cube, page, concave, zoom, linear, fade, none
    - hint: [?transition=cube](http://revealme.herokuapp.com/yanatan16/revealme?transition=cube#/1/4)
- Horizontal Only: Don't use the vertical slides. [?horiz=true](http://revealme.herokuapp.com/yanatan16/revealme?horiz=true#/5)

# Thanks

Many thanks to the [Hakim El Hattab](http://hakim.se/) for authoring the beautiful [reveal.js](http://lab.hakim.se/reveal-js/).
