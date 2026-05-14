<template>
        <header class="global-header">
            <h1>Seekra</h1>
            <span class="error-message">
                The page you are looking for does not exist. Please check the URL or return to the search page.
            </span>
        </header>
        <RouterLink to="/" id="link">Back to Search</RouterLink>
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

.error-message{
    margin: 0;
    font-weight: 600;
    font-size: 2vw;
}
#link {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 10px 20px;
    text-decoration: none;
}
</style>