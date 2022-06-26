<template>
    <div class="blob">
        <h3>Mon dashboard</h3>
        <span class="material-icons face_5"> face_5 </span>
        <h4>Hello Pseudo {{ user.pseudo }}</h4>
        <h4>userId : {{ user.userId }}</h4>
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
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('getUserInfos');
    },

    methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/login');
        },
    },
    computed: {
        ...mapState({
            user: 'user',
        }),
    },
};
</script>

<style scoped>
.material-icons {
    color: #4e5166;
}
</style>
