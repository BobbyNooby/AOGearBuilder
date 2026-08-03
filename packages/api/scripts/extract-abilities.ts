import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { resolve } from 'path';

const OLD_COMMIT = '47bf9293e19497ae83a282b493134eaf0881b8f2';
const OLD_REPO = '/Users/bobong/Repositories/AOGearBuilder';

function gitShow(path: string): string {
  return execSync(`git show ${OLD_COMMIT}:${path}`, { cwd: OLD_REPO, encoding: 'utf-8' });
}

function extractViaTsx(magicsTs: string, fsTs: string) {
  const tmpDir = '/tmp/aotools-extract';
  try { rmSync(tmpDir, { recursive: true }); } catch {}
  mkdirSync(tmpDir, { recursive: true });

  // Fix imports in the old files
  const IMG_BASE = 'https://raw.githubusercontent.com/BobbyNooby/AOGearBuilderImages/main';
  
  // Replace $lib imports with local paths
  magicsTs = magicsTs.replace(/from\s+['"]\$lib\/dataConstants['"]/g, `from './dataConstants'`);
  magicsTs = magicsTs.replace(/from\s+['"]\$lib\/gearBuilder\/playerTypes['"]/g, `from './playerTypes'`);
  magicsTs = magicsTs.replace(/from\s+['"]\.\/playerAbilitiyTypes['"]/g, `from './playerAbilitiyTypes'`);
  
  fsTs = fsTs.replace(/from\s+['"]\$lib\/dataConstants['"]/g, `from './dataConstants'`);
  fsTs = fsTs.replace(/from\s+['"]\$lib\/gearBuilder\/playerTypes['"]/g, `from './playerTypes'`);
  fsTs = fsTs.replace(/from\s+['"]\.\/playerAbilitiyTypes['"]/g, `from './playerAbilitiyTypes'`);

  // Write stubs
  writeFileSync(resolve(tmpDir, 'dataConstants.ts'), `export const staticImagesRootFolder = '${IMG_BASE}';\n`);
  writeFileSync(resolve(tmpDir, 'playerTypes.ts'), `export type magic = string;\nexport type fightingStyle = string;\nexport type fightingStyles = string;\n`);
  writeFileSync(resolve(tmpDir, 'playerAbilitiyTypes.ts'), `export type magicDetails = any;\nexport type fightingStyleDetails = any;\n`);

  // Write the old files
  writeFileSync(resolve(tmpDir, 'playerMagics.ts'), magicsTs);
  writeFileSync(resolve(tmpDir, 'playerFightingStyles.ts'), fsTs);

  // Write dumper
  writeFileSync(resolve(tmpDir, 'dump.ts'), `
import { magicRecords } from './playerMagics';
import { fightingStyleRecords } from './playerFightingStyles';

function cleanMagic(id: string, data: any) {
  return {
    _id: id.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-magic',
    id: id.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-magic',
    name: data.name || id + ' Magic',
    type: 'magic',
    imageUrl: data.imageId,
    color: data.color,
    textColors: data.textColors,
    legend: data.legend,
    stats: data.stats,
    statusEffect: data.statusEffect || null,
    extraStats: data.extraStats || {},
    clashes: data.clashes || null
  };
}

function cleanFS(id: string, data: any) {
  return {
    _id: id.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    id: id.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    name: data.name || id,
    type: 'fighting-style',
    imageUrl: data.imageId,
    color: data.color,
    textColors: data.textColors,
    legend: data.legend,
    stats: data.stats,
    passives: data.passive || [],
    extraStats: data.extraStats || {}
  };
}

const magics = Object.entries(magicRecords).map(([k,v]) => cleanMagic(k, v));
const fs = Object.entries(fightingStyleRecords).map(([k,v]) => cleanFS(k, v));

console.log(JSON.stringify({ magics, fightingStyles: fs }, null, 2));
`);

  const out = execSync('npx tsx dump.ts', { cwd: tmpDir, encoding: 'utf-8' });
  return JSON.parse(out);
}

// Main
const magicsTs = gitShow('src/lib/data/playerMagics.ts');
const fsTs = gitShow('src/lib/data/playerFightingStyles.ts');

const result = extractViaTsx(magicsTs, fsTs);

const base = resolve(import.meta.dirname, '../../AOPlanningRework');
writeFileSync(resolve(base, 'data/magics-rich.json'), JSON.stringify(result.magics, null, 2));
writeFileSync(resolve(base, 'data/fighting-styles.json'), JSON.stringify(result.fightingStyles, null, 2));

console.log(`✅ magics-rich.json: ${result.magics.length} entries`);
console.log(`✅ fighting-styles.json: ${result.fightingStyles.length} entries`);
