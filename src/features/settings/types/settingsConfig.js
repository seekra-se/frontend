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

/**
 * @typedef {'bool' | 'number' | 'string' | 'selection' | 'section'} SettingType
 */

/**
 * @typedef {Object} SelectionOption
 * @property {string} name
 * @property {string} i18n
 */

/**
 * @typedef {Object} BaseSettingConfig
 * @property {SettingType} type
 * @property {string} name
 * @property {string} i18n
 * @property {string} [description]
 */

/**
 * @typedef {BaseSettingConfig & { default: boolean }} BoolSettingConfig
 */

/**
 * @typedef {BaseSettingConfig & { default: number }} NumberSettingConfig
 */

/**
 * @typedef {BaseSettingConfig & { default: string }} StringSettingConfig
 */

/**
 * @typedef {BaseSettingConfig & {
 *   default: string | string[],
 *   allowMultiple: boolean,
 *   options: SelectionOption[]
 * }} SelectionSettingConfig
 */

/**
 * @typedef {Object} SectionSettingConfig
 * @property {'section'} type
 * @property {string} name
 * @property {string} [i18n]
 * @property {string} [description]
 * @property {SettingConfigEntry[]} content
 */

/**
 * @typedef {BoolSettingConfig | NumberSettingConfig | StringSettingConfig | SelectionSettingConfig | SectionSettingConfig} SettingConfigEntry
 */

/**
 * @typedef {Object} SettingsConfig
 * @property {SettingConfigEntry[]} contents
 */