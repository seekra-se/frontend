<template>
    <nav class="sidebar">
        <slot />
    </nav>
</template>

<style scoped>
.sidebar {
    border-right: 1px solid var(--border);
    padding: 20px;
}
</style>