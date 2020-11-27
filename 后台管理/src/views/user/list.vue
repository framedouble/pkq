<template>
  <div>
    <el-table :data="Userlist" border style="width: 100%">
      <el-table-column
        prop="uid"
        label="用户编号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="rolename"
        label="所属角色"
        width="180"
      ></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status == '1'">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.uid)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="Usersize"
      background
      layout="prev, pager, next"
      @current-change="change"
      :total="Usercount"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getRoledelete, getUserdelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      Userlist: "user/getUserlist", //获取菜单列表
      Usercount: "user/getUsercount",
      Usersize: "user/getUsersize",
    }),
  },
  mounted() {
    this.getUserAction();
  },
  methods: {
    ...mapActions({
      getUserAction: "user/getUserlistAction",
      getCountAction: "user/getCountAction",
      getPageAction: "user/getPageAction",
    }),
    del(uid) {
      this.$confirm("此操作将永久删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getUserdelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.getCountAction();
              this.getPageAction();
              this.getUserAction();
              this.$message.success(res.data.msg);
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
    edit(uid) {
      this.$emit("edit", uid);
    },
    change(e) {
      this.getPageAction(e);
    },
  },
};
</script>

<style  lang="" scoped>
.el-pagination {
  position: absolute;
  right: 0;
  top: 70vh;
}
</style>
