#!/usr/bin/env node
/**
 * Migration script to add missing project_status fields and fix capitalization
 * Fixes schema validation errors for legacy projects
 */

import { readFile, writeFile } from 'fs/promises';
import { parse, stringify } from 'yaml';
import { join } from 'path';

// List of 40 failing projects from test output
const failingProjects = [
  'fileverse', 'mysterium-network', 'elusiv', 'zkvote', 'starkex', 'hopr',
  'deeper-network', 'firo', 'oasis-network', 'zcash', 'privatepool',
  'tornado-cash', 'iden3', 'circom', 'zksync', 'darkfi', 'sentinel',
  'snarkjs', 'findora', 'cake-wallet', 'typhoon-network', 'iron-fish',
  'concordium', 'zk-money', 'suterusu', 'oxen', 'orchid', 'rotki',
  'mobilecoin', 'sienna-network', 'monero', 'zano', 'zeal', 'xx-network',
  'mask-network', 'fluidkey', 'webb-protocol', 'wasabi-wallet', 'semaphore',
  'incognito'
];

async function migrateProject(projectName) {
  const filePath = join('src/projects', projectName, 'index.yaml');

  try {
    // Read the YAML file
    const content = await readFile(filePath, 'utf8');
    const data = parse(content);

    // Skip if already migrated
    if (data.project_status?.live_status !== undefined) {
      console.log(`✓ ${projectName}: Already migrated`);
      return { status: 'skipped', project: projectName };
    }

    // Determine values based on current version field
    const version = data.project_status?.version || '';
    let mainnet = false;
    let testnet = false;
    let live_status = false;

    if (version.toLowerCase().includes('mainnet')) {
      mainnet = true;
      live_status = true;
    } else if (version.toLowerCase().includes('testnet')) {
      testnet = true;
      live_status = true;
    }

    // Update project_status with new required fields
    data.project_status = {
      live_status,
      version: data.project_status?.version || '',
      testnet,
      mainnet,
      ...data.project_status
    };

    // Fix ecosystem capitalization (must be lowercase)
    if (data.ecosystem && Array.isArray(data.ecosystem)) {
      data.ecosystem = data.ecosystem.map(eco => {
        const lower = eco.toLowerCase();
        // Map known ecosystem names
        const ecosystemMap = {
          'ethereum': 'ethereum',
          'bitcoin': 'bitcoin',
          'solana': 'solana',
          'cosmos': 'cosmos',
          'monero': 'monero',
          'litecoin': 'litecoin',
          'haven': 'haven',
          'multichain': 'multichain'
        };
        return ecosystemMap[lower] || 'other';
      });
    }

    // Fix usecases capitalization (must be lowercase)
    if (data.usecases && Array.isArray(data.usecases)) {
      data.usecases = data.usecases.map(usecase => {
        const lower = usecase.toLowerCase();
        // Map known usecase values - just lowercase them all
        return lower;
      });
    }

    // Write back to file, preserving YAML formatting
    const newContent = stringify(data, {
      lineWidth: 0,  // Don't wrap lines
      indent: 2
    });

    await writeFile(filePath, newContent, 'utf8');
    console.log(`✓ ${projectName}: Migrated (mainnet: ${mainnet}, testnet: ${testnet}, live: ${live_status})`);

    return { status: 'success', project: projectName, mainnet, testnet, live_status };
  } catch (error) {
    console.error(`✗ ${projectName}: Error - ${error.message}`);
    return { status: 'error', project: projectName, error: error.message };
  }
}

async function main() {
  console.log('Starting migration of 40 projects...\n');

  const results = await Promise.all(
    failingProjects.map(project => migrateProject(project))
  );

  // Summary
  const success = results.filter(r => r.status === 'success').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const errors = results.filter(r => r.status === 'error').length;

  console.log('\n' + '='.repeat(50));
  console.log('Migration Summary:');
  console.log(`  ✓ Success: ${success}`);
  console.log(`  - Skipped: ${skipped}`);
  console.log(`  ✗ Errors:  ${errors}`);
  console.log('='.repeat(50));

  if (errors > 0) {
    console.log('\nErrors occurred in:');
    results.filter(r => r.status === 'error').forEach(r => {
      console.log(`  - ${r.project}: ${r.error}`);
    });
    process.exit(1);
  }

  console.log('\nMigration completed successfully!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
