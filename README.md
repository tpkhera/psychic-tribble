## Getting Started

# TODO: Getting Docker started

First you'll need to authenticate with your Sensu cluster and ensure required
environment variables are available in our shell.

```bash
# sign into cluster
sensuctl configure
# ensure environment variables are available
eval $(sensuctl env)
# make an export API_KEY we will use for accessing GraphQL service
export SENSU_API_KEY=$(sensuctl api-key grant admin | awk -F "/" '{print $NF}')
```

Next we can install the dependencies and start the dev server.

```bash
npm install
npm start
```

Good luck & have fun.

## Instructions

