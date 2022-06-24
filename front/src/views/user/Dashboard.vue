<template>
    <div class="blob">
        <h3>Mon dashboard</h3>
        <span class="material-icons face_5"> face_5 </span>
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
    name: 'Dashboard',

    mounted: function () {
        // console.log('dashboard******* USER :');
        // console.log(this.$store.state.user);
        // console.log('dashboard******* USER pseudo:');
        // console.log(this.$store.state.user.pseudo);
        // console.log('dashboard ******* USERS :');
        // console.log(this.$store.state.users);

        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        }
        console.log(this.$store.state.user);
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            // user: 'user',
            user: 'user',
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

<style scoped>
.material-icons {
    /* font-size: 24px;
    margin-left: 10px; */
    color: #4e5166;
}
</style>
