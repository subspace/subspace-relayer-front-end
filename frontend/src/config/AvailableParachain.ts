import { ParachainProps } from "./interfaces/Parachain";
import { getApiUrl } from "./RpcSettings";
const subspaceWss = getApiUrl();

const kusamaParachains: ParachainProps[] = [
  {
    wss: "wss://kusama.api.onfinality.io/public-ws",
    paraId: 0,
    feedId: 0,
    chain: "kusama",
    chainName: "Kusama",
    web: "https://kusama.network/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://statemine.api.onfinality.io/public-ws",
    paraId: 1000,
    feedId: 1,
    chain: "statemine",
    chainName: "Statemine",
    web: "https://parachains.info/details/statemine",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://karura.api.onfinality.io/public-ws",
    paraId: 2000,
    feedId: 2,
    chain: "karura",
    chainName: "Karura",
    web: "https://acala.network/karura",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://bifrost-parachain.api.onfinality.io/public-ws",
    paraId: 2001,
    feedId: 3,
    chain: "bifrost",
    chainName: "Bifrost",
    web: "https://bifrost.finance/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://khala.api.onfinality.io/public-ws",
    paraId: 2004,
    feedId: 4,
    chain: "khala",
    chainName: "Khala",
    web: "https://phala.network/en/khala/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://shiden.api.onfinality.io/public-ws",
    paraId: 2007,
    feedId: 5,
    chain: "shiden",
    chainName: "Shiden",
    web: "https://phala.network/en/shiden/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://moonriver.api.onfinality.io/public-ws",
    paraId: 2023,
    feedId: 6,
    chain: "moonriver",
    chainName: "Moonriver",
    web: "https://moonbeam.foundation/moonriver-token/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://calamari.api.onfinality.io/public-ws",
    paraId: 2084,
    feedId: 7,
    chain: "calamari",
    chainName: "Calamari",
    web: "https://www.calamari.network/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://spiritnet.api.onfinality.io/public-ws",
    paraId: 2086,
    feedId: 8,
    chain: "kilt_spiritnet",
    chainName: "KILT Spiritnet",
    web: "https://www.kilt.io/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://basilisk.api.onfinality.io/public-ws",
    paraId: 2090,
    feedId: 9,
    chain: "basilisk",
    chainName: "Basilisk",
    web: "https://bsx.fi/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://altair.api.onfinality.io/public-ws",
    paraId: 2088,
    feedId: 10,
    chain: "altair",
    chainName: "Altair",
    web: "https://centrifuge.io/altair/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://parallel-heiko.api.onfinality.io/public-ws",
    paraId: 2085,
    chainName: "Parallel Heiko",
    chain: "parallel_heiko",
    feedId: 11,
    web: "https://parallel.fi/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://kintsugi.api.onfinality.io/public-ws",
    paraId: 2092,
    chainName: "Kintsugi BTC",
    chain: "kintsugi",
    feedId: 12,
    web: "https://kintsugi.interlay.io/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://pioneer-1-rpc.bit.country",
    paraId: 2096,
    chainName: "Bit.Country Pioneer",
    chain: "pionner",
    feedId: 13,
    web: "https://bit.country/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://node.genshiro.io",
    paraId: 2024,
    chainName: "Genshiro",
    chain: "genshiro",
    feedId: 14,
    web: "https://genshiro.equilibrium.io/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://us-ws-quartz.unique.network",
    paraId: 2095,
    chainName: "Quartz",
    chain: "quartz",
    feedId: 15,
    web: "https://unique.network/quartz/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://picasso-rpc.composable.finance",
    paraId: 2087,
    chainName: "Picasso",
    chain: "picasso",
    feedId: 16,
    web: "https://picasso.composable.finance/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://api.kusama.encointer.org",
    paraId: 1001,
    chainName: "Encointer",
    chain: "encointer",
    feedId: 17,
    web: "https://encointer.org/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "wss://kusama.rpc.robonomics.network",
    paraId: 2048,
    chainName: "Robonomics",
    chain: "robonomics",
    feedId: 18,
    web: "https://robonomics.network/",
    ecosystem: "kusama",
    subspaceWss,
  },
  {
    wss: "rpc-0.zeitgeist.pm",
    paraId: 2101,
    chainName: "Zeitgeist",
    chain: "zeitgeist",
    feedId: 19,
    web: "https://zeitgeist.pm",
    ecosystem: "kusama",
    subspaceWss,
  },
];

const polkadotParachains: ParachainProps[] = [
  {
    wss: "wss://polkadot.api.onfinality.io/public-ws",
    paraId: 2087,
    chainName: "Polkadot",
    chain: "polkadot",
    feedId: 20,
    web: "https://polkadot.network/",
    ecosystem: "polkadot",
    subspaceWss,
  },

  {
    wss: "wss://statemint-rpc.polkadot.io",
    paraId: 1000,
    chainName: "Statemint",
    chain: "statemint",
    feedId: 21,
    web: "https://parachains.info/details/statemint",
    ecosystem: "polkadot",
    subspaceWss,
  },
  {
    wss: "wss://acala-rpc-0.aca-api.network",
    paraId: 2000,
    chainName: "Acala",
    chain: "acala",
    feedId: 22,
    web: "https://acala.network/",
    ecosystem: "polkadot",
    subspaceWss,
  },
  {
    wss: "wss://rpc.astar.network",
    paraId: 2006,
    chainName: "Astar",
    chain: "astar",
    feedId: 23,
    web: "https://astar.network/",
    ecosystem: "polkadot",
    subspaceWss,
  },
  {
    wss: "wss://rpc-para.clover.finance",
    paraId: 2002,
    chainName: "Clover Finance",
    chain: "clover",
    feedId: 24,
    web: "https://clover.finance/",
    ecosystem: "polkadot",
    subspaceWss,
  },
  {
    wss: "wss://wss.api.moonbeam.network",
    paraId: 2004,
    chainName: "Moonbeam",
    chain: "moonbeam",
    feedId: 25,
    web: "https://moonbeam.network/",
    ecosystem: "polkadot",
    subspaceWss,
  },
  {
    wss: "wss://rpc.parallel.fi",
    paraId: 2012,
    chainName: "Parallel Finance",
    chain: "parallel_finance",
    feedId: 26,
    web: "https://moonbeam.network/",
    ecosystem: "polkadot",
    subspaceWss,
  },
];

export const allChains = [...kusamaParachains, ...polkadotParachains];
