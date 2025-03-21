# A set of tools to learn guitar

## Architecture

As the main framework I use [ Next.js ](https://nextjs.org/). I prefer to use the `src` folder as the root folder to organize the code.

I decided to use the [FSD](https://feature-sliced.github.io/documentation/) architecture to structure the code.
It's a great way to organize the code and make it more readable and maintainable.

Also, I avoid using index files for imports, as FSD recommends. It's difficult to maintain them, for example, when you need to rename a folder or file. It's bad for encapsulation of the modules, but it's good for DX.

## Chord pairs learning

A tool to learn chords by playing them in a pairs.
Check out the lesson [here](https://youtu.be/TCLdFIqCp7s?si=QAieH1fnJtr42jks).

## Credits

- [Absolutely Understand Guitar](https://absolutelyunderstandguitar.com/)
  A great resource to understand the theory behind guitar and music in general.
  All the tools are built on top of this course.

- [Chord diagrams](https://chordpic.com/)
  A tool to visualize chords.

- [FSD](https://feature-sliced.github.io/documentation/)
  A great way to structure the code.
