<template>
    <div class="home">
        <div v-for="blob in blobs" :key="blob.id">
            <SingleBlob
                :blob="blob"
                :user="user"
                :pseudo="user.pseudo"
                @delete="handleDelete"
                @edit="handleEdit"
            />
            <FilterLike
                :blob="blob"
                :currentLike="currentLike"
                :liked="liked"
                @filterChange="currentLike = $event"
                @likeRate="handleLikeRate"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

const API_URL = 'http://localhost:3000/api/blobs';
const API_URL_AUTH = 'http://localhost:3000/api/auth';

import SingleBlob from '../components/blob/SingleBlob.vue';
import FilterLike from '../components/blob/FilterLike.vue';

export default {
    name: 'Home',
    components: { SingleBlob, FilterLike },
    data() {
        return {
            blobs: null,
            users: null,
            pseudo: this.$store.state.user.pseudo,
            currentLike: this.currentLike,
            likeRate: 0,
            liked: false,
            disliked: false,
            userId: this.$store.state.user.userId,
        };
    },
    mounted() {
        //------------------ fetch BLOBS -----------------------
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
            })
            .catch((error) => {
                console.log(error);
                this.error = 'Failed to fetch data - please try again later.';
            });

        //------------------ fetch USER -----------------------
        fetch(API_URL_AUTH, {
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
                const usersArray = Object.values(response);
                this.users = usersArray;
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
        handleLikeRate(id) {
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
