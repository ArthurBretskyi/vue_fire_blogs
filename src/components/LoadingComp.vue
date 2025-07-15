<template>
    <div class="loading">
        <span></span>
    </div>
</template>

<script>
export default {
    name: 'LoadingComp',
}
</script>

<style lang="scss" scoped>
.loading {
    position: fixed;
    top: 0;
    z-index: 101;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    @keyframes spin {
        to {
            transform: rotateZ(360deg);
        }
    }

    span {
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 3px solid transparent;
        border-top-color: #fff;
        border-bottom-color: #fff;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }
}
</style>
