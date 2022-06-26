<template>
    <form @submit.prevent="handleSubmit">
        <label>Titre</label>
        <input type="text" v-model="title" />
        <label>Image Url</label>
        <input type="text" v-model="imageUrl" />
        <label>Message</label>
        <textarea v-model="description"></textarea>
        <button>Modifier</button>
    </form>
</template>

<script>
const API_URL = 'http://localhost:3000/api/blobs/';
export default {
    props: ['id'],

    data() {
        return {
            uri: API_URL + this.id,
            title: '',
            imageUrl: '',
            description: '',
            userId: this.$store.state.user.userId,
            likes: this.likes,
            dislikes: this.dislikes,
            usersLiked: this.usersLiked,
            usersDisliked: this.usersDisliked,
            usersComments: this.usersComments,
            //
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
                this.title = data.data.title;
                this.imageUrl = data.data.imageUrl;
                this.description = data.data.description;
                this.likes = data.data.likes;
                this.dislikes = data.data.dislikes;
                this.usersLiked = data.data.usersLiked;
                this.usersDisliked = data.data.usersDisliked;
                this.usersComments = data.data.usersComments;

                console.log('blob :');
                console.log(blob);
            })
            .catch((error) => {
                console.log(error);
                this.error = 'Failed to fetch data - please try again later.';
            });
    },
    //  PUT
    methods: {
        handleSubmit() {
            let blob = {
                //***  */
                userId: this.userId,
                status: false,
                title: this.title,
                description: this.description,
                imageUrl: this.imageUrl,
                likes: this.likes,
                dislikes: this.dislikes,
                usersLiked: this.usersLiked,
                usersDisliked: this.usersDisliked,
                usersComments: this.usersComments,
            };

            //
            const headersForm = {
                method: 'PUT',
                body: JSON.stringify(blob),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.user.token}`,
                },
            };
            fetch(this.uri, headersForm)
                .then(() => {
                    this.$router.push('/');
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style></style>
