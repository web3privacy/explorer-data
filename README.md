# Web3Privacy Now Data Repository

Structured database for Web3Privacy Now.

# License

Open Data Commons Open Database License (ODbL)


# Schema specification

| Field                  | Type                  | Required | Description |
|------------------------|-----------------------|----------|-------------|
| type                   | object                | -        |             |
| id                     | string                | x        |             |
| name                   | string                | x        | name of the project |
| categories             | array                 | x        | defined by web3privacy research |
| ecosystem              | string                |          | Build on network (ex. Cosmos, Ethereum) |
| product_readiness      | string                |          | State of development (ex. Alpha, Beta, Mainnet, Testnet            |
| security               | string                |          |             |
| have_token             | boolean               |          | Does project have token?             |
| token_link             | string uri            |          | Link to token contract            |
| tokens                 | array                 |          | Projects native tokens (ex. TORN, SCRT)            |
| description            | string                |          | Short description of project features and mission            |
| project_type           | string                |          | Definition of project main purpose (ex. ZK Pool mixer, Privacy transactions) |
| product_launch_day     | string                |          | Date of project announcement            |
| technology type        | string                |          | Category of privacy tech (ex. ZK, PHE) |
| technology name        | string                |          | Name of privacy tech (ex. Ultramix3000, ZK-EVM) |
| technology features    | array                 |          | Main aspects of private tech used (ex. Non-traceable, Account Abstraction) |
| links web              | string uri            |          | Official projects website|
| links twitter          | string uri            |          | Projects Twitter |
| links discord          | string uri            |          | Projects Discord |
| links blog             | string uri            |          | Projects Blog (ex. Medium) |
| links facebook         | string uri            |          | Projects Facebook |
| links bloc_explorer    | string uri            |          | Projects or Network Blockexplorer |
| links whitepaper       | string uri            |          | Link to whitepaper |
| links github           | string uri            |          | Link to Github |
| links docs             | string uri            |          | Link to documentation |
| links changelog        | string uri            |          | Link to changelog |
| links forum            | string uri            |          | Link to forum (ex. Discourse) |
| links snapshot         | string                |          | Link to Snapshot
| links lens             | string                |          | Projects Lens link            |
| links farcaster        | string                |          | Projects Farcaster            |
| links rss_feed         | string uri            |          | Link to stream of articles related to project |
| blockchain_features p2p | boolean             |          | Is project Peer to Peer based or is enabling such feature?            |
| blockchain_features encryption | string         |          | Encryption algo (ex. 256bit, SHA) |
| blockchain_features network | string           |          | Networks securing assets            |
| blockchain_features upgradability enabled | boolean | | Is project upgradable or immutable?           |
| blockchain_features upgradability type | string | | Upgradability type (ex. Governance, Admin keys)            |
| blockchain_features upgradability admin_keys | string |  | Upgradability condition definition (ex. Multisign of 5, 80% consensus) |
| licenses               | string                |          | (ex. MIT Licence, GGML) |
| privacy_policy defined | boolean               |          | Is there document defining privacy policies?            |
| privacy_policy link   | string uri            |          | Link to privacy policy            |
| privacy_policy data_usage | string            |          | How is project using your data? (ex. Selling data, Analytics) |
| team anonymous        | boolean               |          | Is project developed by anon team?            |
| team teammembers name | string                |          | Member name            |
| team teammembers role | string                |          | Member role            |
| team teammembers link | string uri            |          | Member social link             |
| team company name     | string                |          | Name of dev company             |
| team company link     | string uri            |          | Official link dev company            |
| team company contacts | string                |          | Official mail/phone of dev company            |
| storage decentralized | boolean               |          | Is any part of used data stored decentraly?            |
| traceability tracked_data | string             |          | What data is project tracking (ex. Address, Name, Phone, IP) |
| traceability kyc      | boolean               |          | Is there KYC required for product usage?            |
| traceability sign_in_type_requirments | string | | What Sign-in informations are required to use project (ex. Wallet, Email, Gitcoin Pass) |
| third_party_dependency | string              |          | What third-party technological dependencies project have? (ex. Uniswap hack, USDC stability) |
| compliance             | string               |          | Does project comply with any official blacklists? (ex. OFAC, Hacker_wallet_list) |
| audits name            | string                |          | Name of project audit            |
| audits company         | string                |          | Company that processed project audit            |
| audits logo            | string                |          | Logo of audit company            |
| audits link            | string uri            |          | Official link to audit company website           |
| audits time            | string                |          | Date of audit            |
| social_trust           | string                |          | Is there any social dependency that project have (ex. Governance, CEO, Community)            |
| technical_spof         | string                |          | Is there any technical single point of failture? (ex. Pool hack, Bridge malfuction)            |
| history title          | string                |          | Title of event/news related to project            |
| history event_type     | string                |          | Type of event (ex. Product release, Hack announcement)            |
| history description    | string                |          | Description of event            |
| history time           | string                |          | Time of event            |
| history link           | string uri            |          | Link to more informations about event            |
| client_diversability name | string            |          | Name of client (ex. Wallet name, Bridge name) implementing project            |
| client_diversability link | string uri        |          | Link to clients website            |
| default_privacy        | boolean               |          | Do I need to turn privacy on, or is applied by default?            |
| funding name           | string                |          | Name of Investor            |
| funding type           | string                |          | Type of investment            |
| funding link           | string uri            |          | Link for more information about investment            |
| funding value          | string                |          | Value of investment            |
| funding time           | string                |          | Date of investment            |
| project_status live_status | boolean           |          | Is it functioning right now?            |
| project_status version | string                |          | Name of latest version            |
| project_status testnet | boolean               |          | Does project have running testnet?            |
| project_status mainnet | boolean               |          | Is mainnet running?            |

