<template>
    <form @submit.prevent="handleSubmit">
        <h3 v-if="mode == 'login'">Se connecter</h3>
        <h3 v-else>Inscription</h3>
        <p class="info" v-if="mode == 'login'">
            Vous n'avez pas encore de compte ?
            <span class="card__action" @click="switchToCreateAccount()"
                >Créer un compte</span
            >
        </p>

        <p class="info" v-else>
            Vous avez déjà un compte ?
            <span class="card__action" @click="switchToLogin()"
                >Se connecter</span
            >
        </p>
        <div>
            <label>Email :</label>
            <input v-model="email" class="form-row__input" type="text" />
        </div>
        <div v-if="mode == 'create'">
            <label>Pseudo :</label>
            <input v-model="pseudo" class="form-row__input" type="text" />
        </div>
        <div>
            <label>Password :</label>
            <input v-model="password" class="form-row__input" type="password" />
        </div>
        <div class="error" v-if="mode == 'login' && status == 'error_login'">
            Adresse mail et/ou mot de passe invalide
        </div>
        <div class="error" v-if="mode == 'create' && status == 'error_create'">
            Adresse mail déjà utilisée
        </div>
        <div>
            <button
                @click="login()"
                class="button"
                :class="{ 'button--disabled': !validatedFields }"
                v-if="mode == 'login'"
            >
                <span v-if="status == 'loading'">Connexion en cours...</span>
                <span v-else>Connexion</span>
            </button>
            <button
                @click="createAccount()"
                class="button"
                :class="{ 'button--disabled': !validatedFields }"
                v-else
            >
                <span v-if="status == 'loading'">Création en cours...</span>
                <span v-else>Créer mon compte</span>
            </button>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Login',
    data: function () {
        return {
            mode: 'login',
            // email: '',
            // pseudo: '',
            // password: '',
            email: null,
            pseudo: null,
            password: null,
        };
    },
    mounted: function () {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/dashboard');
            return;
        }
    },
    computed: {
        validatedFields: function () {
            if (this.mode == 'create') {
                if (
                    this.email != '' &&
                    this.pseudo != '' &&
                    this.password != ''
                ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (this.email != '' && this.password != '') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        ...mapState(['status']),
    },
    methods: {
        switchToCreateAccount: function () {
            this.mode = 'create';
        },
        switchToLogin: function () {
            this.mode = 'login';
        },
        login: function () {
            const self = this;
            this.$store
                .dispatch('login', {
                    email: this.email,
                    password: this.password,
                })
                .then(
                    function () {
                        self.$router.push('/dashboard');
                    },
                    function (error) {
                        console.log(error);
                        // ajouter route error
                    }
                );
        },
        createAccount: function () {
            const self = this;
            console.log(this.email, this.pseudo, this.password);
            this.$store
                .dispatch('createAccount', {
                    email: this.email,
                    pseudo: this.pseudo,
                    password: this.password,
                })
                .then(
                    function () {
                        self.login();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        },
    },
};
</script>

<style scoped>
.card__action {
    color: #fd2d01;
    font-weight: bold;
    padding-left: 8px;
    text-decoration: underline;
}

.card__action:hover {
    cursor: pointer;
}

.button--disabled {
    background: #ffd7d7;
    color: #ececec;
}
.button--disabled:hover {
    cursor: not-allowed;
    background: #ffd7d7;
}
.error {
    color: #fd2d01;
    margin-top: 12px;
    font-size: 0.9em;
    font-weight: bold;
}
</style>
