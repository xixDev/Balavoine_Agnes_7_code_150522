<template>
    <form class="form-like" @submit.prevent="rateBlob">
        <nav class="filter-like">
            <h4>Donnez votre avis :</h4>
            <button
                @click="
                    toggleLike();
                    updateFilter('jaime');
                "
                :class="{ active: liked }"
            >
                <span class="material-icons thumb_up"> thumb_up</span></button
            >{{ likesComputed }}
        </nav>
    </form>
</template>

<script>
const API_URL = 'http://localhost:3000/api/blobs/';

export default {
    name: 'FilterLike',
    props: ['blob', 'currentLike'],
    data() {
        return {
            likeRate: null,
            userId: this.$store.state.user.userId,
            likes: this.likes,
            usersLiked: this.usersLiked,
            liked: false,
            active: false,
            uriLike: API_URL + this.blob.id + '/like',
        };
    },
    methods: {
        updateFilter(by) {
            this.$emit('filterChange', by);
        },
        //-----------------------------------------
        toggleLike: function () {
            this.active = !this.active;
            this.liked = !this.liked;
            this.currentLike === 'jaime';
        },
        //-----------------------------------------
        rateBlob() {
            let userId = this.$store.state.user.userId;
            userId = String(userId);
            let likeRate = this.likeRate;
            //-----------------------------------------
            // LIKE like = 0
            //-----------------------------------------
            const searchUser = this.blob.usersLiked.includes(userId);
            if (this.currentLike === 'jaime' && searchUser === true) {
                likeRate = parseFloat(likeRate);
                likeRate = 0;
                console.log(`likeRate PLUS 0 : ${likeRate}`);

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

                //
                this.blob.likes = this.blob.likes - 1;
                //------------------
                // LIKE like = 1)
                //-------------------
            } else if (this.currentLike === 'jaime' && searchUser === false) {
                likeRate = parseFloat(likeRate);
                likeRate = 0;

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
                this.blob.likes = this.blob.likes + 1;
            }
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
    },
};
</script>

<style>
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

.activeClass {
    background-color: #1c68a7;
    color: green;
}

.filter-like {
    color: #fd2d01;
    /* background-color: #eeeeeb; */
    border-radius: 20px;
    margin: 0 auto;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 240px;
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
