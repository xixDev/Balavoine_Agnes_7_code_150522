<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!-- <p>Blobs : {{ blobs }}</p> -->
        <div v-for="blob in blobs" :key="blob.id">
            <p>Blobs : {{ blob }}</p>
            <!-- <SingleBlob
                :blob="blob"
                @delete="handleDelete"
                @status="handleStatus"
            /> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
//import SingleBlob from '../components/SingleBlob.vue';

export default {
    name: 'Hello',
    //components: { SingleBlob },
    props: {
        msg: String,
        blobs: [],
    },
    created() {
        // fetch('http://localhost:3000/api/blobs')
        //     .then((res) => res.json())
        //     .then((data) => (this.blobs = data))
        //     .catch((err) => console.log(err));
        // Step 1 : "Hello, Heroku ! 👋"
        axios
            .get('http://localhost:3000/api/blobs')
            .then((res) => console.log(res.data))
            .then((data) => (this.blobs = data));

        // fetch('http://localhost:3000/api/blobs')
        //     .then((res) => res.json())
        //     .then((data) => (this.blobs = data))
        //     .catch((err) => console.log(err));
        // axios
        //     .get('http://localhost:3000/api/blobs')
        //     .then((res) => console.log(res.data));
        // Step 2 : "Get JWT token 🔓"
        // axios
        //     .post(
        //         'https://cryptic-sands-41262.herokuapp.com/api/login',
        //         { username: 'pikachu', password: 'pikachu' },
        //         { headers: { 'Content-Type': 'application/json' } }
        //     )
        //     .then((res) => res.data)
        //     .then((res) => {
        //         console.log(res);
        //         return res.token;
        //     })
        //     .then((token) => this.fetchPokemonlist(token));
    },
    // methods: {
    //     // Step 3 : "Get pokemon list 🎉"
    //     // fetchPokemonlist(token) {
    //     fetchPokemonlist() {
    //         return axios
    //             .get('http://localhost:3000/api/blobs', {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 // headers: { Authorization: `Bearer ${token}` },
    //             })
    //             .then((res) => res.json())
    //             .then((data) => (this.blobs = data));
    //     },
    // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
