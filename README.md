# Web3Privacy Now Data Repository

List of variables used for Privacy Explorer (https://explorer.web3privacy.info)
Feel free to submit any suggestions or changes to this scheme.

You can create/edit projects by making changes in index.yaml file, which you can find in project folder inside /src/projects/
Upload project logo in root of project directory to be automatically included.


# Database

https://data.web3privacy.info/

# Project description


| Field                  | Type                  | Required | Description |
|------------------------|-----------------------|----------|-------------|
| id                     | string                | x        | Unique project identifier            |
| name                   | string                | x        | Name of project |
| categories             | array                 | x        | Categories are defined in explorer-data/schema/category.yaml |
| logos                  | array                 |          | Links to project logo (Note: Upload logos into root folder of project) |
| ecosystem              | string                |          | What is projects native networks? (ex. Ethereum, Arbitrum, Cosmos,...) |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| project_type           | string                |          | Main usecases of project (ex. ZK Pool mixer, Privacy transactions) |
| description            | string                |          | Short description of project features and mission |
| product_launch_day     | string                |          | Date of the project launch (DD:MM:YYYY)|
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| token_link             | string url            |          | Link to the project token contract |
| tokens                 | array                 |          | Native tokens of project (ex. privUSDC, sETH,...) |
| assets_used            | array                 |          | Digital assets that you can use in project/protocol (ex. BTC, ETH, USDC,...)|
| fee                    | string                |          | Cost of usage (ex. 0.15%, $5, None) |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| team anonymous        | boolean                |          | Is project developed by anonymous team? (Yes/No) |
| team teammembers name | string                 |          | Member's name |
| team teammembers role | string                 |          | Member's role |
| team teammembers link | string url             |          | Member's social link |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| funding name           | string                |          | Name of the investor |
| funding type           | string                |          | Type of investment (Seed, Round1, Angel investment,...) |
| funding link           | string url            |          | Link for more information about the investment |
| funding value          | string                |          | Value of the investment ($1,500,000) |
| funding time           | string                |          | Date of the investment (DD:MM:YYYY)|
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| history title          | string                |          | Title of events/news related to the project |
| history event_type     | string                |          | Type of event (e.g., Product release, Hack, Launch) |
| history description    | string                |          | Description of the event |
| history time           | string                |          | Time of the event (DD:MM:YYYY) |
| history link           | string url            |          | Link to more information about the event |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| sunset                 | boolean               |          | Project is not active, is not recommended for use, no development  |




# Project Links

| Field                  | Type                  | Required | Description |
|------------------------|-----------------------|----------|-------------|
| links web              | string url            |          | Official project website |
| links github           | string url            |          | Link to the project GitHub repository |
| links block_explorer   | string url            |          | Project or Network Block Explorer |
| links docs             | string url            |          | Link to project documentation |
| links forum            | string url            |          | Link to project forum (ex. Discourse) |
| links whitepaper       | string url            |          | Link to the project whitepaper |
| links changelog        | string url            |          | Link to changelog |
| links snapshot         | string url            |          | Link to Snapshot |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| links blog             | string url            |          | Project Blog (ex. Medium) |
| links twitter          | string url            |          | Project Twitter profile |
| links discord          | string url            |          | Project Discord server |
| links facebook         | string url            |          | Project Facebook page |
| links lens             | string url            |          | Project Lens profile  |
| links farcaster        | string url            |          | Project Farcaster profile |
| links rss_feed         | string url            |          | Link to a information stream related to the project |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| links education        | string url            |          | Links to useful education content about project |




# Technology

| Field                  | Type                  | Required | Description |
|------------------------|-----------------------|----------|-------------|
| technology type        | string                |          | Technology that runs underhood (ex. ZK, ZK-Snarks, PLONK, Monero, Ellipcic curves,...) |
| technology features    | array                 |          | Key aspects of the privacy tech used (ex. Private wallet, P2P Swap, Fluid compliance, ZK Defi, Private bridge,...) |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| blockchain_features encryption | string        |          | Encryption used (ex. Cryptonight, Groth16, ECDH,...) |
| blockchain_features opensource | boolean       |          | Is project opensourced? (Yes/No) |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| project_status live_status | boolean           |          | Is the project currently working? (Yes/No) |
| project_status version | string                |          | Name of the latest version (Ex. Arbitrum Nitro, V2.12, Prototest10,...) |
| project_status testnet | boolean               |          | Does the project have a running testnet? (Yes/No)|
| project_status mainnet | boolean               |          | Is the mainnet running? (Yes/No) |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| client_diversability name | string             |          | Name of the clients using project (ex. Wallet name, Bridge name, Project name,...) |
| client_diversability link | string url         |          | Link to the client's website |




# Privacy

| Field                  | Type                  | Required | Description |
|------------------------|-----------------------|----------|-------------|
| licenses               | string                |          | Licenses used (ex. MIT License, GGML,...) |
| privacy_policy defined | boolean               |          | Is there a document defining privacy policies? (Yes/No)|
| privacy_policy link   | string url             |          | Link to the privacy policy document |
| privacy_policy data_usage | string             |          | How is the project using your data? (ex. Selling data, Analytics., Not using,...) |
| traceability tracked_data | string             |          | What data is the project tracking (ex. Address, Name, Phone, IP,...) |
| default_privacy        | boolean               |          | Is privacy applied by default or must it be turned on? (Yes/No) |
| compliance             | string                |          | Does the project comply with any official blacklists? (ex. OFAC, Hacker_wallet_list, USA,...) |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| storage decentralized | boolean                |          | Is any part of used data stored on decetralized networks? (Yes/No)|
| traceability kyc      | boolean                |          | Is KYC required for product usage? (Yes/No) |
| traceability sign_in_type_requirments | string |          | What Sign-in information is required to use the project? (ex. Wallet, Email, Gitcoin Pass,...) |
| blockchain_features identity_integration | string|        | What Identity integration project use? (ex. Gitcoin Pass, Proof of Humanity, Degenscore,...)  |
| blockchain_features p2p | boolean              |          | Is the project Peer to Peer-based or enabling such a feature? (Yes/No) |
| blockchain_features data_masking | string      |          | What type of anonymity mechanism is used? (Mixer, ZK Pool,...)  |
| blockchain_features viewing_key | boolean      |          | Is there a viewing key that can decode your transactions? (Yes/No) |
| blockchain_features dissapearing_tx | boolean  |          | Is there any trace of your transaction on-chain / online? (Yes/No) |
| blockchain_features connected_tx | boolean     |          | Is is possible to identify other transactions when is your address revealed? (Yes/No) |
| blockchain_features frontend_anonymity | string|          | Are you able to use project with TOR / VPN or other anonymity tools? (TOR address, Geo restricted, VPN banned,...) |




# Security

| Field                  | Type                  | Required | Description |
|------------------------|-----------------------|----------|-------------|
| third_party_dependency | string                |          | What third-party technological dependencies project have? (ex. Uniswap hack, USDC stability,...) |
| social_trust           | string                |          | Is there any social dependency (ex. Governance, Board multisig, CEO have 50% tokens,...) |
| technical_spof         | string                |          | Is there any technical single point of failure? (ex. Pool hack, Bridge malfunction, Viewing key leak,...) |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| blockchain_features asset_custody_type | string   |       | Are users assets in any custody, by who? Or is it fully non-custodial? (ex. DAO Multisig, Non-custodial, Centralized bridge,...)  |
| blockchain_features upgradability enabled | boolean |     | Is the project upgradable or immutable? (Yes/No)|
| blockchain_features upgradability type | string |         | Upgradability type (ex. DAO Governance, Admin keys, Random Consensus,...) |
| blockchain_features upgradability admin_keys | string |   | Upgradability condition definition (ex. Multisign of 5, 80% consensus,...) |
|                        |                       |          |              |
|                        |                       |          |              |
|                        |                       |          |              |
| audits name            | string                |          | Name of the project audit (ex. Certik SmartContract check,...) |
| audits company         | string                |          | Company that processed the project audit (ex. Certik, Blocksec,...) |
| audits logo            | string url            |          | Logo of the audit company |
| audits link            | string url            |          | Official link to the audit company website |
| audits time            | string                |          | Date of the audit (DD:MM:YYYY) |



# License

Open Data Commons Open Database License (ODbL)
