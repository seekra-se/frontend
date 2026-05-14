<template>
        <span class="error-message">
            The page you are looking for does not exist. Please check the URL or return to the search page.
        </span>
        <RouterLink to="/" id="link">Back to Search</RouterLink>
</template>

<style scoped>
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