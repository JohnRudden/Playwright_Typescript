# Playwright_Typescript

Playwright framework (using Typescript and Docker) running E2E tests on the website Https://www.automationexercise.com

## Instructions for running tests without the docker container

### 1. Clone the repository to a folder on your local machine

    git clone https://github.com/JohnRudden/Playwright_Typescript.git

### 2. Install dependencies

    npm install

### 3. Install Playwright browsers - Chromium, Firefox and Webkit

    npx playwright install

### 4. Run the complete set of tests

    npx playwright test

### 5. View the test report

    npx playwright show-report

## Instructions for running tests in a docker container

### 1. Install docker desktop

    Go to the site https://www.docker.com/ and follow the instructions for your operating system

### 2. Clone the playwright_typescript repository to a folder on your local machine

    git clone https://github.com/JohnRudden/Playwright_Typescript.git

### 3. Run the tests within the docker container

    docker-compose up --build

### 4. View the report

    The playwright html report results will also be copied from the container to the project – npx playwright show-report
