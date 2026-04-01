# pax_romana_server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.3.6. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

****
The project is running using a local instance of postgreSQL so please ensure you have at least **psql** installed to test it locally on your device. Or you can modify the file in _config/db_ to point it to a remote instance of postgres

****
The queries needed to build the database are stored in _./queries.sql_ so you'll just need to execute those. Then you follow up with the insert statements stored in _./insert_queries.sql_
****

## Note for those using npm and node

Use _npm i_ or _npm install_ to download dependencies it will not conflict with bun

```bash
    npm install
```

Also in the _package.json_ remember to remove the "--bun" flag so it uses the default javascript interpreter of your system
