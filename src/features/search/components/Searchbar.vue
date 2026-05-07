<template>
    <div class="search-wrapper">
        <input type="search" name="search" placeholder="Search..." required />
        <button type="submit" class="search-button">Search</button>
    </div>
</template>

<style scoped>
.search-wrapper {
    --submit-button-padding-y: 8px;
    --submit-button-content-height: 18px;
    --padding: 4px;
    display: flex;
    align-items: center;
    border: 1.5px solid #ccc;
    box-shadow: 0 0px 32px rgba(69, 98, 190, 0.25);
    border-radius: calc(var(--submit-button-content-height) * 0.5 + var(--submit-button-padding-y) + var(--padding));
    padding: var(--padding);
    padding-left: calc(var(--submit-button-content-height) + var(--padding));
}

.search-wrapper input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 1rem;
    background: transparent;
}

.search-button {
    font-size: 1rem;
    height: calc(var(--submit-button-content-height) + 2 * var(--submit-button-padding-y));
    border-radius: calc(var(--submit-button-content-height) * 0.5 + var(--submit-button-padding-y));
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