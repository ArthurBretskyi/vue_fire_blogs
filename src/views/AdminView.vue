<template>
    <div v-if="$store.state.profileRole === 'admin'" class="admin">
        <div class="container">
            <h2>👑 Administration</h2>
            <div class="admin-info">
                <h2>Add Admin</h2>
                <div class="input">
                    <input type="text" placeholder="Enter user email to make them an admin" id="addAdmin"
                        v-model.trim="adminEmail">
                </div>
                <button @click="addAdmin" class="admin-btn">Submit</button>
                <p v-if="message" :class="{ 'text-green': ok, 'text-red': !ok }">
                    {{ message }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminView",
    data() {
        return {
            adminEmail: null,
            message: '',
            ok: true,
        }
    },
    methods: {
        async addAdmin() {
            if (!this.adminEmail) return;

            try {
                const email = await this.$store.dispatch('makeAdmin', this.adminEmail);
                this.ok = true;
                this.message = `✅ ${email} тепер адміністратор`;
                this.adminEmail = '';
            } catch (e) {
                this.ok = false;
                this.message = `❌ ${e.message}`;
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.admin {
    .container {
        max-width: 1000px;
        padding: 60px 25px;

        h2 {
            text-align: center;
            font-size: 32px;
            font-weight: 300;
            margin-block-end: 16px;
        }

        .admin-info {
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.6);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;
        }

        .input {
            margin-block-start: 16px;
            margin-block-end: 16px;

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
    }

    .admin-btn {
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

    .text-green {
        color: #16a34a;
    }

    .text-red {
        color: #dc2626;
    }

}</style>