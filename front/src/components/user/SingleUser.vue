<template>
    <div class="blob">
        <div class="user">
            <span class="material-icons face_5"> face_5 </span>
            <h4>
                userId : {{ user.userId }}
                <!-- <img class="imgBlob" :src="'' + blob.imageUrl" alt="titre" /> -->
            </h4>
        </div>
        <div class="actions">
            <h3>Pseudo : {{ user.pseudo }}</h3>

            <div class="icons">
                <button @click="deleteUser" class="material-icons">
                    delete
                </button>
                <router-link
                    :to="{ name: 'EditUser', params: { userId: user.userId } }"
                >
                    <button class="material-icons">edit</button>
                </router-link>
            </div>
        </div>
        <div>
            <img class="imgBlob" :src="'' + user.picture" alt="titre" />
        </div>
    </div>
</template>

<script>
const API_URL = 'http://localhost:3000/api/users/';
//:src="'' + user.picture"
// import imageUrl from "./assets/"+imageUrl;
export default {
    props: ['user'],
    data() {
        return {
            uri: API_URL + this.user.userId,
        };
    },
    methods: {
        deleteUser() {
            fetch(this.uri, { method: 'DELETE' })
                .then(() => this.$emit('delete', this.user.userId))
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped>
.blob {
    margin: 20px auto;
    /**#e4e1e1*/
    background: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    /* border-radius: 50px; */
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.03),
        -3px -3px 6px rgba(136, 134, 134, 0.03);
    border-left: 8px solid #abd4dd;
}
.imgBlob {
    border-color: #02d2fe solid 2px;
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

.blob.icons {
    border-left: 8px solid #9e0e9c;
}
.user {
    /* background-color: #ffd7d7; */
    opacity: 0.8;

    border-bottom: 2px dotted #4e5166;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.face_5 {
    font-size: 44px;
    margin-right: 10px;
    color: #4e5166;
    cursor: pointer;
    /* border: 2px solid #abd4dd; */
}

/* statusd projects */
</style>
