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
/** #4E5166   #FFD7D7 #4E5166  rose pale f9e6e6 #eeeeeb*/
/** gris : #4E5166 rouge : #FD2D01 rose : #FFD7D7  */
.main-nav {
    background: #fd2d01;
    /* background-image: linear-gradient(62deg, #eeeeeb 0%, #ffd7d7 100%); */
    /** gris (#9b9eb4) #4E5166 red : #fd2d01 rose :FFD7D7  */
    /* margin: 0;
    padding: 0; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;

    padding: 10px 20px;
    border-radius: 0 0 20px 20px;
    /* border-radius: 50px; */
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.06),
        -3px -3px 6px rgba(136, 134, 134, 0.06);
    /* border-top: 8px solid #9b9eb4; */
}
.main-nav a {
    /* display: inline-block; */
    text-decoration: none;
    margin: 8px 10px;
    color: #ffd7d7;
    font-weight: bold;
    font-size: 18px;
}
a.router-link-active {
    /*border-bottom: 2px solid #fff;*/
    text-decoration: none;
    color: #4e5166;
    /* padding-bottom: 4px; */
}

.main-nav .material-icons {
    /* font-size: 24px;
    margin-left: 10px; */
    color: #ffd7d7;
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

.face_5:hover,
.admin_panel_settings:hover {
    color: #4e5166;

    /* border: 2px solid #abd4dd; */
}
</style>
