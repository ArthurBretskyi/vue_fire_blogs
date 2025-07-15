<template>
    <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" :to="{ name: 'Register' }">Register for VueFireBlogs <font-awesome-icon
                class="arrow" :icon="['fas', 'arrow-right']" /></router-link>
    </div>
</template>

<script>
export default {
    name: 'RegisterReminder',
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    padding: 100px 25px;
    justify-content: center;
    align-items: center;
    column-gap: 50px;

    @media (max-width: 800px) {
        padding: 60px 25px;
        flex-direction: column;
        gap: 30px;
    }

    h2 {
        text-transform: uppercase;
        max-width: 400px;
        font-weight: 500;
        font-size: 36px;

        @media (max-width: 800px) {
            text-align: center;
        }

        @media (max-width: 400px) {
            font-weight: 400;
            font-size: 24px;
        }
    }

    .router-button {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #303030;
        color: #fff;
        text-decoration: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.5s ease;

        &:hover {
            background-color: #464545;
        }

        .arrow {
            color: #fff;
        }
    }
}
</style>
