<template>
    <div class="home">
        <FilterNav :current="current" @filterChange="current = $event" />
        <div v-if="blobs.length">
            <div v-for="blob in filteredBlobs" :key="blob.id">
                <SingleBlob
                    :blob="blob"
                    @delete="handleDelete"
                    @status="handleStatus"
                />
            </div>
        </div>
    </div>
    <!-- <img alt="Groupomania" src="../assets/logo.png" /> -->
</template>

<script>
import SingleBlob from '../components/SingleBlob.vue';
import FilterNav from '../components/FilterNav.vue';

export default {
    name: 'Home',
    components: { SingleBlob, FilterNav },
    data() {
        return {
            blobs: [],
            current: 'all',
        };
    },
    mounted() {
        fetch('http://localhost:3000/blobs')
            .then((res) => res.json())
            .then((data) => (this.blobs = data))
            .catch((err) => console.log(err));
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
