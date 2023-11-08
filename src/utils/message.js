

export function tipSmsg(code,message) {

if(code === 200){
    this.$message({
        showClose: true,
        message: message,
        type:'success'
    })
}else if(code === 500){
    this.$message({
        showClose: true,
        message: message,
        type: 'error'
    })
} else if(code === 404){
    this.$message({
        showClose: true,
        message: message,
        type: 'error'
    })
}else{
    this.$message({
        showClose: true,
        message: "响应失败",
        type: 'error'
    })
}


}