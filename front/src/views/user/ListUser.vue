<template>
    <div class="home">
        <div v-for="user in users" :key="user.userId">
            <SingleUser :user="user" @delete="handleDelete" />
        </div>
    </div>
</template>

<script>
const API_URL_AUTH = 'http://localhost:3000/api/auth';
import SingleUser from '@/components/user/SingleUser.vue';

export default {
    name: 'ListUser',
    components: { SingleUser },

    data() {
        return {
            users: null,
        };
    },
    mounted() {
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
        handleDelete(userId) {
            this.users = this.users.filter((user) => {
                return user.userId !== userId;
            });
        },
    },
};
</script>
