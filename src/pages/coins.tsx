import { dehydrate, useQuery, QueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ContentTable from "@/components/ContentTable";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";
import Select from "react-select";
import { useEffect } from "react";
import { axiosInstance } from "../axios/axios";
import { Coin } from "@/types/types";
import { Category } from "@/types/types";

export default function Coins() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([
    {
      category_id: "aave-tokens",
      name: "Aave Tokens",
    },
    {
      category_id: "algorand-ecosystem",
      name: "Algorand Ecosystem",
    },
    {
      category_id: "alleged-sec-securities",
      name: "Alleged SEC Securities",
    },
    {
      category_id: "analytics",
      name: "Analytics",
    },
    {
      category_id: "animal-racing",
      name: "Animal Racing",
    },
    {
      category_id: "animoca-brands",
      name: "Animoca Brands",
    },
    {
      category_id: "aptos-ecosystem",
      name: "Aptos Ecosystem",
    },
    {
      category_id: "arbitrum-ecosystem",
      name: "Arbitrum Ecosystem",
    },
    {
      category_id: "arbitrum-nova-ecosystem",
      name: "Arbitrum Nova Ecosystem",
    },
    {
      category_id: "art",
      name: "Art",
    },
    {
      category_id: "art-blocks-ecosystem",
      name: "Art Blocks Ecosystem",
    },
    {
      category_id: "artificial-intelligence",
      name: "Artificial Intelligence (AI)",
    },
    {
      category_id: "asset-backed-tokens",
      name: "Asset-backed Tokens",
    },
    {
      category_id: "asset-manager",
      name: "Asset Manager",
    },
    {
      category_id: "augmented-reality",
      name: "Augmented Reality",
    },
    {
      category_id: "automated-market-maker-amm",
      name: "Automated Market Maker (AMM)",
    },
    {
      category_id: "avalanche-ecosystem",
      name: "Avalanche Ecosystem",
    },
    {
      category_id: "axie-infinity",
      name: "Axie Infinity",
    },
    {
      category_id: "azuki-ecosystem",
      name: "Azuki Ecosystem",
    },
    {
      category_id: "base-ecosystem",
      name: "Base Ecosystem",
    },
    {
      category_id: "big-data",
      name: "Big Data",
    },
    {
      category_id: "binance-launchpad",
      name: "Binance Launchpad",
    },
    {
      category_id: "binance-launchpool",
      name: "Binance Launchpool",
    },
    {
      category_id: "binance-smart-chain",
      name: "BNB Chain Ecosystem",
    },
    {
      category_id: "bored-ape-ecosystem",
      name: "Bored Ape Ecosystem",
    },
    {
      category_id: "brc-20",
      name: "BRC-20",
    },
    {
      category_id: "bridge-governance-tokens",
      name: "Bridge Governance Tokens",
    },
    {
      category_id: "business-platform",
      name: "Business Platform",
    },
    {
      category_id: "business-services",
      name: "Business Services",
    },
    {
      category_id: "canto-ecosystem",
      name: "Canto Ecosystem",
    },
    {
      category_id: "cardano-ecosystem",
      name: "Cardano Ecosystem",
    },
    {
      category_id: "celer-network",
      name: "Celer Network",
    },
    {
      category_id: "celo-ecosystem",
      name: "Celo Ecosystem",
    },
    {
      category_id: "centralized-exchange-token-cex",
      name: "Centralized Exchange (CEX)",
    },
    {
      category_id: "charity",
      name: "Charity",
    },
    {
      category_id: "cny-stablecoin",
      name: "CNY Stablecoin",
    },
    {
      category_id: "collectibles",
      name: "Collectibles",
    },
    {
      category_id: "communication",
      name: "Communication",
    },
    {
      category_id: "compound-tokens",
      name: "Compound Tokens",
    },
    {
      category_id: "cosmos-ecosystem",
      name: "Cosmos Ecosystem",
    },
    {
      category_id: "cronos-ecosystem",
      name: "Cronos Ecosystem",
    },
    {
      category_id: "cryptocurrency",
      name: "Cryptocurrency",
    },
    {
      category_id: "ctokens",
      name: "cToken",
    },
    {
      category_id: "cyberkongz-ecosystem",
      name: "CyberKongz Ecosystem",
    },
    {
      category_id: "daomaker-ecosystem",
      name: "DaoMaker Ecosystem",
    },
    {
      category_id: "decentralized-exchange",
      name: "Decentralized Exchange (DEX)",
    },
    {
      category_id: "decentralized-finance-defi",
      name: "Decentralized Finance (DeFi)",
    },
    {
      category_id: "defi-index",
      name: "DeFi Index",
    },
    {
      category_id: "delabs",
      name: "DeLabs",
    },
    {
      category_id: "depin",
      name: "DePIN",
    },
    {
      category_id: "decentralized-derivatives",
      name: "Derivatives",
    },
    {
      category_id: "discord-bots",
      name: "Discord Bots",
    },
    {
      category_id: "doodles-llc",
      name: "Doodles LLC",
    },
    {
      category_id: "edgeware-ecosystem",
      name: "Edgeware Ecosystem",
    },
    {
      category_id: "education",
      name: "Education",
    },
    {
      category_id: "energy",
      name: "Energy",
    },
    {
      category_id: "entertainment",
      name: "Entertainment",
    },
    {
      category_id: "eco-friendly",
      name: "Environment",
    },
    {
      category_id: "etf",
      name: "ETF",
    },
    {
      category_id: "eth-2-0-staking",
      name: "Eth 2.0 Staking",
    },
    {
      category_id: "ethereum-ecosystem",
      name: "Ethereum Ecosystem",
    },
    {
      category_id: "ethereum-pos-iou",
      name: "Ethereum PoS IOU",
    },
    {
      category_id: "ethereumpow-ecosystem",
      name: "EthereumPoW Ecosystem",
    },
    {
      category_id: "ethereum-pow-iou",
      name: "Ethereum PoW IOU",
    },
    {
      category_id: "eur-stablecoin",
      name: "EUR Stablecoin",
    },
    {
      category_id: "exchange-based-tokens",
      name: "Exchange-based Tokens",
    },
    {
      category_id: "f1-partnership",
      name: "F1 Partnership",
    },
    {
      category_id: "fan-token",
      name: "Fan Token",
    },
    {
      category_id: "fantom-ecosystem",
      name: "Fantom Ecosystem",
    },
    {
      category_id: "farming-as-a-service-faas",
      name: "Farming-as-a-Service (FaaS)",
    },
    {
      category_id: "finance-banking",
      name: "Finance / Banking",
    },
    {
      category_id: "fixed-interest",
      name: "Fixed Interest",
    },
    {
      category_id: "fractionalized-nft",
      name: "Fractionalized NFT",
    },
    {
      category_id: "friend-tech",
      name: "friend.tech",
    },
    {
      category_id: "gambling",
      name: "Gambling",
    },
    {
      category_id: "gaming",
      name: "Gaming (GameFi)",
    },
    {
      category_id: "gbp-stablecoin",
      name: "GBP Stablecoin",
    },
    {
      category_id: "gig-economy",
      name: "Gig Economy",
    },
    {
      category_id: "xdai-ecosystem",
      name: "Gnosis Chain Ecosystem",
    },
    {
      category_id: "gotchiverse",
      name: "Gotchiverse",
    },
    {
      category_id: "governance",
      name: "Governance",
    },
    {
      category_id: "guild-scholarship",
      name: "Guild and Scholarship",
    },
    {
      category_id: "harmony-ecosystem",
      name: "Harmony Ecosystem",
    },
    {
      category_id: "healthcare",
      name: "Healthcare",
    },
    {
      category_id: "heco-chain-ecosystem",
      name: "HECO Chain Ecosystem",
    },
    {
      category_id: "identity",
      name: "Identity",
    },
    {
      category_id: "idr-stablecoin",
      name: "IDR Stablecoin",
    },
    {
      category_id: "impossible-launchpad",
      name: "Impossible Launchpad",
    },
    {
      category_id: "index-coin",
      name: "Index",
    },
    {
      category_id: "infrastructure",
      name: "Infrastructure",
    },
    {
      category_id: "insurance",
      name: "Insurance",
    },
    {
      category_id: "dfinity-ecosystem",
      name: "Internet Computer Ecosystem",
    },
    {
      category_id: "internet-of-things-iot",
      name: "Internet of Things (IOT)",
    },
    {
      category_id: "interoperability",
      name: "Interoperability",
    },
    {
      category_id: "investment",
      name: "Investment",
    },
    {
      category_id: "iotex-ecosystem",
      name: "IoTeX Ecosystem",
    },
    {
      category_id: "iou-tokens",
      name: "IOU tokens",
    },
    {
      category_id: "jack-butcher-ecosystem",
      name: "Jack Butcher Ecosystem",
    },
    {
      category_id: "jpy-stablecoin",
      name: "JPY Stablecoin",
    },
    {
      category_id: "kardiachain-ecosystem",
      name: "KardiaChain Ecosystem",
    },
    {
      category_id: "klaytn-ecosystem",
      name: "Klaytn Ecosystem",
    },
    {
      category_id: "kommunitas",
      name: "Kommunitas Launchpad",
    },
    {
      category_id: "krw-stablecoin",
      name: "KRW Stablecoin",
    },
    {
      category_id: "large-cap",
      name: "Large-Cap PFP",
    },
    {
      category_id: "launchpad",
      name: "Launchpad",
    },
    {
      category_id: "layer-1",
      name: "Layer 1 (L1)",
    },
    {
      category_id: "layer-2",
      name: "Layer 2 (L2)",
    },
    {
      category_id: "legal",
      name: "Legal",
    },
    {
      category_id: "lending-borrowing",
      name: "Lending/Borrowing",
    },
    {
      category_id: "leveraged-token",
      name: "Leveraged Token",
    },
    {
      category_id: "linea-ecosystem",
      name: "Linea Ecosystem",
    },
    {
      category_id: "liquid-staking-governance-tokens",
      name: "Liquid Staking Governance Tokens",
    },
    {
      category_id: "liquid-staking-tokens",
      name: "Liquid Staking Tokens",
    },
    {
      category_id: "lp-tokens",
      name: "LP Tokens",
    },
    {
      category_id: "lsdfi",
      name: "LSDFi",
    },
    {
      category_id: "mantle-ecosystem",
      name: "Mantle Ecosystem",
    },
    {
      category_id: "manufacturing",
      name: "Manufacturing",
    },
    {
      category_id: "marketing",
      name: "Marketing",
    },
    {
      category_id: "masternodes",
      name: "Masternodes",
    },
    {
      category_id: "media",
      name: "Media",
    },
    {
      category_id: "meme-token",
      name: "Meme",
    },
    {
      category_id: "memeland-ecosystem",
      name: "Memeland Ecosystem",
    },
    {
      category_id: "metagovernance",
      name: "Metagovernance",
    },
    {
      category_id: "metaverse",
      name: "Metaverse",
    },
    {
      category_id: "metis-ecosystem",
      name: "Metis Ecosystem",
    },
    {
      category_id: "mev-protection",
      name: "MEV Protection",
    },
    {
      category_id: "mid-cap",
      name: "Mid-Cap PFP",
    },
    {
      category_id: "mirrored-assets",
      name: "Mirrored Assets",
    },
    {
      category_id: "moonbeam-ecosystem",
      name: "Moonbeam Ecosystem",
    },
    {
      category_id: "moonriver-ecosystem",
      name: "Moonriver Ecosystem",
    },
    {
      category_id: "move-to-earn",
      name: "Move To Earn",
    },
    {
      category_id: "multversx-ecosystem",
      name: "MultiversX Ecosystem",
    },
    {
      category_id: "music",
      name: "Music",
    },
    {
      category_id: "near-protocol-ecosystem",
      name: "Near Protocol Ecosystem",
    },
    {
      category_id: "non-fungible-tokens-nft",
      name: "NFT",
    },
    {
      category_id: "nft-index",
      name: "NFT Index",
    },
    {
      category_id: "nft-marketplace",
      name: "NFT Marketplace",
    },
    {
      category_id: "niftex-shards",
      name: "Niftex Shards",
    },
    {
      category_id: "nounsdao",
      name: "NounsDAO",
    },
    {
      category_id: "number",
      name: "Number",
    },
    {
      category_id: "ocm-ecosystem",
      name: "OCM Ecosystem",
    },
    {
      category_id: "oec-ecosystem",
      name: "OEC Ecosystem",
    },
    {
      category_id: "ohm-fork",
      name: "Ohm Fork",
    },
    {
      category_id: "olympus-pro",
      name: "Olympus Pro",
    },
    {
      category_id: "optimism-ecosystem",
      name: "Optimism Ecosystem",
    },
    {
      category_id: "decentralized-options",
      name: "Options",
    },
    {
      category_id: "oracle",
      name: "Oracle",
    },
    {
      category_id: "payment-solutions",
      name: "Payment Solutions",
    },
    {
      category_id: "decentralized-perpetuals",
      name: "Perpetuals",
    },
    {
      category_id: "pfp-avatar",
      name: "PFP / Avatar",
    },
    {
      category_id: "play-to-earn",
      name: "Play To Earn",
    },
    {
      category_id: "dot-ecosystem",
      name: "Polkadot Ecosystem",
    },
    {
      category_id: "polygon-ecosystem",
      name: "Polygon Ecosystem",
    },
    {
      category_id: "prediction-markets",
      name: "Prediction Markets",
    },
    {
      category_id: "privacy-coins",
      name: "Privacy Coins",
    },
    {
      category_id: "proof-ecosystem",
      name: "Proof Ecosystem",
    },
    {
      category_id: "protocol",
      name: "Protocol",
    },
    {
      category_id: "pudgy-ecosystem",
      name: "Pudgy Ecosystem",
    },
    {
      category_id: "pulsechain-ecosystem",
      name: "PulseChain Ecosystem",
    },
    {
      category_id: "real-estate",
      name: "Real Estate",
    },
    {
      category_id: "realt-tokens",
      name: "RealT Tokens",
    },
    {
      category_id: "real-world-assets-rwa",
      name: "Real World Assets (RWA)",
    },
    {
      category_id: "rebase-tokens",
      name: "Rebase Tokens",
    },
    {
      category_id: "reddit-points",
      name: "Reddit Points",
    },
    {
      category_id: "remittance",
      name: "Remittance",
    },
    {
      category_id: "retail",
      name: "Retail",
    },
    {
      category_id: "seigniorage",
      name: "Seigniorage",
    },
    {
      category_id: "sgd-stablcoin",
      name: "SGD Stablcoin",
    },
    {
      category_id: "smart-contract-platform",
      name: "Smart Contract Platform",
    },
    {
      category_id: "socialfi",
      name: "SocialFi",
    },
    {
      category_id: "software",
      name: "Software",
    },
    {
      category_id: "solana-ecosystem",
      name: "Solana Ecosystem",
    },
    {
      category_id: "sports",
      name: "Sports",
    },
    {
      category_id: "stablecoins",
      name: "Stablecoins",
    },
    {
      category_id: "step-network-ecosystem",
      name: "Step Network Ecosystem",
    },
    {
      category_id: "storage",
      name: "Storage",
    },
    {
      category_id: "structured-products",
      name: "Structured Products",
    },
    {
      category_id: "sui-ecosystem",
      name: "Sui Ecosystem",
    },
    {
      category_id: "synthetic-assets",
      name: "Synthetic Issuer",
    },
    {
      category_id: "synths",
      name: "Synths",
    },
    {
      category_id: "technology-science",
      name: "Technology & Science",
    },
    {
      category_id: "telegram-bots",
      name: "Telegram Bots",
    },
    {
      category_id: "tenet-ecosystem",
      name: "Tenet Ecosystem",
    },
    {
      category_id: "terra-ecosystem",
      name: "Terra Ecosystem",
    },
    {
      category_id: "tezos-ecosystem",
      name: "Tezos Ecosystem",
    },
    {
      category_id: "tokenized-btc",
      name: "Tokenized BTC",
    },
    {
      category_id: "tokenized-gold",
      name: "Tokenized Gold",
    },
    {
      category_id: "tokenized-products",
      name: "Tokenized Products",
    },
    {
      category_id: "tokenized-stock",
      name: "Tokenized Stock",
    },
    {
      category_id: "tokensets",
      name: "TokenSets",
    },
    {
      category_id: "tourism",
      name: "Tourism",
    },
    {
      category_id: "try-stablecoins",
      name: "TRY Stablecoin",
    },
    {
      category_id: "usd-stablecoin",
      name: "USD Stablecoin",
    },
    {
      category_id: "us-election-2020",
      name: "US Election 2020",
    },
    {
      category_id: "utokens",
      name: "uTokens",
    },
    {
      category_id: "velas-ecosystem",
      name: "Velas Ecosystem",
    },
    {
      category_id: "virtual-reality",
      name: "Virtual Reality",
    },
    {
      category_id: "wallets",
      name: "Wallets",
    },
    {
      category_id: "wormhole-assets",
      name: "Wormhole Assets",
    },
    {
      category_id: "wrapped-tokens",
      name: "Wrapped-Tokens",
    },
    {
      category_id: "xdc-ecosystem",
      name: "XDC Ecosystem",
    },
    {
      category_id: "yearn-yfi-partnerships-mergers",
      name: "Yearn Ecosystem",
    },
    {
      category_id: "yearn-vault-tokens",
      name: "Yearn Vault Tokens",
    },
    {
      category_id: "yield-aggregator",
      name: "Yield Aggregator",
    },
    {
      category_id: "yield-farming",
      name: "Yield Farming",
    },
    {
      category_id: "zero-knowledge-zk",
      name: "Zero Knowledge (ZK)",
    },
    {
      category_id: "zilliqa-ecosystem",
      name: "Zilliqa Ecosystem",
    },
    {
      category_id: "zksync-ecosystem",
      name: "ZkSync Ecosystem",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    {
      category_id: router.query.category as string,
      name: router.query.category as string,
    } || { category_id: null, name: null }
  );



  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);




    useEffect(() => {
      axiosInstance
        .get("coins/categories/list")
        .then((res) => {
          setCategories(res.data);
        });
    }, []);

  const sample = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image:
        "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      current_price: 25913,
      market_cap: 507089109376,
      market_cap_rank: 1,
      fully_diluted_valuation: 547106905277,
      total_volume: 11901509635,
      high_24h: 26225,
      low_24h: 25944,
      price_change_24h: -168.36463757871752,
      price_change_percentage_24h: -0.64553,
      market_cap_change_24h: -753319476.9646606,
      market_cap_change_percentage_24h: -0.14834,
      circulating_supply: 19463968,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -62.23303,
      ath_date: "2021-11-10T14:24:11.849Z",
      atl: 67.81,
      atl_change_percentage: 38355.24947,
      atl_date: "2013-07-06T00:00:00.000Z",
      roi: null,
      last_updated: "2023-08-21T15:29:43.983Z",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      current_price: 1658.75,
      market_cap: 200642057386,
      market_cap_rank: 2,
      fully_diluted_valuation: 200642057386,
      total_volume: 6867814033,
      high_24h: 1689.26,
      low_24h: 1666.24,
      price_change_24h: -11.803982880905323,
      price_change_percentage_24h: -0.70659,
      market_cap_change_24h: -205937655.20059204,
      market_cap_change_percentage_24h: -0.10253,
      circulating_supply: 120215150.7199,
      total_supply: 120215150.7199,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -65.74171,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 385879.24787,
      atl_date: "2015-10-20T00:00:00.000Z",
      roi: {
        times: 84.49142974288797,
        currency: "btc",
        percentage: 8449.142974288798,
      },
      last_updated: "2023-08-21T15:29:47.769Z",
    },
    {
      id: "tether",
      symbol: "usdt",
      name: "Tether",
      image:
        "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
      current_price: 1.003,
      market_cap: 83117177891,
      market_cap_rank: 3,
      fully_diluted_valuation: 83117177891,
      total_volume: 12130422406,
      high_24h: 1.003,
      low_24h: 0.997806,
      price_change_24h: 0.00322312,
      price_change_percentage_24h: 0.3223,
      market_cap_change_24h: 288213464,
      market_cap_change_percentage_24h: 0.34796,
      circulating_supply: 82846484080.7792,
      total_supply: 82846484080.7792,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.20163,
      ath_date: "2018-07-24T00:00:00.000Z",
      atl: 0.572521,
      atl_change_percentage: 75.16993,
      atl_date: "2015-03-02T00:00:00.000Z",
      roi: null,
      last_updated: "2023-08-21T15:25:00.706Z",
    },
    {
      id: "binancecoin",
      symbol: "bnb",
      name: "BNB",
      image:
        "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
      current_price: 208.39,
      market_cap: 32179948145,
      market_cap_rank: 4,
      fully_diluted_valuation: 41831214605,
      total_volume: 561813424,
      high_24h: 217.6,
      low_24h: 208.36,
      price_change_24h: -7.600914897471313,
      price_change_percentage_24h: -3.5191,
      market_cap_change_24h: -1058635605.4109764,
      market_cap_change_percentage_24h: -3.18496,
      circulating_supply: 153856150,
      total_supply: 153856150,
      max_supply: 200000000,
      ath: 686.31,
      ath_change_percentage: -69.48897,
      ath_date: "2021-05-10T07:24:17.097Z",
      atl: 0.0398177,
      atl_change_percentage: 525794.7959,
      atl_date: "2017-10-19T00:00:00.000Z",
      roi: null,
      last_updated: "2023-08-21T15:29:51.069Z",
    },
    {
      id: "ripple",
      symbol: "xrp",
      name: "XRP",
      image:
        "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
      current_price: 0.516749,
      market_cap: 27652948418,
      market_cap_rank: 5,
      fully_diluted_valuation: 52331511415,
      total_volume: 1397618200,
      high_24h: 0.543888,
      low_24h: 0.518541,
      price_change_24h: -0.02162088777271076,
      price_change_percentage_24h: -4.01599,
      market_cap_change_24h: -768256802.5520706,
      market_cap_change_percentage_24h: -2.70311,
      circulating_supply: 52841868447,
      total_supply: 99988501123,
      max_supply: 100000000000,
      ath: 3.4,
      ath_change_percentage: -84.57307,
      ath_date: "2018-01-07T00:00:00.000Z",
      atl: 0.00268621,
      atl_change_percentage: 19417.35041,
      atl_date: "2014-05-22T00:00:00.000Z",
      roi: null,
      last_updated: "2023-08-21T15:29:49.487Z",
    },
    {
      id: "usd-coin",
      symbol: "usdc",
      name: "USD Coin",
      image:
        "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      current_price: 0.999082,
      market_cap: 25992987050,
      market_cap_rank: 6,
      fully_diluted_valuation: 25993052148,
      total_volume: 4152358758,
      high_24h: 1.004,
      low_24h: 0.997806,
      price_change_24h: -0.000800415547437372,
      price_change_percentage_24h: -0.08005,
      market_cap_change_24h: 31769616,
      market_cap_change_percentage_24h: 0.12237,
      circulating_supply: 25912948307.3715,
      total_supply: 25913013204.6694,
      max_supply: null,
      ath: 1.17,
      ath_change_percentage: -14.52533,
      ath_date: "2019-05-08T00:40:28.300Z",
      atl: 0.877647,
      atl_change_percentage: 14.21073,
      atl_date: "2023-03-11T08:02:13.981Z",
      roi: null,
      last_updated: "2023-08-21T15:29:43.887Z",
    },
    {
      id: "staked-ether",
      symbol: "steth",
      name: "Lido Staked Ether",
      image:
        "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1608607546",
      current_price: 1660.12,
      market_cap: 13772350781,
      market_cap_rank: 7,
      fully_diluted_valuation: 13772350781,
      total_volume: 7598672,
      high_24h: 1687.39,
      low_24h: 1665.15,
      price_change_24h: -8.738400759910292,
      price_change_percentage_24h: -0.52362,
      market_cap_change_24h: 69384651,
      market_cap_change_percentage_24h: 0.50635,
      circulating_supply: 8258926.13351161,
      total_supply: 8258926.13351161,
      max_supply: 8258926.13351161,
      ath: 4829.57,
      ath_change_percentage: -65.38271,
      ath_date: "2021-11-10T14:40:47.256Z",
      atl: 482.9,
      atl_change_percentage: 246.21651,
      atl_date: "2020-12-22T04:08:21.854Z",
      roi: null,
      last_updated: "2023-08-21T15:29:25.813Z",
    },
    {
      id: "cardano",
      symbol: "ada",
      name: "Cardano",
      image:
        "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
      current_price: 0.262217,
      market_cap: 9300019562,
      market_cap_rank: 8,
      fully_diluted_valuation: 11941807149,
      total_volume: 170870494,
      high_24h: 0.272455,
      low_24h: 0.265304,
      price_change_24h: -0.006893591870260452,
      price_change_percentage_24h: -2.56162,
      market_cap_change_24h: -124899709.80699539,
      market_cap_change_percentage_24h: -1.32521,
      circulating_supply: 35045020830.3234,
      total_supply: 45000000000,
      max_supply: 45000000000,
      ath: 3.09,
      ath_change_percentage: -91.37242,
      ath_date: "2021-09-02T06:00:10.474Z",
      atl: 0.01925275,
      atl_change_percentage: 1283.3133,
      atl_date: "2020-03-13T02:22:55.044Z",
      roi: null,
      last_updated: "2023-08-21T15:29:44.987Z",
    },
    {
      id: "dogecoin",
      symbol: "doge",
      name: "Dogecoin",
      image:
        "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
      current_price: 0.061573,
      market_cap: 8769268989,
      market_cap_rank: 9,
      fully_diluted_valuation: 8769267119,
      total_volume: 317491069,
      high_24h: 0.064091,
      low_24h: 0.062245,
      price_change_24h: -0.002195118118443335,
      price_change_percentage_24h: -3.44233,
      market_cap_change_24h: -201307867.99214745,
      market_cap_change_percentage_24h: -2.24409,
      circulating_supply: 140681856383.705,
      total_supply: 140681826383.705,
      max_supply: null,
      ath: 0.731578,
      ath_change_percentage: -91.45508,
      ath_date: "2021-05-08T05:08:23.458Z",
      atl: 0.0000869,
      atl_change_percentage: 71833.34774,
      atl_date: "2015-05-06T00:00:00.000Z",
      roi: null,
      last_updated: "2023-08-21T15:29:52.390Z",
    },
    {
      id: "solana",
      symbol: "sol",
      name: "Solana",
      image:
        "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
      current_price: 20.75,
      market_cap: 8568174163,
      market_cap_rank: 10,
      fully_diluted_valuation: 11675185659,
      total_volume: 293975645,
      high_24h: 21.91,
      low_24h: 21.02,
      price_change_24h: -1.0388389211532782,
      price_change_percentage_24h: -4.76799,
      market_cap_change_24h: -312411498.26292896,
      market_cap_change_percentage_24h: -3.51792,
      circulating_supply: 407643918.66722,
      total_supply: 555464716.584358,
      max_supply: null,
      ath: 259.96,
      ath_change_percentage: -91.85457,
      ath_date: "2021-11-06T21:54:35.825Z",
      atl: 0.500801,
      atl_change_percentage: 4128.18576,
      atl_date: "2020-05-11T19:35:23.449Z",
      roi: null,
      last_updated: "2023-08-21T15:29:44.443Z",
    },
  ];
 
  const { data, isLoading, isError } = useQuery<Coin[]>(
    ["coins", page, selectedCategory],
    async () =>
      await axiosInstance
        .get(
          `coins/markets?vs_currency=usd&amp;page=${page}${
            selectedCategory.category_id
              ? `&category=${selectedCategory.category_id}`
              : null
          }&amp;per_page=10&amp;price_change_percentage=24h,7d`
        )
        .then((result) => result.data),
    { refetchOnWindowFocus: false, refetchOnReconnect: false, retry: 1 }
  );



  return (
    <>
  
      <Select
        className="w-[50%]"
        options={categories}
        value={selectedCategory}
        name="category"
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.category_id}
        onChange={(e)=> {
            setSelectedCategory(e)
            router.push(`/coins?page=${page}&category=${e.category_id}`);
        }}
      />
      {data&&<ContentTable data={data} />}
      {isError&&<div>error</div>}
      {isLoading&&<div>loading ...</div>}
      <Pagination page={page} setPage={setPage} category={selectedCategory} SSR={true} hasNextPage={data.length==10} />
    </>
  );
}




export async function getServerSideProps({ query }) {
  let page = 1;
  let selectedCategory = null;
  if (query.page) {
    page = parseInt(query.page);
  }
  if (query.category) {
    selectedCategory = parseInt(query.page);
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Coin[]>(
    ["coins", page, selectedCategory],
    async () =>
      await axiosInstance
        .get(
          `coins/markets?vs_currency=usd&amp;page=${page}${
            selectedCategory ? `&category=${selectedCategory}` : null
          }&amp;per_page=10&amp;price_change_percentage=24h,7d`
        )
        .then((result) => result.data),
        {retry: 1 }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
