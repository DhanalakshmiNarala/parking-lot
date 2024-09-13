# Parking Lot

A simple parking lot application built with Node.js and TypeScript.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/DhanalakshmiNarala/parking-lot.git
   cd parking-lot
   ```

2. Running locally with ts-node

   Use the following command for running the application:

   ```bash
   npx ts-node src/index.ts #For Cli view
   npx ts-node src/index.ts file-inputs.txt #Input from file
   ```

3. Running with docker
   ```bash
   docker-compose run parking_lot #For Cli view
   docker-compose run parking_lot file-inputs.txt #Input from file
   ```
