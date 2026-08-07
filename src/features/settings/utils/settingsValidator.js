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

const VALID_TYPES = ['bool', 'number', 'string', 'selection', 'section'];

export const assertString = function assertString (value, path) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`[settings] "${path}" must be a non-empty string`);
    }
};

export const assertType = function assertType (value, path) {
    if (!VALID_TYPES.includes(value)) {
        throw new Error(
            `[settings] "${path}" has invalid type "${value}". Must be one of: ${VALID_TYPES.join(', ')}`
        );
    }
};

export const validateSelectionOptions = function validateSelectionOptions (options, path) {
    if (!Array.isArray(options) || options.length === 0) {
        throw new Error(`[settings] "${path}.options" must be a non-empty array`);
    };
    options.forEach((opt, i) => {
        assertString(opt.name, `${path}.options[${i}].name`);
        assertString(opt.i18n, `${path}.options[${i}].i18n`);
    });
};

export const validateEntry = function validateEntry (entry, path) {
    assertType(entry.type, `${path}.type`);
    
    assertString(entry.name, `${path}.name`);
    assertString(entry.i18n, `${path}.i18n`);

    if (entry.type === 'section') {
        if (!Array.isArray(entry.content)) {
            throw new Error(`[settings] "${path}.content" must be an array`);
        }
        entry.content.forEach((child, i) =>
            validateEntry(child, `${path}.content[${i}]`)
        );
        return;
    }
    
    if (entry.type === 'selection') {
        validateSelectionOptions(entry.options, path);
        if (typeof entry.allowMultiple !== 'boolean' && entry.allowMultiple) {
            throw new Error(`[settings] "${path}.allowMultiple" must be a boolean`);
        }
    };
    if (entry.default !== undefined) {
        if (entry.type === 'bool' && typeof entry.default !== 'boolean') {
            throw new Error(`[settings] "${path}.default" must be a boolean`);
        }
        if (entry.type === 'number' && typeof entry.default !== 'number') {
            throw new Error(`[settings] "${path}.default" must be a number`);
        }
        if (entry.type === 'string' && typeof entry.default !== 'string') {
            throw new Error(`[settings] "${path}.default" must be a string`);
        }
        if (entry.type === 'selection') {
            if (entry.allowMultiple) {
                if (!Array.isArray(entry.default)) {
                    throw new Error(`[settings] "${path}.default" must be an array`);
                }
                const allOptions = entry.options.map((option) => option.name);
                entry.default.forEach((defaultValue, index) => {
                    if (typeof defaultValue !== 'string') {
                        throw new Error(`[settings] "${path}.default[${index}]" must be a string`);
                    }
                    if (!allOptions.includes(defaultValue)) {
                        throw new Error(`[settings] option "${path}.default[${index}]" does not exist`);
                    }
                });
            } else {
                if (typeof entry.default !== 'string') {
                    throw new Error(`[settings] "${path}.default" must be a string`);
                };
                if (!entry.options.map((option) => option.name).includes(entry.default)) {
                    throw new Error(`[settings] option "${path}.default" does not exist`);
                };
            }
        };
    }
};

export const validateFirstLevelSection = function validateFirstLevelSection (section, path) {
    assertString(section.name);
    assertString(section.i18n);

    if (!Array.isArray(section.content)) {
        throw new Error(`[settings] "${path}.content" must be an array`);
    };

    section.content.forEach((entry, i) =>
        validateEntry(entry, `${path}.content[${i}]`)
    );
};

/**
 * Validates a raw settings config object.
 * @param {unknown} raw
 * @returns {{ valid: true, config: import('../types/settingsConfig').SettingsConfig } | { valid: false, error: string }}
 */
export function validateSettingsConfig(raw) {
    if (!raw || typeof raw !== 'object') {
        throw new Error('[settings] Config must be an object');
    }
    if (!Array.isArray(raw.contents)) {
        throw new Error('[settings] "contents" must be an array');
    }
    raw.contents.forEach((entry, i) =>
        validateFirstLevelSection(entry, `contents[${i}]`)
    );
};
