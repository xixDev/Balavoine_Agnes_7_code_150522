<template>
    <nav class="main-nav">
        <span class="material-icons playlist_add"> playlist_add</span
        ><router-link :to="{ name: 'Home' }">Tous les messages</router-link>

        <span class="material-icons add"> add</span
        ><router-link :to="{ name: 'AddBlob' }">
            Ajouter un message</router-link
        >

        <router-link :to="{ name: 'Dashboard' }"
            ><span class="material-icons face_5">face_5</span></router-link
        >
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
};
</script>

<style>
.main-nav {
    background: #fd2d01;

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 10px 20px;
    border-radius: 0 0 20px 20px;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.06),
        -3px -3px 6px rgba(136, 134, 134, 0.06);
}
.main-nav a {
    text-decoration: none;
    margin: 8px 10px;
    color: #ffd7d7;
    font-weight: bold;
    font-size: 18px;
}
a.router-link-active {
    text-decoration: none;
    color: #4e5166;
}

.main-nav .material-icons {
    color: #ffd7d7;
}

.face_5,
.admin_panel_settings {
    font-size: 44px;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-self: flex-end;
}

.face_5:hover,
.admin_panel_settings:hover {
    color: #4e5166;
}
</style>
