
import { useRouter } from "next/router";
import { useState } from "react";
import ContentTable from "@/components/ContentTable";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";
import { useEffect } from "react";
import { axiosInstance } from "../../axios/axios";
import { Category } from "@/types/types";
import useCustomQuery from "@/hooks/CustomQuery";

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
    axiosInstance.get("coins/categories/list").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const { isLoading, isError, data } = useCustomQuery("coins/markets", ["coins", page, selectedCategory], {
              vs_currency: "usd",
              page: page,
              category: selectedCategory.category_id,
              per_page: 10,
              price_change_percentage: "24h,7d",
            },{
                  refetchOnWindowFocus: false,
                  refetchOnReconnect: false,
                  retry: 1,
                  staleTime: 120000,
                });



  return (
    <>
      <Filter
        page={page}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        SSR={false}
      />
      {data && <ContentTable data={data} />}
      {!data && isError && (
        <div className="h-[70vh] flex justify-center items-center">error</div>
      )}
      {isLoading && (
        <div className="h-[70vh] flex justify-center items-center">
          loading ...
        </div>
      )}
      {
        <Pagination
          page={page}
          setPage={setPage}
          category={selectedCategory}
          SSR={false}
          hasNextPage={data && data.length == 10}
        />
      }
    </>
  );
}
