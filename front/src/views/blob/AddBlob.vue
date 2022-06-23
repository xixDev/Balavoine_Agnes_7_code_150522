<template>
    <form @submit.prevent="handleSubmit">
        <label>Titre</label>
        <input type="text" id="title" name="title" v-model="enteredTitle" />

        <label>Image Url</label>
        <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            v-model="enteredImageUrl"
        />
        <label>Message</label>
        <textarea v-model="description"></textarea>
        <button>Ajouter un message</button>
    </form>
</template>

<script>
const API_URL = 'http://localhost:3000/api/blobs';

export default {
    data() {
        return {
            token: this.$store.state.user.token,
            email: this.$store.state.user.email,
            enteredTitle: '',
            enteredImageUrl: '',
            userId: this.$store.state.user.userId,
            title: '',
            description: '',
            imageUrl: '',
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
            usersComments: [],
        };
    },
    methods: {
        handleSubmit() {
            let blob = {
                //***  */
                userId: this.userId,
                status: false,
                title: this.enteredTitle,
                description: this.description,
                imageUrl: this.enteredImageUrl,
                likes: this.likes,
                dislikes: this.dislikes,
                usersLiked: this.usersLiked,
                usersDisliked: this.usersDisliked,
                usersComments: this.usersComments,
            };

            //Authorization: `Bearer ${this.$store.state.user.token}`,
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.user.token}`,
                },
                body: JSON.stringify(blob),
            })
                .then((response) => {
                    if (response.ok) {
                        // ...
                    } else {
                        throw new Error('Could not save data!');
                    }
                })
                .then(() => {
                    this.$router.push('/');
                })
                .catch((error) => {
                    console.log(error);
                    this.error = error.message;
                });

            this.enteredTitle = '';
            this.enteredImageUrl = '';
        },
    },
};
</script>

<style>
form {
    margin: 20px auto;
    /**#e4e1e1*/
    width: 100%;
    background: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    /* border-radius: 50px; */
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.03),
        -3px -3px 6px rgba(136, 134, 134, 0.03);
    border-left: 8px solid #abd4dd;
}
label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
}
input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
}
textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
}
</style>
