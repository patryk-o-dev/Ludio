# Ludio

Ludio is a multiplayer quiz platform designed for Twitch streamers and their communities.

Players can create and play real-time quizzes together, invite friends or entire Twitch communities, compete on live leaderboards, and earn community ranking points based on their performance.

The application is built as a full-stack system with a React frontend, NestJS backend, relational database, Redis and WebSockets, and is deployed as a containerized production application.

## Live Demo

**Application:** [Ludio](https://ludioquiz.duckdns.org)

**Source Code:** This repository

## Features

### Authentication & User Settings

- Twitch OAuth authentication
- Automatic detection of the user's browser language preference
- Polish and English interface
- Ability to disable incoming friend requests

### Friends & Communities

- Send and accept friend requests
- Remove friends
- Create Twitch communities
- Invite users to a community through a shareable invitation link
- Automatically join a community after authenticating through an invitation link
- Leave communities
- View community members and their rankings
- Community-wide quiz invitations

Communities are designed primarily with Twitch streamers in mind. Instead of manually inviting every viewer to a quiz, a streamer can send a single invitation to the entire community.

### Quiz Creation

Ludio uses a rule-based quiz creation system built around three types of chips:

- `ChipGuess` — defines what the player has to identify
- `ChipBy` — defines the information used to identify it
- `ChipFilter` — restricts the question pool using additional parameters

For example, a quiz can be configured to identify a video game based on a screenshot, while additional filters can restrict the questions to a specific category.

The available chips dynamically adapt to the current configuration. After selecting a chip, only compatible chips remain available, preventing invalid combinations that could produce quizzes without matching questions.

Quiz creators can also configure additional rules:

- Maximum number of questions for a given rule set
- Time limit for answering
- Community ranking mode
- Player invitations

### Multiplayer Lobby

A quiz does not start immediately after being created.

The host can invite players and wait for them to respond to the invitations. The lobby displays the current invitation status of every invited player.

When the host starts the quiz, only players who accepted the invitation become participants.

### Real-Time Gameplay

During a quiz, players can see:

- Current question number
- Total number of questions
- Current score
- Remaining answer time
- Available answers
- Live rankings during question summaries

The available answers are filtered according to the type of entity being guessed. For example, a quiz about video games will not display movies or TV shows as possible answers.

Players can additionally filter the answer list using a text input.

After every question, a short summary is displayed showing:

- The correct answer
- Whether the player's answer was correct
- The current ranking

Players can also leave the quiz early. Leaving sets their final score to zero without interrupting the remaining players' session.

### Time-Based Gameplay

Quizzes with a time limit include additional gameplay mechanics.

If every active player submits an answer before the timer expires, the game immediately proceeds to the question summary instead of waiting for the remaining time.

If multiple players achieve the same score, their total answer time is used as a tie-breaker.

Time-based quizzes also display average answer time, allowing players to compare their performance against the average response time of the session.

### Community Rankings

Quizzes can optionally contribute to a community ranking.

When a community quiz ends, participating community members receive ranking points based on their final position.

Community members can then view their position in the community leaderboard.

### Game Modes

Ludio separates general quizzes from quizzes dedicated to specific fictional universes or games.

The general mode includes questions about different types of media and culture, while dedicated modes can focus on a specific title.

Currently available dedicated modes include:

- League of Legends
- Dead by Daylight

The architecture is designed to allow additional game modes to be added in the future.

### Twitch Streamer Overlay

Ludio includes a dedicated overlay page designed to be used as a browser source in OBS.

The overlay can display the winner after a quiz has ended and is intended to provide a foundation for more advanced streamer-oriented visualizations in the future.

## Technical Architecture

Ludio is designed as a real-time multiplayer application where the backend is responsible for maintaining a consistent state of the active quiz session.

The application consists of several main components:

- React + Vite frontend
- NestJS backend
- Prisma ORM
- MariaDB database
- Redis
- WebSockets
- Nginx
- Docker Compose

### Redis-Based Game State

The active state of a quiz session is managed using Redis.

Instead of relying exclusively on the relational database for rapidly changing game state, Redis stores the current state of the active session.

This allows the server to efficiently manage:

- Current question
- Player answers
- Scores
- Timers
- Session state
- Player participation

Redis also helps ensure that all connected players receive a consistent game state during the session.

### Real-Time Communication

WebSockets are used to synchronize the game between players.

The backend emits events when important state changes occur, such as:

- Player joining or leaving
- Player answering a question
- Starting a question
- Showing a question summary
- Completing the session

This allows the game to behave as a real-time multiplayer experience instead of relying on periodic HTTP polling.

### Database

Persistent application data is stored in MariaDB and accessed through Prisma.

The database is responsible for persistent entities such as:

- Users
- Friends
- Communities
- Questions
- Answers
- Quiz-related configuration
- Community rankings

Redis is used for temporary session state while MariaDB stores long-term application data.

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Socket.IO Client

### Backend

- NestJS
- TypeScript
- Prisma
- Socket.IO
- Redis

### Database & Infrastructure

- MariaDB
- Redis
- Docker
- Docker Compose
- Nginx
- Ubuntu VPS

### External Services

- Twitch OAuth
- Twitch API

## Running Locally

### Requirements

- Node.js
- Yarn
- Docker
- Docker Compose

### Installation

Clone the repository.

```bash
git clone YOUR_GITHUB_URL
cd ludio
```

Create the required environment files and configure the database, Redis and Twitch credentials.

Start the application using Docker Compose from the `app/server` directory:

```bash
cd app/server
docker compose up --build
```

After the containers have started, the application will be available at the configured local address.

## Production Deployment

Ludio is deployed as a containerized application on an Ubuntu VPS.

The production environment uses Docker Compose to run the application services and Nginx to serve the frontend and proxy API and WebSocket traffic to the backend.

The deployment includes:

- Frontend container
- Backend container
- MariaDB container
- Redis container
- Nginx reverse proxy

This allows the same application architecture to be used during local development and production deployment.

## Future Development

Ludio is an ongoing project and several features are planned for future releases.

Potential improvements include:

- Additional dedicated game modes
- Solo game mode
- More advanced OBS overlays and animations
- Additional quiz configuration options
- Further improvements to community features
- Expanded rankings and statistics

## Why I Built Ludio

Ludio started as a quiz application concept for Twitch communities and gradually evolved into a full-stack real-time multiplayer platform.

The project was built to explore the challenges of creating a complete production application rather than only implementing isolated frontend features.

Through Ludio, I worked with:

- Real-time multiplayer communication
- OAuth authentication
- External APIs
- Relational databases
- Redis-based state management
- WebSockets
- Containerization
- Reverse proxies
- Production deployment

The application is currently available online as my main full-stack portfolio project.
