<template>
    <div class="blob" :class="{ status: blob.status }">
        <div class="user">
            <span class="material-icons face_5"> face_5 </span>
            <h4>
                userId : {{ blob.userId }}
                <!-- <img class="imgBlob" :src="'' + blob.imageUrl" alt="titre" /> -->
            </h4>
        </div>
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
        <div>
            <img class="imgBlob" :src="'' + blob.imageUrl" alt="titre" />
        </div>
        <div v-if="showdescription" class="description">
            <p>{{ blob.description }}</p>
        </div>
        <div class="actionsLike info">
            <!-- <input
                type="radio"
                id="likes-jaime"
                value="likes"
                name="likes"
                v-model="chosenLikes"
            />
            <label for="likes-average">J'aime</label>
            <input
                type="radio"
                id="likes-jaimepas"
                value="dislikes"
                name="likes"
                v-model="chosenLikes"
            />
            <label for="likes-average">J'aime pas</label> -->
            <h4>Donnez votre avis :</h4>
            <span @click="likeBlob" class="material-icons thumb_down">
                thumb_down
            </span>
            <span @click="dislikeBlob" class="material-icons thumb_up">
                thumb_up
            </span>
        </div>
    </div>
</template>

<script>
const API_URL = 'http://localhost:3000/api/blobs/';
// import imageUrl from "./assets/"+imageUrl;
export default {
    props: ['blob'],
    data() {
        return {
            showdescription: true,
            uri: API_URL + this.blob.id,
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
        likeBlob() {
            console.log('like :1');
        },
        dislikeBlob() {
            console.log('like : -1');
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
    /* margin: 20px; */
    color: #ef8585;
    padding: 10px;
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
