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
        console.log(this.id);
        return {
            uri: API_URL + this.id,
            title: '',
            imageUrl: '',
            description: '',
            userId: this.$store.state.user.userId,
            likes: 0,
            dislikes: 0,
            usersLiked: [''],
            usersDisliked: [''],
            usersComments: [''],
        };
    },
    mounted() {
        fetch(this.uri)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                //blobsArray
                console.log(data.data);
                // const blobsArray = Object.values(data);
                //this.blob = data;

                this.title = data.data.title;
                this.imageUrl = data.data.imageUrl;
                this.description = data.data.description;
                console.log('blob :');
                console.log(blob);
            })
            .catch((error) => {
                console.log(error);
                this.error = 'Failed to fetch data - please try again later.';
            });

    },
    // PATCH, PUT
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

            const headersForm = {
                method: 'PUT',
                body: JSON.stringify(blob),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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
