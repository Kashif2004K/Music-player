#Modern Glassmorphism Music Player

A sleek, responsive, and feature-rich music player built using pure HTML, CSS, and Vanilla JavaScript, showcasing modern Glassmorphism and dynamic content management.

#✨ Features

This player evolved from a basic HTML/CSS template into a fully functional and aesthetic application:

. Glassmorphism Design: Beautiful, semi-transparent "glass" cards using CSS backdrop-filter.
. Immersive Background: The page background dynamically blurs and uses colors derived from the current album art.
. Dynamic Ranking (Top Hits): A "Top Hits" section that automatically sorts and displays songs based on their real-time play count, with a crown icon (🏆) for the #1 song.
. Stateful Tracking: Play counts are persisted in the browser's localStorage so your rankings are saved across sessions.
. Visual Feedback: Includes a mini-visualizer animation next to the title and a "breathing" album cover when music is playing.
. Core Functionality: Integrated volume slider, real-time progress bar, and accurate time displays.
. Aesthetic Scrolling: Custom-styled, minimal scrollbars for the playlist section, ensuring a clean UI even with long lists.
. Full Responsiveness: Layout seamlessly adjusts from a three-column desktop view to a fully stacked mobile view using CSS Media Queries.
    
#🚀 Setup and Installation

This is a front-end project and does not require any complex build tools or dependencies.

1. Clone the Repository:
   git clone [YOUR_REPOSITORY_URL]
   cd modern-music-player
   
2. Add Assets:
   . Create a folder named songs and place your .mp3 files inside.
   . Create a folder named cover and place your album art images inside.

3. Run Locally:
   . Simply open the index.html file directly in your web browser.

#📂 Project Structure

index.html  The main structure, integrating the player, playlist, and top songs sections.
style.css   All styling, including Glassmorphism, responsiveness, and custom scrollbars.
script.js   Core logic for playback, dynamic ranking, local storage persistence, and UI updates.
songs/      Directory for the audio files (referenced in script.js).
cover/      Directory for album art images (referenced in script.js).

#⚙️ Customization

To easily add or change songs, modify the songs array at the beginning of your script.js file:

JavaScriptconst songs = [
    {
        id: 0,
        title: "Your Song Title",
        file: "songs/your_file.mp3",
        cover: "cover/your_cover.jpg",
        playCount: 0 // Keep this initialized at 0
    },
    // Add more songs here...
];

#🤝 Contribution

Feel free to open issues or submit pull requests if you have suggestions for new features or improvements.

Built with ❤️ by [Kashif Mehmood/Kashif2004K]
