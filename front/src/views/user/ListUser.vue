<template>
    <div class="home">
        <!-- <FilterNav :current="current" @filterChange="current = $event" /> -->
        <!-- <div v-if="blobs.length"> -->
        <div v-for="user in users" :key="user.userId">
            <SingleUser :user="user" @delete="handleDelete" />
        </div>
    </div>
    <!-- </div> -->

    <!-- </div> -->
</template>

<script>
//const axios = require('axios');
const API_URL = 'http://localhost:3000/api/users';
//import FilterNav from '../components/user/FilterNav.vue';
import SingleUser from '@/components/user/SingleUser.vue';

export default {
    name: 'ListUser',
    components: { SingleUser },
    //components: { SingleBlob, FilterNav },
    data() {
        return {
            users: null,
            //current: '',
            // current: 'all',
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

        fetch(API_URL, {
            headers: {
                //Authorization: 'Bearer ' + localStorage.getItem('token'),
                Authorization: `Bearer ${this.$store.state.user.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((response) => {
                console.log(response);
                const usersArray = Object.values(response);
                this.users = usersArray;
                console.log(users);
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
        handleDelete(userId) {
            this.users = this.users.filter((user) => {
                return user.userId !== userId;
            });
        },
    },
    // computed: {
    //     filteredBlobs() {
    //         if (this.current === 'online') {
    //             return this.users.filter((user) => user.status);
    //         }
    //         if (this.current === 'offline') {
    //             return this.users.filter((user) => !user.status);
    //         }
    //         return this.users;
    //     },
    // },
};
</script>
