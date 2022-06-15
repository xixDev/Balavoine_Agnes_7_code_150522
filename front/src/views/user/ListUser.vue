<template>
    <div class="home">
        <!-- <FilterNav :current="current" @filterChange="current = $event" /> -->
        <!-- <div v-if="blobs.length"> -->
        <div v-for="user in users" :key="user.userId">
            <SingleUser
                :user="user"
                @delete="handleDelete"
                @status="handleStatus"
            />
        </div>
    </div>
    <!-- </div> -->

    <!-- </div> -->
</template>

<script>
//const axios = require('axios');
const API_URL = 'http://localhost:3000/api/users';
//import FilterNav from '../components/user/FilterNav.vue';
import SingleUser from '../../components/user/SingleUser.vue';

export default {
    name: 'ListUser',
    components: { SingleUser },
    // components: { SingleUser, FilterNav },
    data() {
        return {
            users: null,
            //current: '',
            current: 'all',
        };
    },
    mounted() {
        // axios
        //     .get('http://localhost:3000/api/users')
        //     .then((res) => {
        //         console.log(res.data);
        //         this.users = res.data;
        //     })
        //     .catch((err) => console.log(err));

        fetch(API_URL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((res) => {
                const usersArray = Object.values(res.data);
                console.log(data);
                this.users = usersArray;

                console.log(users);

                // console.log(res.data);
                // this.users = res.data;
                // console.log(users);
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
        handleStatus(userId) {
            let p = this.users.find((user) => {
                return user.userId === userId;
            });
            p.status = !p.status;
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
