<template>
    <div top-container>
        <div label="机器人录入">
            <br />
            <el-upload class="upload-demo" action="#" :on-change="handleFileChange" :show-file-list="false"
                :before-upload="beforeUpload">
                <el-button slot="trigger" size="small" type="primary">机器人导入</el-button>
            </el-upload>
            <div v-if="fileData.length > 0">
                <h3>文件预览：</h3>
                <el-table :data="fileData" style="width: 100%">
                    <el-table-column v-for="header in fileHeaders" :key="header" :label="header" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row[header] }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="importFile">导入数据</el-button>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
  
<script>
import { importData } from "@/api/game/robot";
export default {
    data() {
        return {
            fileData: [],
            fileHeaders: [],
            robotData: {},
            robot: 
                {
                //  * --机器人初始金币区间
                "initScore": { "minScore": 50000, "maxScore": 200000000 },
                //  * --机器人下注区间
                 "betScore": { "minScore": 10000, "maxScore": 5000000 },
                //  * --机器人携带金币区间(存取区间: 低于最小值存, 高于最大值取)
                 "carryScore": { "minScore": 10000, "maxScore": 5000000000 },
                //  * --机器人下注时间区间(毫秒)
                 "betTime": { "min": 500, "max": 29000 },
                //  * --机器人下注概率(万分比)
                 "betRatio": 10000
                }
};
    },
methods: {
    handleFileChange(file, fileList) {
        if (file.raw) {
            const reader = new FileReader();
            reader.onload = e => {
                const content = e.target.result;
                this.parseCSV(content);
            };
            reader.readAsText(file.raw);
        }
    },
    beforeUpload(file) {
        const fileType = file.name.split('.').pop();
        if (fileType !== 'csv') {
            this.$message.error('只能上传 csv 文件');
            return false;
        }
        return true;
    },
    parseCSV(content) {
        const rows = content.split('\n').map(row => row.split(','));
        this.fileHeaders = rows[0];
        this.fileData = rows.slice(1).map(row => {
            const rowData = {};
            this.fileHeaders.forEach((header, index) => {
                rowData[header] = row[index];
            });
            return rowData;
        });
    },
    importFile() {
        importData(this.fileData).then((response) => {

            this.$message.success('导入成功')
        }
        ).catch(error => {
            this.$message.error('导入失败');
        });
    },
    getRobot(){
        getRobotData().then(response => {
            this.robotData = response.rows;
        })
    }

}
}

</script>
<style>
.top-container {
    width: 90%;
    /* 设置容器宽度为屏幕宽度的90% */
    max-width: 600px;
    /* 设置最大宽度，避免在大屏幕上过度拉伸 */
    margin: 0 auto;
    /* 水平居中 */
    padding: 20px;
    /* 设置内边距 */

    border: 2px solid #000;
    /* 添加边框线 */
    border-radius: 10px;
    /* 添加圆角边框 */

    box-sizing: border-box;
    /* 盒模型设置为边框模型，确保边框不会增加容器的实际尺寸 */

    /* 使用媒体查询来针对不同屏幕尺寸设置不同的样式 */
    @media (max-width: 768px) {
        width: 100%;
        /* 在小屏幕上，容器宽度设为100% */
        border-width: 1px;
        /* 在小屏幕上，边框线变细 */
        border-radius: 0;
        /* 在小屏幕上，去掉圆角以适配屏幕 */
    }
}
</style>