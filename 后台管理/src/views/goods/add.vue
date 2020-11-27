<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品' : '修改商品'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
      @opened="createEditor"
    >
      <el-form ref="rules" :model="form" :rules="rules">
        <el-form-item
          prop="first_cateid"
          :label-width="formLabelWidth"
          label="一级分类"
        >
          <el-select v-model="form.first_cateid" @change="changeCate(false)">
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品分类的列表接口 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="second_cateid"
          :label-width="formLabelWidth"
          label="二级分类"
        >
          <el-select v-model="form.second_cateid">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="goodsname"
          label="商品名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="price"
          label="商品价格:"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="market_price"
          label="市场价格:"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="specsname"
          label="图片:"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item
          prop="specsid"
          :label-width="formLabelWidth"
          label="商品规格"
        >
          <el-select v-model="form.specsid" @change="changeSpecs(false)">
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品规格列表接口 -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="specsattr"
          :label-width="formLabelWidth"
          label="规格属性"
        >
          <!-- multiple	是否多选 -->
          <el-select v-model="form.specsattr" multiple>
            <el-option value label="请选择" disabled></el-option>
            <!-- 循环联动选择的规格 -->
            <el-option
              v-for="item in attrArr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述:" :label-width="formLabelWidth">
          <!-- 这个标签中插入富文本编辑器 -->
          <!-- <div id="editor"></div> -->
        </el-form-item>
      </el-form>
      <div slnpmot="footer" class="dialog-footer">
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
//引入辅助性函数
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
export default {
  data() {
    return {
      //表单对象
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: "", //是否新品
        ishot: "", //是否热卖推荐
        status: "", //状态1正常2禁用
      },
      editor: null, //定义一个编辑器变量
      //label宽度
      formLabelWidth: "120px",

      //规则验证
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //预览的图片地址
      dialogVisible: false, //是否打开弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      secondArr: [], //二级分类数组
      attrArr: [], //规格属性的数组
    };
  },
  mounted() {
    this.getSpecsList();
    this.getCateList();
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    //添加动态表单事件
    addAttr() {
      //最多添加6个
      if (this.arrAttr.length <= 6) {
        //往数组中添加数据
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6项！！！");
      }
    },
    changeCate(n) {
      /* 
      select是个双向数据绑定，点击切换的时候，可以发现你change事件默认的事件源 和你的双向数据绑定值是一样的，我想如果，这个change是个false，我就去清空二级分类的双向数据绑定值，否则我就不清空绑定，为什么不清空？当获取数据的时候，表单之所以有数据就是通过v-model双向数据绑定获得的
      */
      // console.log(this.form.first_cateid, "一级id");
      // n是当前选择的分类id
      //findIndex 查找条件匹配的索引
      let index = this.cateList.findIndex((item, i) => {
        // console.log(item, i, "每一项");
        return this.form.first_cateid == item.id;
      });
      // console.log(index, "索引");
      this.secondArr = this.cateList[index].children;
      console.log(this.secondArr, "二级分类数组");
      //进行联动判空。如果你选择了别的一级，那么清空上一次二级的选择值
      if (!n) {
        console.log("false进来");
        //清空联动二级的双向数据绑定
        this.form.second_cateid = "";
      }
    },
    changeSpecs(n) {
      //点击商品规格触发的change事件
      console.log(n, "specs,iddd");
      console.log(this.form.specsid, "this.form.specsid");
      let index = this.specsList.findIndex(
        (item) => this.form.specsid == item.id
      );
      this.attrArr = this.specsList[index].attrs;
      //清空二级联动信息
      if (!n) {
        this.form.specsattr = [];
      }
    }, //图片删除
    handleRemove(file, fileList) {},
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    onChange(file) {
      console.log(file, "文件");
      this.imgUrl = file.raw;
    },
    createEditor() {
      // console.log("富文本被创建");
      //先实例化富文本
      this.editor = new E("#editor");
      //调用富文本编辑器 create方法
      this.editor.create();
      //设置内容 设置表单描述信息参数
      this.editor.txt.html(this.form.description);
    },
    delAttr(item) {
      var index = this.arrAttr.indexOf(item);
      if (index !== -1) {
        this.arrAttr.splice(index, 1);
      }
    },
    //封装重置事件
    reset() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品 1是 2否
        ishot: 1, //是否热卖推荐1是 2否
        status: 1, //状态1正常2禁用
      };
      //图片列表清空
      this.fileList = [];
      //二级分类
      this.secondArr = [];
      //属性数组
      this.attrArr = [];
      //清空规则验证 当关闭弹框时，可以调取清空验证规则函数resetFields()
      //console.log( this.$refs.rules,' this.$refs.rules')
      this.$refs["rules"].resetFields();
    },
    //点击取消修改父组件弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置
      this.reset();
    },
    //调取行动
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      getCateList: "cate/getCateListAction",
      getGoodsList: "goods/getGoodsAction",
      getGoodsCount: "goods/getCountAction",
    }),
    //添加事件
    add() {
      //  let newArr= this.arrAttr.map(item=>{
      //     // console.log(item,'item')
      //     return item .value
      //   })
      // this.form.attrs = newArr.join(',')
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      // console.log(newArr,'newArr');
      // console.log(this.form, "表单信息");
      this.form.img = this.imgUrl;
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      //修改属性值
      // 调取添加接口
      getGoodsAdd(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getGoodsList();
          //重新调取总条数
          this.getGoodsCount();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个查看一条数据的方法
    look(id) {
      //调取查看接口
      getGoodsInfo({ id }).then((res) => {
        // console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          let data = res.data.list;
          this.form = data;
          this.form.id = id;
          this.fileList = this.form.img
            ? [{ url: this.$imgUrl + this.form.img }]
            : [];
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.join(",")
            : "";
          //重新调取change事件
          this.changeCate(true);
          //防止 规格属性概率问题
          this.changeSpecs(true);
        }
      });
    },
    //编辑确定事件
    update() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      //重新获取图片地址
      this.form.img = this.imgUrl;
      //把编辑器中的内容设置给我的描述参数
      this.form.description = this.editor.txt.html();
      console.log(this.form, "商品管理的表单信息");
      //因为有上传文件，所以不能是普通表单对象，要是formData
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      // console.log(this.form,'表单信息')
      //调取添加接口
      getGoodsEdit(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getGoodsList();
          //重新调取总条数
          this.getGoodsCount();
          //关闭弹框
          this.cancel();
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
  width: 70%;
}
</style>
