# CodeQuiz CLI

CodeQuiz CLI is a command-line quiz game that tests your knowledge of coding-related questions. It's designed to provide
an interactive and entertaining way to learn and test your programming skills.

## Features

### 1. Introduction

The CodeQuiz CLI app starts with an introduction, displaying a title in a visually appealing manner.

```typescript
CliHelpers.displayIntro(QUIZ_TITLE);
```

### 2. Loading Packages

The app simulates a loading process, complete with a spinner, while packages are loaded in the background.

```typescript
await CliHelpers.loadPackages();
```

### 3. Asking Questions

The main part of the quiz involves asking a series of questions stored in `questionsData`. Users can answer these
questions one by one.

```typescript
await CliHelpers.askQuestions();
```

### 4. Displaying Results

Once the user answers all the questions, the app displays the user's score and provides feedback.

```typescript
CliHelpers.displayResult();
```

### 5. Ready to Play Prompt

The app asks the user if they are ready to play the quiz and proceeds accordingly based on the user's response.

```typescript
const readyToPlay = await p.select({
    message: "No cheating. 10 questions. Results at the end. Ready to play?",
    // ...
});
```

## Usage

1. Clone the repository.
2. Run the main script: `main()`

## Prerequisites

- Node.js
- npm or yarn

## Installation

1. Clone the repository.
2. Run `pnpm install` to install the required dependencies.

## Getting Started

1. Run the main script to start the quiz game.

```bash
pnpm dev
```

2. Answer the questions as they appear, and the app will display your score at the end.
