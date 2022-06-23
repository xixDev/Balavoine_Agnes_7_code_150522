<template>
    <Navbar />
    <router-view />
    <footer>
        <span class="material-icons language"> language</span>
        <h4>Groupomania</h4>
    </footer>
</template>

<script>
import Navbar from './components/ui/Navbar.vue';

export default {
    components: { Navbar },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

/** #4E5166   #FFD7D7 #4E5166 */
* {
    font-family: 'Lato', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #f2f2f2;

    min-height: 100vh;
    /* background-image: linear-gradient(62deg, #f2f2f2 0%, #fff 100%); */
    /* display: flex;
    align-items: center;
    justify-content: center;
   
    padding: 30px;
    /* padding: 32px;  */
}
#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 600px;
    margin: 8px auto;
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
    border-radius: 8px;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.03),
        -3px -3px 6px rgba(136, 134, 134, 0.03);
    border-left: 8px solid #abd4dd;
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
        -3px -3px 6px rgba(136, 134, 134, 0.03); */
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
