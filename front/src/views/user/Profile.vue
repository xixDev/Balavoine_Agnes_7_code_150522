<template>
    <div class="blob">
        <h3>Mon dashboard</h3>

        <h4>Pseudo : {{ user.pseudo }}</h4>
        <h4>userId : {{ user.userId }}</h4>
        <!-- <h4>userId store : {{ $store.state.user.userId }}</h4> -->
        <h4>email : {{ user.email }}</h4>

        <!-- <img :src="user.picture" /> -->
        <div>
            <button @click="logout()" class="button">Déconnexion</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Profile',
    mounted: function () {
        console.log(this.$store.state.user);
        console.log(this.$store.state.users);

        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        }

        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            user: 'users',
        }),
    },
    methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/');
        },
    },
};
</script>

<style scoped></style>
