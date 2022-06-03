<template>
    <form @submit.prevent="handleSubmit">
        <label>Title</label>
        <input type="text" v-model="title" required />
        <label>description</label>
        <textarea v-model="description" required></textarea>
        <button>Update Blob</button>
    </form>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            uri: 'http://localhost:3000/blobs/' + this.id,
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
