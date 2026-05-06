<template>
    <nav class="global-nav">
        <span id="logo">Seekra</span>
        <ul class="right-links">
        </ul>
    </nav>
</template>

<style scoped>
.global-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 40px;
}

.global-nav .right-links {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.global-nav .right-links a {
    text-decoration: none;
    color: #000;
}

.global-nav .right-links a:hover{
    text-decoration: underline;
}
</style>