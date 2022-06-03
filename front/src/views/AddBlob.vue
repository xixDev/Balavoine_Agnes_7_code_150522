<template>
    <form @submit.prevent="handleSubmit">
        <label>Title</label>
        <input type="text" v-model="title" required />
        <label>description</label>
        <textarea v-model="description" required></textarea>
        <button>Ajouter un message</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            description: '',
        };
    },
    methods: {
        handleSubmit() {
            let blob = {
                title: this.title,
                description: this.description,
                status: false,
                id: Math.floor(Math.random() * 10000),
            };
            console.log(blob);

            fetch('http://localhost:3000/blobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
