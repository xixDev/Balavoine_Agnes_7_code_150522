<template>
    <form @submit.prevent="handleSubmit">
        <label>Titre</label>
        <input type="text" v-model="title" required />
        <label>Message</label>
        <textarea v-model="description" required></textarea>
        <button>Modifier</button>
    </form>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            uri: 'http://localhost:3000/api/blobs/' + this.id,
            title: '',
            description: '',
        };
    },
    mounted() {
        fetch(this.uri)
            .then((res) => res.json())
            .then((data) => {
                this.title = data.title;
                this.description = data.description;
            })
            .catch((err) => console.log(err));
    },
    methods: {
        handleSubmit() {
            fetch(this.uri, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: this.title,
                    description: this.description,
                }),
            })
                .then(() => {
                    this.$router.push('/');
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style></style>
