# ArweaveID
An identity registry for Arweave addresses.

Last deployed permaweb: https://arweave.net/fGUdNmXFmflBMGI2f9vD7KzsrAc1s1USQgQLgAVT0W0

To fetch address data (ArQL):
```
{
    op: 'and',
    expr1:
        {
            op: 'equals',
            expr1: 'App-Name',
            expr2: 'arweave-id'
        },
    expr2:
        {
            op: 'equals',
            expr1: 'from',
            expr2: [target_address],
        },
  }
```
