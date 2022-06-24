<template>
    <div class="blob" >
        <div class="user">
            <span class="material-icons face_5"> face_5 </span>
            <h4>
                userId : {{ blob.userId }} / Pseudo : / Blob ID : {{ blob.id }}
                <!-- <img class="imgBlob" :src="'' + blob.imageUrl" alt="titre" />{{ user.pseudo }}  -->
            </h4>
        </div>
        <div class="actions">
            <h3 @click="showdescription = !showdescription">
                {{ blob.title }}
            </h3>
            <div class="icons" v-if="showTools">
                <button @click="deleteBlob" class="material-icons">
                    delete
                </button>
                <router-link
                    :to="{
                        name: 'EditBlob',
                        params: { id: blob.id, userId: blob.userId },
                    }"
                >
                    <button class="material-icons">edit</button>
                </router-link>
            </div>
        </div>
        <!-- <div>
            <img class="imgBlob" :src="'' + blob.imageUrl" alt="titre" />
        </div> -->
        <div v-if="showdescription" class="description">
        <img class="imgBlob" :src="'' + blob.imageUrl" alt="titre" />
            <p><pre>{{ blob.description }}</pre></p>
            <!-- <legend>{{ blob.created }}</legend> -->
        </div>

    </div>
</template>

<script>
const API_URL = 'http://localhost:3000/api/blobs/';

export default {
    props: ['blob'],
    data() {
        return {
            showTools: false,
            showdescription: true,
            uri: API_URL + this.blob.id,
        };
    },
    mounted() {
        //console.log(`userId :`);
        // on teste si admin et si userId match userId du blob
        // && this.user.admin === 0
        // && this.user.admin === 1
        if (this.$store.state.user.userId != this.blob.userId) {
            // console.log(`user.userId : ${this.$store.state.user.userId}`);
            // console.log(`blob.userId : ${this.blob.userId}`);
            // console.log(` hideTools************`);
            this.showTools = false;
        } else {
            // console.log(`user.userId : ${this.$store.state.user.userId}`);
            // console.log(`blob.userId : ${this.blob.userId}`);
            // console.log(`showTools************`);
            this.showTools = true;
        }
    },
    methods: {
        // ajouter modale ou alert
        // DELETE
        deleteBlob() {
            const headersForm = {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.user.token}`,
                },
            };
            fetch(this.uri, headersForm)
        
                .then(() => this.$emit('delete', this.blob.id))
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
    padding: 10px 20px 10px 20px;
    border-radius: 20px 20px 0px 0px;
    /* border-radius: 50px; */
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.03),
        -3px -3px 6px rgba(136, 134, 134, 0.03);
    /* border-left: 8px dotted #d47575; */
    opacity:90%;
   border: 8px solid #fff;
}
.imgBlob {
    border-color: #02d2fe solid 2px;
}
.description p {
    /* background: #f1cece; */
    color: #d47575;
    padding: 10px;
    margin: 8px;
}
h3 {
    cursor: pointer;
}
h4 {
    color: #4e5166;
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
    opacity: 0.8;
    border-bottom: 1px dotted #4e5166;
    color: #4e5166;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.face_5 {
    font-size: 44px;
    margin-right: 10px;
    color: #4e5166;
    cursor: pointer;
}
</style>
