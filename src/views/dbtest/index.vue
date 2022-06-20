<script lang="ts" setup>
import {ref} from 'vue'
import IndexDB from "~/indexDB";

const db = new IndexDB('testDB')
db.openDB(1, 'id', ['user', 'course'])
const updateData = (storeName: string, data: any)=>{
  console.log(data);

  db.update(storeName,data)
}
const deleteData = (storeName:string, id: string|number)=>{
  db.delete(storeName, id)
}
const getData = (storeName:string)=>{
  db.get(storeName)
}
const getItemdata = (storeName:string, id: string|number)=>{
  db.getItem(storeName, id)
}
const newdata =
   {
    user: 123,
    course: {name: '英语', count: 12}
  }
const putdata =
   {
    id: 1,
    user: 456,
    course: {name: '英语', count: 12}
  }
</script>

<template>
  <div>
    <el-button type="primary" @click="updateData('demo', newdata)">添加用户</el-button>
    <el-button type="warning" @click="deleteData('demo', 1)">删除用户</el-button>
    <el-button type="success" @click="getData('demo')">查询用户</el-button>
    <el-button @click="updateData('demo', putdata)">修改用户</el-button>
    <el-button @click="getItemdata('demo', 2)">查询特定用户</el-button>

  </div>
</template>

<style lang="scss" scoped>

</style>
