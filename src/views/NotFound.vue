<template>
    <div class="not-found">
       <span class="error-message">
            The page you are looking for does not exist. Please check the URL or return to the search page.
        </span>
        <RouterLink to="/" id="link">Back to Search</RouterLink>
    </div>
</template>

<style scoped>
.not-found {
    text-align: center;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
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