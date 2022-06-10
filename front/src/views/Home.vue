<template>
    <div class="home">
        <!-- <FilterNav :current="current" @filterChange="current = $event" /> -->
        <!-- <div v-if="blobs.length"> -->
        <div v-for="blob in blobs" :key="blob.id">
            <SingleBlob
                :blob="blob"
                @delete="handleDelete"
                @status="handleStatus"
            />
        </div>
    </div>

    <!-- </div> -->
</template>

<script>
const API_URL = 'http://localhost:3000/api/blobs';
import SingleBlob from '../components/SingleBlob.vue';
//import FilterNav from '../components/FilterNav.vue';

export default {
    name: 'Home',
    components: { SingleBlob },
    //components: { SingleBlob, FilterNav },
    data() {
        return {
            blobs: null,
            //current: '',
            // current: 'all',
        };
    },
    mounted() {
        fetch(API_URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((response) => {
                //blobsArray
                const blobsArray = Object.values(response.data);
                this.blobs = blobsArray;
                console.log(blobs);
            })
            .catch((error) => {
                console.log(error);
                this.error = 'Failed to fetch data - please try again later.';
            });
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
