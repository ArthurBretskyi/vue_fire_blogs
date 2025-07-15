<template>
    <div>
        <div class="profile">
            <modal-comp v-if="modalActive" :modalMessage="modalMessage" @click="closeModal" />
            <div class="container">
                <h2>Account Settings</h2>
                <div class="profile-info">
                    <div class="initials">{{ this.$store.state.profileInitials }}</div>
                    <div class="admin-badge">
                        <font-awesome-icon :icon="['fas', 'user-tie']" class="icon" />
                        <span>admin</span>
                    </div>
                    <div class="input">
                        <label for="firstName">First Name:
                            <input type="text" id="firstName" v-model="firstName">
                        </label>
                    </div>
                    <div class="input">
                        <label for="lastName">Last Name:
                            <input type="text" id="lastName" v-model="lastName">
                        </label>
                    </div>
                    <div class="input">
                        <label for="userName">User Name:
                            <input type="text" id="userName" v-model="userName">
                        </label>
                    </div>
                    <div class="input">
                        <label for="email">Email:
                            <input disabled type="email" id="email" v-model="email">
                        </label>
                    </div>
                    <button @click="updateProfile" class="profile-btn">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModalComp from '@/components/ModalComp.vue';
export default {
    name: "ProfileView",
    components: {
        ModalComp,
    },
    data() {
        return {
            modalMessage: "Changes were saved!",
            modalActive: null,
            // firstName: null,
            // lastName: null,
            // userName: null,
            // email: null,
        }
    },
    methods: {
        closeModal() {
            this.modalActive = !this.modalActive
        },
        updateProfile() {
            this.$store.dispatch("updateUserSettings")
            this.modalActive = !this.modalActive
        }
    },
    computed: {
        firstName: {
            get() {
                return this.$store.state.profileFirstName
            },
            set(newValue) {
                this.$store.commit("changeFirstName", newValue)
            }
        },
        lastName: {
            get() {
                return this.$store.state.profileLastName
            },
            set(newValue) {
                this.$store.commit("changeLastName", newValue)
            }
        },
        userName: {
            get() {
                return this.$store.state.profileUserName
            },
            set(newValue) {
                this.$store.commit("changeUserName", newValue)
            }
        },
        email() {
            return this.$store.state.profileEmail
        }
    },
}
</script>

<style lang="scss" scoped>
.profile {


    .container {
        max-width: 1000px;
        padding: 60px 25px;


        h2 {
            text-align: center;
            font-size: 32px;
            font-weight: 300;
            margin-block-end: 16px;
        }

        .profile-info {
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.6);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;
        }

        .initials {
            position: initial;
            font-size: 32px;
            display: flex;
            align-items: center;
            align-self: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            color: #fff;
            background-color: #303030;
            cursor: pointer;
            border-radius: 50%;
        }

        .admin-badge {
            display: flex;
            align-self: center;
            color: #fff;
            font-size: 14px;
            padding: 8px 24px;
            border-radius: 8px;
            background-color: #303030;
            margin-block-start: 16px;
            margin-block-end: 16px;
            text-align: center;
            text-transform: capitalize;
        }

        .icon {
            width: 14px;
            height: auto;
            margin-inline-end: 8px;
        }

    }

    .input {
        margin-block-start: 16px;
        margin-block-end: 16px;


        label {
            font-size: 14px;
            display: block;
            padding-bottom: 6px;
        }

        input {
            width: 100%;
            border: none;
            background-color: #f2f7f6;
            padding: 8px;
            height: 50px;
            margin-block-start: 8px;

            @media(min-width: 900px) {}

            &:focus {
                outline: none;
            }

        }

    }

    .profile-btn {
        display: flex;
        align-self: center;
        align-items: center;
        padding: 10px;
        background-color: #303030;
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.5s ease;

        &:hover {
            background-color: #464545;
        }
    }
}
</style>