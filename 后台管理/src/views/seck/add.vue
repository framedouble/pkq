<template>
  <div>
    <el-dialog
      :title="addInfo.isadd ? '添加秒杀管理' : '修改秒杀管理'"
      :visible.sync="addInfo.isshow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="title"
          label="秒杀管理名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeCate()">
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品分类的列表接口 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="二级分类">
          <el-select v-model="form.second_cateid" @change="changeGoods()">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品">
          <el-select v-model="form.goodsid">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isadd" @click="add" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import {
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
  getGoodsList,
} from "../../util/axios";
export default {
  data() {
    return {
      form: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入秒杀管理名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
      timer: "", //日期
      secondArr: [],
      goodsArr: [],
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.getCateAction();
      this.getSeckListAction();
    }
  },
  methods: {
    changeCate(n) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondArr = this.cateList[index].children;
      //清空二级双向数据绑定还要清空三级
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    reset() {
      this.form = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
    },
    changeGoods(n) {
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodsArr = res.data.list;
        if (!n) {
          this.from.goodsid = "";
        }
      });
    },
    look(id) {
      getSeckInfo({
        id,
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.form = res.data.list;
          this.form.id = id;
          this.timer = [
            new Date(parseFloat(this.form.begintime)),
            new Date(parseFloat(this.form.endtime)),
          ];
          this.changeCate(true);
          this.changeGoods(true);
        }
      });
    },

    add() {
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
      getSeckAdd(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSeckListAction();
          this.cancel();
          // console.log(this.form)
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update() {
      //編輯
      // console.log(this.form.menus);
      getSeckEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSeckListAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getCateAction: "cate/getCateListAction",
      getSeckListAction: "seck/getSeckListAction",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
