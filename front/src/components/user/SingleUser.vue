<template>
    <div class="blob" :class="{ status: user.status }">
        <div class="user">
            <span class="material-icons face_5"> face_5 </span>
            <h4>
                {{ user.userId }}
                <!-- <img class="imgBlob" :src="'' + blob.imageUrl" alt="titre" /> -->
            </h4>
        </div>
        <div class="actions">
            <h3 @click="showdescription = !showdescription">
                {{ user.pseudo }}
            </h3>

            <div class="icons">
                <span @click="deleteUser" class="material-icons">delete</span>
                <router-link
                    :to="{ name: 'EditUser', params: { userId: user.userId } }"
                >
                    <span class="material-icons">edit</span>
                </router-link>
                <span @click="togglestatus" class="material-icons tick"
                    >done</span
                >
            </div>
        </div>
        <div>
            <img class="imgBlob" :src="'' + user.imageUrl" alt="titre" />
        </div>
        <div v-if="showdescription" class="description">
            <p>{{ user.pseudo }}</p>
        </div>
    </div>
</template>

<script>
const API_URL = 'http://localhost:3000/api/users/';
// import imageUrl from "./assets/"+imageUrl;
export default {
    props: ['user'],
    data() {
        return {
            showdescription: true,
            uri: API_URL + this.user.userId,
        };
    },
    methods: {
        deleteUser() {
            fetch(this.uri, { method: 'DELETE' })
                .then(() => this.$emit('delete', this.user.userId))
                .catch((err) => console.log(err));
        },
        togglestatus() {
            fetch(this.uri, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: !this.user.status }),
            })
                .then(() => {
                    this.$emit('status', this.user.userId);
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped>
.imgBlob {
    border-color: #02d2fe solid 2px;
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
.user {
    /* background-color: #ffd7d7; */
    opacity: 0.8;

    border-bottom: 2px dotted #4e5166;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.actionsLike {
    /* background-color: #ffd7d7; */
    opacity: 0.8;
    border-top: 2px dotted #4e5166;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.thumb_down,
.thumb_up {
    font-size: 24px;
    margin-right: 10px;
    color: #ef8585;
    cursor: pointer;
    /* border: 2px solid #abd4dd; */
}

.thumb_down:hover,
.thumb_up:hover {
    color: #fd2d01;
}
.face_5 {
    font-size: 44px;
    margin-right: 10px;
    color: #4e5166;
    cursor: pointer;
    /* border: 2px solid #abd4dd; */
}

/* statusd projects */
.blob.status {
    border-left: 8px solid #fd2d01;
}
.blob.status .tick {
    color: #fd2d01;
}
</style>
