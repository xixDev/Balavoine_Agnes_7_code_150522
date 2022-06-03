<template>
    <div class="blob" :class="{ status: blob.status }">
        <div class="actions">
            <h3 @click="showdescription = !showdescription">
                {{ blob.title }}
            </h3>
            <div class="icons">
                <span @click="deleteBlob" class="material-icons">delete</span>
                <router-link
                    :to="{ name: 'EditBlob', params: { id: blob.id } }"
                >
                    <span class="material-icons">edit</span>
                </router-link>
                <span @click="togglestatus" class="material-icons tick"
                    >done</span
                >
            </div>
        </div>
        <div v-if="showdescription" class="description">
            <p>{{ blob.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['blob'],
    data() {
        return {
            showdescription: false,
            uri: 'http://localhost:3000/blobs/' + this.blob.id,
        };
    },
    methods: {
        deleteBlob() {
            fetch(this.uri, { method: 'DELETE' })
                .then(() => this.$emit('delete', this.blob.id))
                .catch((err) => console.log(err));
        },
        togglestatus() {
            fetch(this.uri, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: !this.blob.status }),
            })
                .then(() => {
                    this.$emit('status', this.blob.id);
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped>
.blob {
    margin: 20px auto;
    background: #e4e1e1;
    padding: 10px 20px;
    border-radius: 8px;
    /* border-radius: 50px; */
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.03),
        -3px -3px 6px rgba(136, 134, 134, 0.03);
    border-left: 8px solid #abd4dd;
}
h3 {
    cursor: pointer;
}
.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.material-icons {
    font-size: 24px;
    margin-left: 10px;
    color: #02d2fe;
    cursor: pointer;
}
.material-icons:hover {
    color: #abd4dd;
}
/* statusd projects */
.blob.status {
    border-left: 8px solid #fd2d01;
}
.blob.status .tick {
    color: #fd2d01;
}
</style>
