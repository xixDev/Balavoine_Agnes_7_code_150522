<template>
    <form class="form-like" @submit.prevent="rateBlob">
        <nav class="filter-like">
            <h4>Donnez votre avis :</h4>
            <button
                @click="
                    toggleLike();
                    updateFilter('jaimepas');
                "
                :class="{ active: liked }"
                :disabled="validated ? 'submitted' : disabled"
            >
                <span class="material-icons thumb_up"> thumb_up</span>
            </button>
            <h4>{{ likesComputed }}</h4>
            <div v-for="userLiked in filteredUser">
                <ul>
                    <li>** {{ userLiked }} **</li>
                </ul>
            </div>
        </nav>
    </form>
</template>

<script>
const API_URL = 'http://localhost:3000/api/blobs/';

export default {
    name: 'FilterLike',
    props: ['blob', 'currentLike', 'likeRate'],
    data() {
        return {
            userId: this.$store.state.user.userId,
            likes: this.likes,
            liked: false,
            submitted: true,
            disabled: false,
            validated: false,
            uriLike: API_URL + this.blob.id + '/like',
        };
    },

    methods: {
        updateFilter(by) {
            this.$emit('filterChange', by);
        },
        toggleLike: function () {
            if (this.liked) {
                this.blob.likes = this.blob.likes - 1;
                this.unlikeBlob();
            } else {
                this.blob.likes = this.blob.likes + 1;
                this.likeBlob();
            }
        },
        likeBlob: function () {
            this.submitted = true;
            console.log('likeBlob lIKERATE: 1');
            this.liked = true;

            //fetch backend
            let userId = String(this.$store.state.user.userId);
            let likeRate = this.likeRate;

            //-----------------------------------------
            // LIKE like = 0
            //-----------------------------------------
            const searchUser = this.blob.usersLiked.includes(userId);
            if (searchUser === true) {
                likeRate = String(likeRate);
                likeRate = 0;
                //console.log(`likeRate PLUS 0 : ${likeRate}`);

                // fetch LIKE, userId
                fetch(this.uriLike, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.$store.state.user.token}`,
                    },
                    body: JSON.stringify({ likeRate, userId }),
                })
                    .then(() => {
                        console.log(likeRate);
                        console.log(userId);
                        console.log('***************');
                    })
                    .catch((err) => console.log(err));

                //this.blob.likes = this.blob.likes - 1;

                //------------------
                // LIKE like = 1)
                //-------------------
            } else {
                likeRate = parseFloat(likeRate);
                likeRate = 1;

                // fetch
                fetch(this.uriLike, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.$store.state.user.token}`,
                    },
                    body: JSON.stringify({ likeRate, userId }),
                })
                    .then(() => {
                        console.log(likeRate);
                        console.log(userId);
                        console.log('***************');
                    })
                    .catch((err) => console.log(err));
                // front
                //this.blob.likes = this.blob.likes + 1;
            }
            // front
            this.liked = true;
            this.submitted = false;
        },
        //-----------------------------------------
        // UNLIKE j'aime plus ce blob
        //-----------------------------------------
        unlikeBlob: function () {
            this.submitted = true;
            console.log('unlikeBlob lIKERATE: 0');

            //fetch backend
            let userId = String(this.$store.state.user.userId);
            let likeRate = this.likeRate;

            //-----------------------------------------
            // LIKE like = 0
            //-----------------------------------------
            const searchUser = this.blob.usersLiked.includes(userId);
            if (searchUser === true) {
                likeRate = String(likeRate);
                likeRate = 0;

                // fetch LIKE, userId
                fetch(this.uriLike, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.$store.state.user.token}`,
                    },
                    body: JSON.stringify({ likeRate, userId }),
                })
                    .then(() => {
                        console.log(likeRate);
                        console.log(userId);
                        console.log('***************');
                    })
                    .catch((err) => console.log(err));

                //this.blob.likes = this.blob.likes - 1;
            }
            // front
            this.liked = false;
            this.submitted = false;
        },
        //-----------------------------------------
        // UNLIKE j'aime plus ce blob
        //-----------------------------------------
        rateBlob: function () {
            console.log('submit ???');
        },
        antiDoublon: function () {
            //supprime doublons
            let usersLiked = blob.usersLiked;
            let filteredUsers = usersLiked.filter(
                (userLike) => userLike !== userId
            );
            blob.usersLiked = filteredUsers;
        },
    },
    computed: {
        //
        likesComputed: function () {
            return this.blob.likes;
        },
        usersLikedComputed: function () {
            return this.blob.usersLiked;
        },
        filteredUser() {
            // let blob.usersLiked
            let userId = String(this.$store.state.user.userId);
            const searchUser = this.blob.usersLiked.includes(userId);
            if (searchUser === false) {
                this.currentLike === 'jaimepas';
                this.liked = false;
            } else {
                //this.currentLike === 'jaime';
                this.liked = true;
            }
        },
    },
};
</script>

<style>
ul,
li {
    display: inline;
    list-style: none;
}
ul {
    text-indent: 40px;
    word-spacing: 0.2em;
    color: rgb(216, 45, 182);
    font-size: 14px;
    margin: 0;
    padding: 0;
}
form.form-like {
    margin-top: -20px;
    padding-top: 0px;
    background-image: linear-gradient(62deg, #ffd7d7 0%, #eeeeeb 100%);
    border-radius: 0 0 20px 20px;
    opacity: 90%;
    border-top: 2px solid #fff;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.05),
        -3px -3px 6px rgba(136, 134, 134, 0.05);
    border-left: 0px solid #cae2e7;
}

.activeClassLike {
    background-color: #1c68a7;
    color: green;
}
.activeClassDislike {
    background-color: #97a71c;
    color: rgb(239, 11, 136);
}

.filter-like {
    color: #fd2d01;
    border-radius: 20px;
    margin: 0 auto;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 220px;
    font-weight: bold;
}
.filter-like button {
    background: none;
    border: none;
    color: #f0b6b6;
    outline: none;
}
.filter-like button.active {
    color: #fd2d01;
}

.filter-like button.active .thumb_down,
.filter-like button.active .thumb_up {
    color: #fd2d01;
}

.thumb_down,
.thumb_up {
    font-size: 24px;
    margin-right: 10px;
    color: #f0b6b6;
    cursor: pointer;
}
</style>
