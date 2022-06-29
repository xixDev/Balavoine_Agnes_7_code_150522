<template>
    <Navbar />
    <router-view />
    <footer>
        <span class="material-icons language"> language</span>
        <h4>Groupomania</h4>
    </footer>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from './components/ui/Navbar.vue';

export default {
    components: { Navbar },

    mounted: function () {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/login');
            return;
        }
    },

    computed: {
        ...mapState({
            user: 'user',
        }),
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

/** gris : #4E5166 rouge : #FD2D01 rose : #FFD7D7  */
* {
    font-family: 'Lato', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    /* background: #f2f2f2; */
    background: #eeeeeb;
    color: #4e5166;
    min-height: 100vh;
    opacity: 95%;
    /* background-image: linear-gradient(62deg, #cae2e7 0%, #4e5166 100%); */
    /* background-image: linear-gradient(62deg, #eeeeeb 0%, #ffd7d7 100%); */
    /* background-image: linear-gradient(62deg, #f9e6e6 0%, #eeeeeb 100%); */
    /* display: flex;
    align-items: center;
    justify-content: center; */

    /* padding: 30px; */
    /* padding: 32px;  */
}
#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 600px;
    margin: 0px auto;
}

p {
    margin: 4px;
    line-height: 1.6;
    text-align: justify;
    width: 90%;
}
img {
    max-width: 100%;
    border-radius: 8px;
}
h3 {
    text-align: center;
    text-transform: uppercase;
    color: #4e5166;
    margin: 20px 0 10px;
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: bold;
}
.info {
    text-align: center;
    color: #4e5166;
    margin: 20px 0 10px;
    font-size: 14px;
    letter-spacing: 1px;
}
.blob {
    margin: 20px auto;
    background: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.03),
        -3px -3px 6px rgba(136, 134, 134, 0.03);
    border-left: 8px solid #fff;
}

button {
    display: block;
    margin: 20px auto 10px;
    /* background-color: #4e5166; */

    background-color: #fd2d01;
    color: #ffd7d7;
    border: none;
    padding: 0.8rem;
    border-radius: 6rem;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    /* box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.05),
        -3px -3px 6px rgba(136, 134, 134, 0.03);9b9eb4 */
}
button:hover {
    background-color: #ffd7d7;
    color: #fd2d01;
}
.material-icons {
    /* font-size: 24px;
    margin-left: 10px; */
    color: #4e5166;
}
footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #ccc;
}
footer .material-icons {
    font-size: 28px;
    color: #ccc;
    padding: 8px;
}
button.material-icons {
    background-color: #eeeeeb;
    color: #02d2fe;
    border: none;
    padding: 0.8rem;
    border-radius: 6rem;
    cursor: pointer;
}

button:hover.material-icons {
    background-color: #02d2fe;
    color: #fff;
    /* color: #fd2d01; */
}
</style>
