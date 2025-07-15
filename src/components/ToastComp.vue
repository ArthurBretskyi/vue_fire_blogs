<template>
    <div v-show="visible" class="toast">{{ message }}</div>
</template>
  
<script>
export default {
    name: 'ToastComp',
    data() {
        return {
            visible: false,
            message: '',
        }
    },
    methods: {
        show(msg = '✅ Збережено!') {
            this.message = msg
            this.visible = true
            setTimeout(() => {
                this.visible = false
            }, 3000)
        },
    },
}
</script>
  
<style scoped>
.toast {
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-weight: bold;
    z-index: 9999;
    opacity: 0.95;
}
</style>
  