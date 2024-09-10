# Space Shooter

This is a simple TypeScript-based space shooter game that utilizes multiple web APIs to create an interactive experience. 

This project utilizes the following web APIs:

- **Keyboard API**: Handles user input for controlling the game. The arrow keys are used to move the player, and the spacebar is used to fire projectiles.
- **Animation API (requestAnimationFrame)**: Manages the game loop, ensuring smooth animation and regular updates of game elements on the screen.
- **Canvas API**: Responsible for rendering all visual elements in the game, including the player, projectiles, meteors, and explosions.
- **Web Audio API**: Plays background music and sound effects such as shooting projectiles and meteor explosions, enhancing the immersive experience.

Purpose of this project was to show understanding about utilizing different API:s that web browsers offer.

All audios used in project are royalty free from [Pixabay](https://pixabay.com/sound-effects/).

[Game](https://space-shooter-rx6v.onrender.com/) is hosted live at Render.

## Project Setup

### Prerequisites

Before you can run this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/download) (commonly used IDE)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/space_shooter.git
    ```

2. Navigate to project directory:

    ```bash
    cd space_shooter
    ```

3. Open project with Visual Studio Code:

    ```
    code .
    ```

4. Install the project dependencies
    ```bash
    npm install
    ```

### Build and run the project

1.  To build the TypeScript project and compile the code into JavaScript:
    ```bash
    npm run build
    ```

2. Install Live Server (Five Server) from Visual Studio Code extenstions.

3. Right mouse click on the index.html file and click open with Five Server.