<template>
    <header class="global-header">
        <h1>Seekra</h1>
        <span class="slogan">
            ERROR: 404 Not Found
        </span>
    </header>
</template>
<style scoped>
.global-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
}

.global-header h1 {
    display: inline-block;
    margin: 0;
    line-height: 1;
    background: linear-gradient(
        to right,
        var(--primary-color-l-4),
        var(--primary-color),
        var(--primary-color-d-4)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 6rem;
}

.slogan{
    margin: 0;
    font-size: small;
}

</style>