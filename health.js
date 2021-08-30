/*
This is an example snippet - you should consider tailoring it
to your service.
*/

const fetch = require("node-fetch");
// const { utils, BigNumber } = require("ethers");

async function fetchGraphQL(operationsDoc, operationName, variables) {
    // const result = await fetch("http://localhost:8030/graphql", {
    const result = await fetch("https://api.thegraph.com/index-node/graphql", {
        method: "POST",
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName
        })
    });

    console.log({result});
    return await result.json();
}

// const SUBGRAPH = 'dan13ram/kovan-grants-platform';
// const SUBGRAPH = 'dan13ram/erc721-sokol-subgraph';
const SUBGRAPH = 'rigorhq/rigor-build-rinkeby';
// const SUBGRAPH = 'local/rigor-build';
// const SUBGRAPH = 'QmYKkUn4oZDAKKmLyZMf2Vh1UcJc51cwC3YmBCjQafwxz3';

const operationsDoc = `
  query Test {
    status: indexingStatusForCurrentVersion(subgraphName: "${SUBGRAPH}") {
      synced
      health
      fatalError {
        message
        block {
          number
          hash
        }
        handler
      }
      chains {
        chainHeadBlock {
          number
        }
        latestBlock {
          number
        }
      }
    }
  }
`;

function fetchTest() {
    return fetchGraphQL(operationsDoc, "Test", {});
}

// function printThis(data) {
//     const players = data.player
//         .map(p => {
//             if (!p.token_balance) return;
//             return {
//                 username: p.username,
//                 seedBalanceStr: utils.formatEther(p.token_balance.seedBalance),
//                 pSeedBalanceStr: utils.formatEther(
//                     p.token_balance.pSeedBalance
//                 ),
//                 seedBalance: BigNumber.from(p.token_balance.seedBalance),
//                 pSeedBalance: BigNumber.from(p.token_balance.pSeedBalance)
//             };
//         })
//         .filter(a => !!a);
//     const sorted = players.sort((a, b) => {
//         return a.pSeedBalance.gt(b.pSeedBalance) ? -1 : 1;
//     });
//     sorted.map(s => {
//         if (s.pSeedBalance.gt(0)) {
//             console.log({ username: s.username, pSeed: s.pSeedBalanceStr });
//         }
//     });
// }

async function startFetchTest() {
    const { errors, data } = await fetchTest();

    if (errors) {
        // handle those errors like a pro
        console.error(errors);
        return;
    }

    console.log(data)
        // console.log(data.status.chains)

}

startFetchTest();
