#!/usr/bin/env node

/*
Copyright 2026 Seekra

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import fs from 'node:fs/promises';
import { generateLicenseFile } from 'generate-license-file';

const packageJson = './package.json';
const packageJsonBackup = `${packageJson}~`;

await generateLicenseFile(
    packageJson,
    'THIRD_PARTY_LICENSES'
);

const pkg = JSON.parse(
    await fs.readFile(packageJson, 'utf-8')
);

await fs.rename(packageJson, packageJsonBackup);

const devPackage = {
    ...pkg,
    dependencies: pkg.devDependencies ?? {},
    devDependencies: {}
};

/*
  The file including the dependencies for the current license file has
  to be always package.json due to a bug of generate-license file. See

    https://github.com/TobyAndToby/generate-license-file/issues/752
*/
await fs.writeFile(
    packageJson,
    JSON.stringify(devPackage)
);

await generateLicenseFile(
    packageJson,
    './THIRD_PARTY_LICENSES_DEV'
);

await fs.rename(packageJsonBackup, packageJson);
