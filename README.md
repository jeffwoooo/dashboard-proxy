# Terra Dashboard Proxy Server

## Description

This serves data trasformed into preferred by new Terra Station's Charts.

After fetches data from FCD and transform, it caches data in memory while it relays to client.

Cache will be invalidated everyday 00:01.

## Installation

```
$ yarn
```

## Running the app

```
# development
$ yarn start
```

## API Endpoints

- `http://localhost:3000/tx-volume/:denom/periodic`
- `http://localhost:3000/tx-volume/:denom/cumulative`
- `http://localhost:3000/tax-rewards/periodic`
- `http://localhost:3000/tax-rewards/cumulative`
- `http://localhost:3000/accounts/total/periodic`
- `http://localhost:3000/accounts/total/cumulative`
- `http://localhost:3000/accounts/active/periodic`
- `http://localhost:3000/accounts/active/cumulative`
- `http://localhost:3000/staking-return/annualized`
- `http://localhost:3000/staking-return/daily`
