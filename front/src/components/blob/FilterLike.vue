<template>
    <form @submit.prevent="rateBlob">
        <nav class="filter-like">
            <button
                @click-once="updateFilter('jaime')"
                :class="{ active: currentLike === 'jaime' }"
            >
                <span class="material-icons thumb_up"> thumb_up</span>
            </button>
            {{ likesComputed }}
            <button
                @click-once="updateFilter('jaimepas')"
                :class="{ active: currentLike === 'jaimepas' }"
            >
                <span class="material-icons thumb_down"> thumb_down</span>
            </button>
            {{ dislikesComputed }}
        </nav>
        <!-- <div>
            <h4>likeRate : {{ likeRate }}</h4>
            <h4>Blob ID : {{ blob.id }}</h4>
            <h4>dislikes : {{ blob.dislikes }}</h4>
            <h4>userDisliked : {{ blob.usersDisliked }}</h4>

            <h4>Likes : {{ blob.likes }}</h4>
            <h4>userLiked : {{ blob.usersLiked }}</h4>
        </div> -->
    </form>
</template>

<script>
//v-on:click.stop="toogleLike"
const API_URL = 'http://localhost:3000/api/blobs/';

export default {
    name: 'FilterLike',
    //props: ['currentLike', 'blob'],
    props: ['blob', 'currentLike'],
    data() {
        // like: 0;
        return {
            likeRate: null,
            userId: this.$store.state.user.userId,
            //disabled: 0,
            //likes: '',
            //dislikes: '',
            likes: this.blob.likes,
            dislikes: this.blob.dislikes,
            //active: false,
            // isActive: true,
            uriLike: API_URL + this.blob.id + '/like',
        };
    },
    methods: {
        updateFilter(by) {
            this.$emit('filterChange', by);
        },

        toggleHand() {
            this.active = !this.active;
        },
        //******************** */
        //
        rateBlob() {
            let userId = this.$store.state.user.userId;
            userId = String(userId);
            let likeRate = this.likeRate;
            //----------------------------------------------------------------------------------------
            // LIKE like = 0
            //----------------------------------------------------------------------------------------
            if (this.currentLike === 'jaime') {
                if (this.blob.usersLiked.includes(userId)) {
                    console.log('J aime ou je n aime pas DEJA ce blob');
                    console.log('LikeRate: send 0');
                    likeRate = 0;
                    // desactiver bouton ?

                    // enlever le doublon
                    // let usersLiked = blob.usersLiked;
                    // let filteredUsers = usersLiked.filter(
                    //     (userLike) => userLike !== userId
                    // );
                    // blob.usersLiked = filteredUsers;

                    // await ?
                    fetch(this.uriLike, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.$store.state.user.token}`,
                        },
                        body: JSON.stringify({ likeRate, userId }),
                    })
                        .then(() => {
                            console.log('likeRate 0 nothing');
                            console.log('***************');
                        })
                        .catch((err) => console.log(err));
                    //------------------
                    // LIKE like = 0
                    //-------------------
                } else if (this.blob.usersDisliked.includes(userId)) {
                    this.likeRate = 0;
                    //
                    // blob.dislikes -= 1;
                    // let usersDisliked = blob.usersDisliked;
                    // let filteredUsers = usersDisliked.filter(
                    //     (userDislike) => userDislike !== userId
                    // );
                    // blob.usersDisliked = filteredUsers;
                    // await ?
                    fetch(this.uriLike, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.$store.state.user.token}`,
                        },
                        body: JSON.stringify({ likeRate, userId }),
                    })
                        .then(() => {
                            console.log('likeRate 0 nothing');
                            console.log('***************');
                        })
                        .catch((err) => console.log(err));
                }
                //------------------
                // LIKE like = 1
                //-------------------
                else {
                    // likeRate =1
                    console.log('likeRate 1 JAIME');
                    likeRate = 1;
                    // chercher si userId est deja dans le tableau usersLiked
                    // sinon on le supprime et on fait likeRate = 0

                    // await ?
                    fetch(this.uriLike, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.$store.state.user.token}`,
                        },
                        body: JSON.stringify({ likeRate, userId }),
                    })
                        .then(() => {
                            console.log('LikeRate: send 1');
                            console.log('***************');
                        })
                        .catch((err) => console.log(err));
                }
            }

            //----------------------------------------------------------------------------------------
            // DISLIKE like = 0
            //----------------------------------------------------------------------------------------
            if (this.currentLike === 'jaimepas') {
                if (
                    this.blob.usersLiked.includes(userId) ||
                    this.blob.usersDisliked.includes(userId)
                ) {
                    console.log('J aime ou je n aime pas DEJA ce blob');
                    console.log('LikeRate: send 0');
                    likeRate = 0;
                    // desactiver bouton ?
                    // chercher si userId est deja dans le tableau usersLiked
                    // sinon on le suppime et on fait likeRate = 0
                    //blob.likes -= 1;

                    // enlever le doublon
                    // let usersLiked = blob.usersLiked;
                    // let filteredUsers = usersLiked.filter(
                    //     (userLike) => userLike !== userId
                    // );
                    // blob.usersLiked = filteredUsers;
                    //

                    // await ?

                    fetch(this.uriLike, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.$store.state.user.token}`,
                        },
                        body: JSON.stringify({ likeRate, userId }),
                    })
                        .then(() => {
                            console.log('likeRate 0 nothing');
                            console.log('***************');
                        })
                        .catch((err) => console.log(err));
                }
                //------------------
                // DISLIKE like = -1
                //-------------------
                else {
                    console.log('J aime pas ce blob');
                    console.log('LikeRate: send -1');
                    likeRate = -1;

                    fetch(this.uriLike, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.$store.state.user.token}`,
                        },
                        body: JSON.stringify({ likeRate, userId }),
                    })
                        .then(() => {
                            console.log('likeRate -1 send jaimepas');
                            console.log('***************');
                        })
                        .catch((err) => console.log(err));
                }
            }
        },
    },
    computed: {
        //
        likesComputed: function () {
            return this.blob.likes;
        },
        dislikesComputed: function () {
            return this.blob.dislikes;
        },
    },
};
</script>

<style>
.filter-like {
    border-top: 2px dotted #4e5166;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #ef8585;
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
