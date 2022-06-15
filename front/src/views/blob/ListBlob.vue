<template>
    <div class="home">
        <FilterNav :current="current" @filterChange="current = $event" />
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

    <!-- </div> -->
</template>

<script>
const API_URL = 'http://localhost:3000/api/blobs';
import FilterNav from '../components/blob/FilterNav.vue';
import SingleBlob from '../components/blob/SingleBlob.vue';

//const API_URL =('https://vue-http-demo-dbdcb-default-rtdb.europe-west1.firebasedatabase.app/blobs.json');

export default {
    name: 'Home',
    // components: { SingleBlob },
    components: { SingleBlob, FilterNav },
    data() {
        return {
            blobs: null,
            //current: '',
            current: 'all',
        };
    },
    mounted() {
        // axios
        //     .get('http://localhost:3000/api/blobs')
        //     .then((res) => {
        //         console.log(res.data);
        //         this.blobs = res.data;
        //     })
        //     .catch((err) => console.log(err));

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
        // displayBlobs(id) {

        //     console.log(data.id);
        // },
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
    computed: {
        filteredBlobs() {
            if (this.current === 'online') {
                return this.blobs.filter((blob) => blob.status);
            }
            if (this.current === 'offline') {
                return this.blobs.filter((blob) => !blob.status);
            }
            return this.blobs;
        },
    },
};
</script>
