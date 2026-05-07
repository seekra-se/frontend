<script setup>
import Searchbar from '../features/search/components/Searchbar.vue'
</script>

<template>
    <div class="main-content">
        <header class="global-header">
            <h1>Seekra</h1>
            <span class="slogan">
                Built to search.
            </span>
        </header>
        
        <form id="search-form">
            <Searchbar />
        </form>
    </div>
</template>

<style scoped>
.main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 60px;
    flex-grow: 1;
}

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
    background: linear-gradient(to right, #689BDB, #5F8DDC, #5077C7, #4562BE, #374FA5, #22298F);
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