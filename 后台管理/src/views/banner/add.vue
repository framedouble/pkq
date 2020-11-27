<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
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
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 可以使用active-color属性与inactive-color属性来设置开关的背景色。 -->
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
        <el-button
          v-if="addInfo.isAdd"
          @click="add('formDialog')"
          type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update('formDialog')" type="primary"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
export default {
  data() {
    return {
      //表单对象
      form: {
        title: "", //轮播图标题
        img: "",
        status: 1,
      },

      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入轮播图标题", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
    };
  },
  mounted() {},
  props: ["addInfo"],
  methods: {
    //onChange 当图片上传时触发的文件
    onChange(file) {
      this.imgUrl = file.raw; //raw里面含有图片的上传时间，大小等数据
    },
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onRemove(file, fileList) {}, //图片移除
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      ); //上传限制
    },
    //封装重置事件
    reset() {
      this.form = {
        title: "", //轮播图标题
        img: "",
        status: 1,
      };
      this.fileList = [];
    },
    //点击取消修改父组件弹框事件
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },

    ...mapActions({
      getBannertAction: "banner/getBannerListAction",
    }),
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //如果你新传了图片 this.imgUrl有值。就赋值给this.imgUrl。如果没有新添加的图片就用上一次的图片
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          getBannerEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannertAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form, "表单提交");
          //FormData
          let data = this.form;
          let file = new FormData();
          //通过append 去添加它的属性
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgUrl);
          getBannerAdd(file).then((res) => {
            console.log(res, "添加响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannertAction();
            } else {
              // this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    look(id) {
      getBannerInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          // console.log(res, "lklkl");
          this.form = res.data.list;
          this.form.id = id;
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
