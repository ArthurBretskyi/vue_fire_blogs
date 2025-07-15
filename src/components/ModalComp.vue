<template>
    <div class="modal">
        <div class="modal-content">
            <p>{{ this.modalMessage }}</p>
            <button class="close-btn" @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalComp',
    props: ['modalMessage'],
    methods: {
        closeModal() {
            this.$emit('close-modal')
        },
    },
}
</script>

<style lang="scss" scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 101;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background-color: rgba(0, 0, 0, 0.7);

    .modal-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 10px;
        align-items: center;
        padding: 30px 40px;
        border-radius: 8px;
        width: 350px;
        background-color: #fff;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);


        p {
            text-align: center;
        }

        .close-btn {
            display: flex;
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
}
</style>