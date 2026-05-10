<script setup>
const startYear = 2026
const currentYear = new Date().getFullYear()

const copyrightPeriod =
    startYear === currentYear
        ? `${currentYear}`
        : `${startYear}-${currentYear}`


</script>

<template>
    <footer class="global-footer">
        <div class="copyright-note">
            &copy; {{ copyrightPeriod }} Seekra
        </div>
    </footer>
</template>

<style scoped>
.global-footer {
    --padding-y: 22px;
    display: flex;
    justify-content: center;
    padding: var(--padding-y);
    background-color: var(--light-d-1);
    margin-top: var(--padding-y);
}
</style>