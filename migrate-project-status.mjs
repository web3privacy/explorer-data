#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';
import { parse, stringify } from 'yaml';
import { join } from 'path';

const projects = [
  'fileverse', 'mysterium-network', 'elusiv', 'zkvote', 'starkex', 'hopr',
  'deeper-network', 'firo', 'oasis-network', 'zcash', 'privatepool',
  'tornado-cash', 'iden3', 'circom', 'zksync', 'darkfi', 'sentinel',
  'snarkjs', 'findora', 'cake-wallet', 'typhoon-network', 'iron-fish',
  'concordium', 'zk-money', 'suterusu', 'oxen', 'orchid', 'rotki',
  'mobilecoin', 'sienna-network', 'monero', 'zano', 'zeal', 'xx-network',
  'mask-network', 'fluidkey', 'webb-protocol', 'wasabi-wallet', 'semaphore',
  'incognito', 'umbra-wallet'  // added umbra-wallet
];

const validUsecases = [
  'wallets', 'defi', 'currency', 'infrastructure', 'computing', 'eth-layer-2',
  'hardware', 'vpn', 'did', 'dao', 'bridge', 'messaging', 'browser',
  'kyc-solution', 'rpc-provider', 'storage', 'dapps', 'operating-systems',
  'nft-community', 'alliances', 'mixing-management', 'data-management',
  'donate-charity', 'research-and-development', 'mixing-service', 'node',
  'events', 'ai', 'tee', 'mpc', 'fhe', 'sunset', 'other'
];

const validCategories = [
  'infrastructure', 'social-and-communications', 'hardware', 
  'applications', 'defi', 'archived-projects'
];

const validEcosystems = [
  'ethereum', 'bitcoin', 'solana', 'cosmos', 'monero', 'other', 'multichain'
];

const validAssets = [
  'eth', 'btc', 'usdc', 'usdt', 'dai', 'atom', 'scrt', 'dot',
  'sol', 'zcash', 'xmr', 'aleph', 'nam', 'other'
];

async function migrateProject(projectName) {
  const filePath = join('src/projects', projectName, 'index.yaml');
  try {
    const content = await readFile(filePath, 'utf8');
    const data = parse(content);
    
    // Fix project_status
    if (!data.project_status || data.project_status.live_status === undefined) {
      const version = data.project_status?.version || '';
      let mainnet = false, testnet = false, live_status = false;
      
      if (version.toLowerCase().includes('mainnet')) {
        mainnet = true;
        live_status = true;
      } else if (version.toLowerCase().includes('testnet')) {
        testnet = true;
        live_status = true;
      }
      
      data.project_status = {
        live_status,
        version: data.project_status?.version || '',
        testnet,
        mainnet,
        ...data.project_status
      };
    }
    
    // Fix categories
    if (data.categories && Array.isArray(data.categories)) {
      data.categories = data.categories
        .map(c => c.toLowerCase())
        .map(c => {
          if (c === 'wallets') return 'applications';  // wallets -> applications
          return validCategories.includes(c) ? c : 'applications';
        });
    }
    
    // Fix ecosystem
    if (data.ecosystem && Array.isArray(data.ecosystem)) {
      data.ecosystem = data.ecosystem
        .map(e => e.toLowerCase())
        .map(e => validEcosystems.includes(e) ? e : 'other');
    }
    
    // Fix assets_used
    if (data.assets_used && Array.isArray(data.assets_used)) {
      data.assets_used = data.assets_used
        .map(a => a.toLowerCase())
        .map(a => validAssets.includes(a) ? a : 'other');
    }
    
    // Fix usecases
    if (data.usecases && Array.isArray(data.usecases)) {
      data.usecases = data.usecases
        .map(u => u.toLowerCase().replace(/\s+/g, '-'))  // "mixing service" -> "mixing-service"
        .map(u => validUsecases.includes(u) ? u : 'other')
        .filter((v, i, arr) => arr.indexOf(v) === i); // dedupe
    }
    
    // Remove invalid top-level properties
    delete data.privacy;
    delete data.security;
    
    await writeFile(filePath, stringify(data, { lineWidth: 0, indent: 2 }), 'utf8');
    console.log(`✓ ${projectName}`);
    return { status: 'success' };
  } catch (error) {
    console.error(`✗ ${projectName}: ${error.message}`);
    return { status: 'error' };
  }
}

const results = await Promise.all(projects.map(migrateProject));
console.log(`\nDone: ${results.filter(r => r.status === 'success').length}/${projects.length}`);
