<template>
    <div>
        <button @click="refreshData">点击刷新数据</button>
        <div v-for="item in dataList" :key="item.id">
            {{ item.name }}
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            dataList: []
        };
    },
    methods: {
        fetchData() {
            // 发起数据请求的逻辑，可以是使用 axios 或其他方式
            // 假设请求成功后会得到 newDataList
            const newDataList = /* ... */
            this.dataList = newDataList;  // 更新数据列表
        },
        refreshData() {
            this.fetchData();  // 在点击按钮时调用该方法来刷新数据
        }
    },
    mounted() {
        this.fetchData();  // 页面加载时就获取数据
    }
};
</script>
  