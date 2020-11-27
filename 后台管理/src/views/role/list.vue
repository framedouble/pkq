<template>
  <div>
    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status=='1'">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getRoledelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      rolelist: "role/getRolelist", //获取菜单列表
    }),
  },
  mounted() {
    this.getroleListAction();
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("此操作将永久删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getRoledelete({id}).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getroleListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
          /*  this.$message({
            type: "success",
            message: "删除成功!",
          }); */
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    ...mapActions({
      getroleListAction: "role/getRolelistAction",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
