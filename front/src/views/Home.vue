<template>
    <div class="home">
        <!-- <div v-if="blobs.length"> -->
        <div v-for="blob in blobs" :key="blob.id">
            <SingleBlob
                :blob="blob"
                @delete="handleDelete"
                @edit="handleEdit"
            />
            <FilterLike
                :blob="blob"
                :currentLike="currentLike"
                @filterChange="currentLike = $event"
            />
        </div>
    </div>
</template>

<script>
// @likeRate="handleLikeRate"
/*
:currentLike="currentLike"
@filterChange="currentLike = $event"
@like="handleLike"
*/
import { mapState } from 'vuex';
const API_URL = 'http://localhost:3000/api/blobs';

import SingleBlob from '../components/blob/SingleBlob.vue';
import FilterLike from '../components/blob/FilterLike.vue';

export default {
    name: 'Home',
    components: { SingleBlob, FilterLike },
    data() {
        return {
            blobs: null,
            currentLike: '',
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
        handleEdit(id) {
            this.blobs = this.blobs.filter((blob) => {
                return blob.id !== id;
            });
        },
        handleLike(id) {
            this.blobs = this.blobs.filter((blob) => {
                return blob.id !== id;
            });
        },
        handleLikeRate(userId) {
            //let likeRate = 0;
            this.blobs = this.blobs.filter((blob) => {
                // si deja RATE || blob.usersDisliked.includes(userId)
                if (blob.usersLiked.includes(userId)) {
                    this.likeRate = 1;
                } else if (blob.usersDisliked.includes(userId)) {
                    this.likeRate = -1;
                }
                console.log(`LikeRate : ${likeRate}`);
                return this.likeRate;
            });
            console.log(`LikeRate2 : ${likeRate}`);
        },
    },
    computed: {
        ...mapState({
            user: 'user',
        }),
    },
};
</script>
