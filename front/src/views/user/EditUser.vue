<template>
    <form @submit.prevent="handleSubmit">
        <label>@mail</label>
        <input type="text" v-model="email" />
        <label>Pseudo</label>
        <input type="text" v-model="pseudo" />
        <label>Avatar</label>
        <input type="text" v-model="picture" />

        <button>Modifier</button>
    </form>
</template>

<script>
const API_URL = 'http://localhost:3000/api/users/';
export default {
    props: ['userId'],

    data() {
        console.log(this.userId);
        return {
            uri: API_URL + this.userId,
            userId: '',
            pseudo: '',
            email: '',
            picture: '',
        };
    },
    mounted() {
        fetch(this.uri, {
            headers: {
                Authorization: `Bearer ${this.$store.state.user.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                //blobsArray
                this.userId = data.data.userId;
                this.pseudo = data.data.pseudo;
                this.picture = data.data.picture;
                this.email = data.data.email;
            })
            .catch((error) => {
                console.log(error);
                this.error = 'Failed to fetch data - please try again later.';
            });
    },
    methods: {
        handleSubmit() {
            fetch(this.uri, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.user.token}`,
                },

                body: JSON.stringify({
                    pseudo: this.pseudo,
                    picture: this.picture,
                    email: this.email,
                }),
            })
                .then(() => {
                    this.$router.push('/listUser');
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style></style>
