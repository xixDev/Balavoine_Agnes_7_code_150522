<template>
    <nav class="main-nav">
        <router-link :to="{ name: 'Home' }">Tous les messages</router-link>
        <router-link :to="{ name: 'AddBlob' }">Ajouter un message</router-link>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
};
</script>

<style>
.main-nav {
    text-align: center;
    /* background: #ffd7d7; */
    padding: 0;
    margin: 20px auto;
    /* margin: 40px auto; */
}
.main-nav a {
    display: inline-block;
    text-decoration: none;
    margin: 0 10px;
    color: #fd2d01;
    font-size: 16px;
}
a.router-link-active {
    border-bottom: 2px solid #fd2d01;
    padding-bottom: 4px;
}
</style>
