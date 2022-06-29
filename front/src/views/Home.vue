<template>
    <div class="home">
        <div v-for="blob in blobs" :key="blob.id">
            <SingleBlob
                :blob="blob"
                @delete="handleDelete"
                @edit="handleEdit"
            />
            <FilterLike
                :blob="blob"
                :currentLike="currentLike"
                :liked="liked"
                @filterChange="currentLike = $event"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

const API_URL = 'http://localhost:3000/api/blobs';

import SingleBlob from '../components/blob/SingleBlob.vue';
import FilterLike from '../components/blob/FilterLike.vue';

export default {
    name: 'Home',
    components: { SingleBlob, FilterLike },
    data() {
        return {
            //blobs: null,
            blobs: null,
            users: null,
            userId: this.$store.state.user.userId,
            pseudo: this.$store.state.user.pseudo,
            currentLike: 'jaimepas',
            likeRate: '',
            liked: false,
        };
    },
    mounted() {
        fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${this.$store.state.user.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((response) => {
                const blobsArray = Object.values(response.data);
                this.blobs = blobsArray;
                //console.log(`blobs : ${blobs}`);
                console.log(`blobsArray : ${blobsArray}`);
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
        handleEdit(id) {
            this.blobs = this.blobs.filter((blob) => {
                return blob.id !== id;
            });
        },
    },
    computed: {
        ...mapState({
            user: 'user',
        }),
    },
};
</script>
