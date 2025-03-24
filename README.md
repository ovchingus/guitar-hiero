# Guitar Hiero

App to learn how to play guitar.

>The name Guitar Hiero is a fusion of music and mysticism, drawing inspiration from the Hierophant tarot card, which symbolizes wisdom, guidance, and structured learning. In tarot, the card is a teacher and mentor, helping seekers unlock deeper knowledge.

>The word "Hiero" (short for Hierophant) also evokes hieroglyphs and ancient wisdom, connecting to the idea that music is a universal language, passed down through generations.

That's a description made by ai ^_^

## Architecture

As the main framework I use [ Next.js ](https://nextjs.org/). I prefer to use the `src` folder as the root folder to organize the code.

I decided to use the [FSD](https://feature-sliced.github.io/documentation/) architecture to structure the code.
It's a great way to organize the code and make it more readable and maintainable.

Also, there is an issue - the FSD architecture `pages` folder conflicts with the `pages` folder in the Next.js project, as Next.js uses it for routing. As workaround, I use `pagez` folder for FSD pages.

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
