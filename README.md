# Web3Privacy Now Data Repository

Structured database for Web3Privacy Now.

# License

Open Data Commons Open Database License (ODbL)


# Schema specification

| Field                  | Type                  | Required | Description |
|------------------------|-----------------------|----------|-------------|
| type                   | object                | -        |             |
| id                     | string                | x        |             |
| name                   | string                | x        | Name of the project |
| categories             | array                 | x        | Categories defined by web3privacy research |
| ecosystem              | string                |          | Build on network (e.g., Cosmos, Ethereum) |
| product_readiness      | string                |          | State of development (e.g., Alpha, Beta, Mainnet, Testnet) |
| security               | string                |          | Security details |
| have_token             | boolean               |          | Does the project have a token? |
| token_link             | string uri            |          | Link to the token contract |
| tokens                 | array                 |          | Native tokens of the project (e.g., TORN, SCRT) |
| description            | string                |          | Short description of project features and mission |
| project_type           | string                |          | Main purpose of the project (e.g., ZK Pool mixer, Privacy transactions) |
| product_launch_day     | string                |          | Date of the project announcement |
| technology type        | string                |          | Category of privacy tech (e.g., ZK, PHE) |
| technology name        | string                |          | Name of privacy tech (e.g., Ultramix3000, ZK-EVM) |
| technology features    | array                 |          | Key aspects of the privacy tech used (e.g., Non-traceable, Account Abstraction) |
| links web              | string uri            |          | Official project website |
| links twitter          | string uri            |          | Project's Twitter profile |
| links discord          | string uri            |          | Project's Discord server |
| links blog             | string uri            |          | Project's Blog (e.g., Medium) |
| links facebook         | string uri            |          | Project's Facebook page |
| links bloc_explorer    | string uri            |          | Project's or Network's Block Explorer |
| links whitepaper       | string uri            |          | Link to the project's whitepaper |
| links github           | string uri            |          | Link to the project's GitHub repository |
| links docs             | string uri            |          | Link to project documentation |
| links changelog        | string uri            |          | Link to changelog |
| links forum            | string uri            |          | Link to project forum (e.g., Discourse) |
| links snapshot         | string                |          | Link to Snapshot |
| links lens             | string                |          | Link to project's Lens |
| links farcaster        | string                |          | Link to Farcaster |
| links rss_feed         | string uri            |          | Link to a stream of articles related to the project |
| blockchain_features p2p | boolean             |          | Is the project Peer to Peer-based or enabling such a feature? |
| blockchain_features encryption | string         |          | Encryption algorithm (e.g., 256-bit, SHA) |
| blockchain_features network | string           |          | Networks securing assets |
| blockchain_features upgradability enabled | boolean | | Is the project upgradable or immutable? |
| blockchain_features upgradability type | string | | Upgradability type (e.g., Governance, Admin keys) |
| blockchain_features upgradability admin_keys | string |  | Upgradability condition definition (e.g., Multisign of 5, 80% consensus) |
| licenses               | string                |          | Licenses used (e.g., MIT License, GGML) |
| privacy_policy defined | boolean               |          | Is there a document defining privacy policies? |
| privacy_policy link   | string uri            |          | Link to the privacy policy |
| privacy_policy data_usage | string            |          | How is the project using your data? (e.g., Selling data, Analytics) |
| team anonymous        | boolean               |          | Is the project developed by an anonymous team? |
| team teammembers name | string                |          | Member's name |
| team teammembers role | string                |          | Member's role |
| team teammembers link | string uri            |          | Member's social link |
| team company name     | string                |          | Name of the development company |
| team company link     | string uri            |          | Official link to the development company |
| team company contacts | string                |          | Official mail/phone of the development company |
| storage decentralized | boolean               |          | Is any part of used data stored decentraly? |
| traceability tracked_data | string             |          | What data is the project tracking (e.g., Address, Name, Phone, IP) |
| traceability kyc      | boolean               |          | Is KYC required for product usage? |
| traceability sign_in_type_requirments | string | | What Sign-in information is required to use the project (e.g., Wallet, Email, Gitcoin Pass) |
| third_party_dependency | string              |          | What third-party technological dependencies does the project have? (e.g., Uniswap hack, USDC stability) |
| compliance             | string               |          | Does the project comply with any official blacklists? (e.g., OFAC, Hacker_wallet_list) |
| audits name            | string                |          | Name of the project audit |
| audits company         | string                |          | Company that processed the project audit |
| audits logo            | string                |          | Logo of the audit company |
| audits link            | string uri            |          | Official link to the audit company website |
| audits time            | string                |          | Date of the audit |
| social_trust           | string                |          | Is there any social dependency that the project has (e.g., Governance, CEO, Community) |
| technical_spof         | string                |          | Is there any technical single point of failure? (e.g., Pool hack, Bridge malfunction) |
| history title          | string                |          | Title of events/news related to the project |
| history event_type     | string                |          | Type of event (e.g., Product release, Hack announcement) |
| history description    | string                |          | Description of the event |
| history time           | string                |          | Time of the event |
| history link           | string uri            |          | Link to more information about the event |
| client_diversability name | string            |          | Name of the client (e.g., Wallet name, Bridge name) implementing the project |
| client_diversability link | string uri        |          | Link to the client's website |
| default_privacy        | boolean               |          | Is privacy applied by default or must it be turned on? |
| funding name           | string                |          | Name of the investor |
| funding type           | string                |          | Type of investment |
| funding link           | string uri            |          | Link for more information about the investment |
| funding value          | string                |          | Value of the investment |
| funding time           | string                |          | Date of the investment |
| project_status live_status | boolean           |          | Is the project currently functioning? |
| project_status version | string                |          | Name of the latest version |
| project_status testnet | boolean               |          | Does the project have a running testnet? |
| project_status mainnet | boolean               |          | Is the mainnet running? |

