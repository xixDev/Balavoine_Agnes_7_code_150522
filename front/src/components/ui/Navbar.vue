<template>
    <nav class="main-nav">
        <span class="material-icons playlist_add"> playlist_add</span
        ><router-link :to="{ name: 'Home' }">Tous les messages</router-link>

        <span class="material-icons add"> add</span
        ><router-link :to="{ name: 'AddBlob' }">
            Ajouter un message</router-link
        >

        <router-link :to="{ name: 'Login' }"
            ><span class="material-icons face_5">face_5</span></router-link
        >
        <router-link :to="{ name: 'ListUser' }"
            ><span class="material-icons admin_panel_settings"
                >admin_panel_settings</span
            ></router-link
        >
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
};
</script>

<style>
/** #4E5166   #FFD7D7 #4E5166 */
.main-nav {
    background: #9b9eb4;
    /* margin: 0;
    padding: 0; */

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;

    padding: 10px 20px;
    border-radius: 8px;
    /* border-radius: 50px; */
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.03),
        -3px -3px 6px rgba(136, 134, 134, 0.03);
    border-left: 8px solid #4e5166;
}
.main-nav a {
    /* display: inline-block; */
    text-decoration: none;
    margin: 0 10px;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
}
a.router-link-active {
    border-bottom: 2px solid #fd2d01;
    text-decoration: none;
    /* padding-bottom: 4px; */
}

.material-icons {
    /* font-size: 24px;
    margin-left: 10px; */
    color: #fff;
}

.face_5,
.admin_panel_settings {
    font-size: 44px;
    color: #fff;
    /* color: #4e5166; */
    cursor: pointer;
    /* margin-left: 40px;
    padding-right: 0px; */
    display: flex;
    align-self: flex-end;

    /* border: 2px solid #abd4dd; */
}

.face_5:hover {
    color: #fd2d01;

    /* border: 2px solid #abd4dd; */
}
</style>
