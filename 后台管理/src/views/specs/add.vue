<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加规格' : '修改规格'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="specsname"
          label="规格名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性:"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inputW"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttr(item)" type="danger"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      arrAttr: [ //定义一个规格属性数组
        {
          value: "",
        },
      ],

      form: {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      },

      formLabelWidth: "120px",

      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
    };
  },

  props: ["addInfo"],
  methods: {
    addAttr() {
      if (this.arrAttr.length <= 6) {
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6项！！！");
      }
    },
    delAttr(item) {
      var index = this.arrAttr.indexOf(item);
      if (index !== -1) {
        this.arrAttr.splice(index, 1);
      }
    },
    reset() {
      this.form = {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      };
      //初始化动态循环表单
      this.arrAttr = [
        {
          value: "",
        },
      ];
    },

    cancel() {
      //点击取消修改父组件弹框事件
      this.$emit("cancel", false);

      this.reset();
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      getCountAction: "specs/getCountAction",
      getpageActon:'specs/changePageAction',
    }),
    add() {
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      getSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getCountAction(),
          this.getpageActon(),
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    look(id) {
      //调取查看接口
      getSpecsInfo({ id }).then((res) => {
        console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          //对数据进行二次修改
          let data = res.data.list[0];
          this.form = data;
          data.attrs.map((item, index) => {
            if (index == 0) {
              //如果索引是0 就强制匹配第一项
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value: item,
              });
            }
          });
        }
      });
    },
    update() {
      //调取添加接口
      getSpecsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getCountAction();
          this.cancel(); //关闭弹框
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
/* 改变默认input框宽度 */
.inputW {
  width: 60%;
}
</style>
