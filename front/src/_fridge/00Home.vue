<template>
    <div class="home">
        <!-- <FilterNav :current="current" @filterChange="current = $event" />  -->

        <!-- <div v-if="blobs.length">
            <div v-for="blob in filteredBlobs" :key="blob.id"> -->

        <div v-for="blob in blobs" :key="blob.id" :current="current">
            <SingleBlob
                :blob="blob"
                @delete="handleDelete"
                @status="handleStatus"
            />
        </div>
    </div>
</template>

<script>
//import axios from 'axios';
import SingleBlob from '../components/SingleBlob.vue';
// import FilterNav from '../components/FilterNav.vue';
// const baseURL = 'http://localhost:3000/api';
export default {
    name: 'Home',
    components: { SingleBlob },
    // components: { SingleBlob, FilterNav },
    data() {
        return {
            blobs: [],
            current: 'all',
            //current: 'all',
        };
    },

    mounted() {
        // axios
        //     .get('http://localhost:3000/api/blobs')
        //     .then((res) => console.log(res.data))
        //     .then((data) => (this.blobs = data));
        /// all BLOBS
        fetch('http://localhost:3000/api/blobs')
            .then((res) => res.json())
            .then((data) => (this.blobs = data))
            .catch((err) => console.log(err));

        // fetch('http://localhost:3000/api/blobs')
        //     .then((response) => {
        //         if (response.ok) {
        //             return response.json();
        //         }
        //     })
        //     // .then((data) => (this.blobs = data))
        //     // .catch((err) => console.log(err));
        //     .then((data) => {
        //         // for (const id in data) {
        //         //     blobs.push({
        //         //         id: id,
        //         //         userId: data[id].userId,
        //         //         status: data[id].status,
        //         //         title: data[id].title,
        //         //         description: data[id].description,
        //         //         imageUrl: data[id].imageUrl,
        //         //         likes: data[id].likes,
        //         //         dislikes: data[id].dislikes,
        //         //         usersLiked: data[id].usersLiked,
        //         //         usersDisliked: data[id].usersDisliked,
        //         //         usersComments: data[id].usersComments,
        //         //     });
        //         // }
        //         this.blobs = data;
        //         console.log(data);
        //     })
        //     .catch((err) => console.log(err));
    },
    methods: {
        handleDelete(id) {
            this.blobs = this.blobs.filter((blob) => {
                return blob.id !== id;
            });
        },
        handleStatus(id) {
            let p = this.blobs.find((blob) => {
                return blob.id === id;
            });
            p.status = !p.status;
        },
    },
    // computed: {
    //     filteredBlobs() {
    //         if (this.current === 'online') {
    //             return this.blobs.filter((blob) => blob.status);
    //         }
    //         if (this.current === 'offline') {
    //             return this.blobs.filter((blob) => !blob.status);
    //         }
    //         return this.blobs;
    //     },
    // },
};
</script>
