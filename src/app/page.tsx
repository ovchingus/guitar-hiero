export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Guitah Playeah
      </h1>

      <div className="max-w-2xl text-center mb-8">
        <p className="mb-4">
          Your ultimate companion for mastering guitar chords and improving your
          musical skills.
        </p>

        <p className="mb-6">
          Whether you're a beginner just starting your musical journey or an
          experienced guitarist looking to expand your repertoire, our tools
          will help you practice and perfect your chord transitions, timing, and
          overall playing technique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="border border-black/[.1] dark:border-white/[.1] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Chord Pairs Practice</h2>
          <p>
            Train your transitions between chord pairs to build muscle memory
            and speed. Perfect for beginners and advanced players alike.
          </p>
        </div>

        <div className="border border-black/[.1] dark:border-white/[.1] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Chord Library*</h2>
          <p>
            Explore our comprehensive library of guitar chords with clear
            diagrams and finger positions for every skill level.
          </p>
        </div>

        <div className="border border-black/[.1] dark:border-white/[.1] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Timing Tools*</h2>
          <p>
            Improve your rhythm and timing with metronome and timing
            exercises designed specifically for guitarists.
          </p>
        </div>

        <div className="border border-black/[.1] dark:border-white/[.1] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Progress Tracking*</h2>
          <p>
            Monitor your improvement over time with detailed statistics and
            personalized practice recommendations.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <a
          href="/chord-pairs"
          className="bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </a>
      </div>
      
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>* Features currently in development</p>
      </div>
    </div>
  );
}
