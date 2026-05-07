<!--
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
-->

<template>
    <div class="search-wrapper">
        <input type="search" name="search" placeholder="Search..." required />
        <button type="submit" class="search-button">Search</button>
    </div>
</template>

<style scoped>
.search-wrapper {
    --submit-button-padding-y: 8px;
    --content-height: 32px;
    --padding: 4px;
    display: flex;
    align-items: center;
    border: 1.5px solid #ccc;
    box-shadow: 0 0px 32px rgba(69, 98, 190, 0.25);
    border-radius: calc(var(--content-height) * 0.5 + var(--submit-button-padding-y) + var(--padding));
    padding: var(--padding);
    padding-left: calc(var(--content-height) + var(--padding));
    width: 100%;
}

.search-wrapper input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 1rem;
    background: transparent;
    height: calc(var(--content-height) + 2 * var(--submit-button-padding-y));
}

.search-button {
    font-size: 1rem;
    height: calc(var(--content-height) + 2 * var(--submit-button-padding-y));
    border-radius: calc(var(--content-height) * 0.5 + var(--submit-button-padding-y));
    border: none;
    padding: var(--submit-button-padding-y) 20px;
    background: #4562BE;
    color: white;
    cursor: pointer;
    white-space: nowrap;
}

.search-button:hover {
    background: #374FA5;
}
</style>