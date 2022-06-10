<template>
    <form @submit.prevent="handleSubmit">
        <label>Titre</label>
        <input type="text" v-model="title" required />
        <label>Message</label>
        <textarea v-model="description" required></textarea>
        <button>Ajouter un message</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            userId: '',
            title: '',
            description: '',
            imageUrl: '',
            likes: '',
            dislikes: '',
            usersLiked: [],
            usersDisliked: [],
            usersComments: [],
        };
    },
    methods: {
        handleSubmit() {
            let blob = {
                //***  */
                id: Math.floor(Math.random() * 10000),
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
            console.log(blob);

            //         fetch('http://localhost:3000/blobs', {
            //             method: 'POST',
            //             headers: { 'Content-Type': 'application/json' },
            //             body: JSON.stringify(blob),
            //         })
            //             .then(() => {
            //                 this.$router.push('/');
            //             })
            //             .catch((err) => console.log(err));
            //     },
            // },

            fetch('http://localhost:3000/api/blobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blob),
            })
                .then(() => {
                    this.$router.push('/');
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style>
form {
    background: #e4e1e1;
    padding: 20px;
    padding: 10px 20px;
    border-radius: 8px;
    /* border-radius: 50px; */
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.03),
        -3px -3px 6px rgba(136, 134, 134, 0.03);
}
label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
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
form button {
    display: block;
    margin: 20px auto 0;
    background: #fd2d01;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
}
</style>
