# Sensu Web Dev

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Manual Installation](#manual-installation)
  - [Docker Compose Installation](#docker-compose-installation)

# Overview

The Sensu Web Dev project is a template for developing prototype web applications for [Sensu Go](https://sensu.io).
The primary objective of this project is to provide a simple local development environment for Sensu front end engineering skills assessments (i.e. technical job interviews).

# Prerequisites

1. **Git**

   Please visit the [Git user documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for instructions on installing Docker.

1. **Docker**

   Please visit the [Docker user documentation](https://docs.docker.com/get-docker/) for instructions on installing Docker.

1. **NodeJS & NPM**

   Please visit the [NodeJS Downloads page](https://nodejs.org/en/download/) for instructions on installing NodeJS.

   _NOTE: please verify your NodeJS installation by running the `npm --version` command._

1. **Docker Compose (optional)**

   Please visit the [Docker user documentation](https://docs.docker.com/compose/install/) for instructions on installing `docker-compose`.

## Setup

There are two ways to setup the Sensu Web Dev environment: manual installation (recommended for most users), and Docker Compose (only recommended if you're familiar with Docker Compose).

### Manual Installation

1. **Clone this repository.**

   ```shell
   git clone https://github.com/sensu/sensu-web-dev.git
   cd sensu-web-dev
   ```

1. **Download and start the Sensu Backend/API using Docker.**

   ```shell
   docker run -d --rm --name sensu-backend \
   -p 8080:8080 -p 3000:3000 \
   sensu/sensu:6.4.0 sensu-backend start
   ```

   _NOTE: if your Docker installation requires `root` user privileges, you may need to re-run this command with `sudo` (i.e. `sudo docker run ...`);
   Windows users may need to run `docker` commands in a shell with Administrator privileges._

   After completing this step you should be able to verify your install by visiting the Sensu web app at http://127.0.0.1:8080.

1. **Download and configure the Sensu CLI (`sensuctl`)**

   **Mac users:**

   ```shell
   # Download sensuctl
   export SENSU_VERSION="6.4.0"
   curl -LO "https://s3-us-west-2.amazonaws.com/sensu.io/sensu-go/${SENSU_VERSION}/sensu-go_${SENSU_VERSION}_darwin_amd64.tar.gz"
   sudo tar -xzf "sensu-go_${SENSU_VERSION}_darwin_amd64.tar.gz" -C /usr/local/bin/
   rm sensu-go_${SENSU_VERSION}_darwin_amd64.tar.gz
   # Configure sensuctl
   sensuctl configure --api-url http://127.0.0.1:8080
   ```

   **Windows users (Powershell):**

   ```powershell
   # Download sensuctl
   ${Env:SENSU_VERSION}="6.4.0"
   Invoke-WebRequest `
     -Uri "https://s3-us-west-2.amazonaws.com/sensu.io/sensu-go/${Env:SENSU_VERSION}/sensu-go_${Env:SENSU_VERSION}_windows_amd64.zip" `
     -OutFile "${Env:UserProfile}\sensu-go_${Env:SENSU_VERSION}_windows_amd64.zip"
   Expand-Archive `
     -LiteralPath "${Env:UserProfile}\sensu-go_${Env:SENSU_VERSION}_windows_amd64.zip" `
     -DestinationPath "${Env:UserProfile}\Sensu\bin"
   ${Env:Path} += ";${Env:UserProfile}\Sensu\bin"
   # Configure sensuctl
   sensuctl configure --api-url http://127.0.0.1:8080
   ```

   **Linux users:**

   ```shell
   # Download sensuctl
   export SENSU_VERSION="6.4.0"
   curl -LO "https://s3-us-west-2.amazonaws.com/sensu.io/sensu-go/${SENSU_VERSION}/sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz" && \
   tar -xzf "sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz" -C /usr/local/bin/ && \
   rm "sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz"
   # Configure sensuctl
   sensuctl configure --api-url http://127.0.0.1:8080
   ```

1. **Pre-seed the Sensu API with sample data.**

   ```shell
   sensuctl create -rf data/
   ```

   Verify that the sample data was created using the following commands:

   - `sensuctl namespace list`

     ```shell
     $ sensuctl namespace list
          Name
     ───────────────
       default
       development
       production
       staging
       trainee
     ```

  - `sensuctl entity list`

     ```shell
     $ sensuctl entity list --all-namespaces
             ID         Class      OS                       Subscriptions                              Last Seen
     ───────────────── ─────── ────────── ───────────────────────────────────────────────── ────────────────────────────────
       db01             agent   linux      system/linux,workshop,devel,entity:28b2d129bd90   2021-08-05 17:02:56 -0700 PDT
       app0             proxy   Workshop   entity:learn.sensu.io                             N/A
     ```

1. **Create a Sensu API Key.**

   - Generate a Sensu API Key using the `sensuctl api-key grant admin` command:

     ```
     $ sensuctl api-key grant admin
     Created: /api/core/v2/apikeys/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     ```

   - Add the API Key to the `.env` file provided in this repository:

     Copy the API key output from the `sensuctl api-key grant admin` command (the `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` part of the output) to the `.env` file

     ```ruby
     REACT_APP_API="http://127.0.0.1:8080"
     REACT_APP_KEY="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
     PORT=7678
     ```

1. **Install the ReactJS project dependencies & start the sample app.**

   ```bash
   npm install
   npm start
   ```

   Verify that you have successfully completed the installation by visiting [http://127.0.0.1:7678](http://127.0.0.1:7678) in your browser.
   If you see a message like "connected to cluster running 6.4.0" then you have successfully completed this setup.

1. **Good luck & have fun!**

### Docker Compose Installation

Coming soon... PRs welcome! 😅