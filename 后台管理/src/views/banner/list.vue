<template>
  <div>
    <el-table :data="bannerList" border style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图名称"></el-table-column>

      <el-table-column prop label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+ item.row.img" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="70">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="item">
          <div>
            <el-button type="info" plain @click="edit(item.row.id)">编辑</el-button>
            <el-button @click="del(item.row.id)" type="danger" plain>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//引入封装好的接口
import { getBannerDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/getBannerList",
    }),
  },
  mounted() {
    //组件一加载触发行动
    //调取规格列表
    this.getBannerAction();
  },
  methods: {
    //获取行动
    ...mapActions({
      getBannerAction: "banner/getBannerListAction",
    }),
    //封装一个删除事件
    del(id) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getBannerDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getBannerAction();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    edit(id) {
      //编辑传id
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="" scoped>
</style>
