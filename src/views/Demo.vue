<template>
  <div class="component">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="常用组件" name="0" class="common-items">
        <h3>常用按钮</h3>
        <el-row>
          <el-button type="primary" plain round>高亮按钮</el-button>
          <el-alert
            type="success"
            :closable="false"
            :description='`<el-button type="primary" plain round>高亮按钮</el-button>`'>
          </el-alert>
          <el-button type="primary" round>强调按钮</el-button>
          <el-alert
            type="success"
            :closable="false"
            :description='`<el-button type="primary" round>强调按钮</el-button>`'>
          </el-alert>
          <el-button type="cancel" size="medium" round shadow>取消按钮</el-button>
          <el-alert
            type="success"
            :closable="false"
            :description='`<el-button type="cancel" size="medium" round>取消按钮</el-button>`'>
          </el-alert>
          <el-button type="confirm" size="medium" round shadow>确认按钮</el-button>
          <el-alert
            type="success"
            :closable="false"
            :description='`<el-button type="confirm" size="medium" round>确认按钮</el-button>`'>
          </el-alert>
        </el-row>
        <h3>输入框</h3>
        <el-row>
          <el-input v-model="value" placeholder="常规输入框" style="width: 300px"></el-input>
          <el-alert
            type="success"
            :closable="false"
            :description='`<el-input v-model="value" placeholder="常规输入框" round></el-input>`'>
          </el-alert>
        </el-row>
        <el-row>
          <el-input v-model="value" placeholder="圆角输入框" round style="width: 300px">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-alert
            type="success"
            :closable="false"
            :description='`<el-input v-model="value" placeholder="圆角输入框" round><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input>`'>
          </el-alert>
        </el-row>  
        <el-row>
          <el-input v-model="value" placeholder="中号圆角输入框" size="medium" round style="width: 300px"></el-input>
          <el-alert
            type="success"
            :closable="false"
            :description='`<el-input v-model="value" placeholder="中号圆角输入框" size="medium" round></el-input>`'>
          </el-alert>
        </el-row>
        <h3>日期选择</h3>
        <el-row>
          <el-date-picker
            v-model="value"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-alert
            type="success"
            :closable="false"
            :description='`<el-date-picker
            v-model="value"
            type="date"
            placeholder="选择日期">
          </el-date-picker>`'>
          </el-alert>
        </el-row>
        <!-- <el-row>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row> -->
      </el-collapse-item>  
      <el-collapse-item title="Button 按钮" name="1">
        <el-alert
          show-icon
          title='提示：通常用中等型号按钮，即：size="medium"，高度为36px'
          type="warning"
          :closable="false">
        </el-alert>
        <h3>常规按钮</h3>
        <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
          <el-button size="medium">中等按钮</el-button>
          <el-button size="small">小型按钮</el-button>
          <el-button size="mini">超小按钮</el-button>
        </el-row>
        <el-row>
          <el-button plain>朴素按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="success" plain>成功按钮</el-button>
          <el-button type="info" plain>信息按钮</el-button>
          <el-button type="warning" plain>警告按钮</el-button>
          <el-button type="danger" plain>危险按钮</el-button>
          <el-button size="medium" plain>中等按钮</el-button>
          <el-button size="small" plain>小型按钮</el-button>
          <el-button size="mini" plain>超小按钮</el-button>
        </el-row>
        <el-row>
          <el-button round>圆角按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="success" round>成功按钮</el-button>
          <el-button type="info" round>信息按钮</el-button>
          <el-button type="warning" round>警告按钮</el-button>
          <el-button type="danger" round>危险按钮</el-button>
          <el-button size="medium" round>中等按钮</el-button>
          <el-button size="small" round>小型按钮</el-button>
          <el-button size="mini" round>超小按钮</el-button>
        </el-row>
        <el-row>
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button icon="el-icon-search" size="medium" circle></el-button>
          <el-button icon="el-icon-edit" size="small" circle></el-button>
          <el-button icon="el-icon-check" size="mini" circle></el-button>
        </el-row>

        <h3>禁用按钮</h3>
        <el-row>
          <el-button disabled>默认按钮</el-button>
          <el-button type="primary" disabled>主要按钮</el-button>
          <el-button type="success" disabled>成功按钮</el-button>
          <el-button type="info" disabled>信息按钮</el-button>
          <el-button type="warning" disabled>警告按钮</el-button>
          <el-button type="danger" disabled>危险按钮</el-button>
        </el-row>
        <el-row>
          <el-button plain disabled>朴素按钮</el-button>
          <el-button type="primary" plain disabled>主要按钮</el-button>
          <el-button type="success" plain disabled>成功按钮</el-button>
          <el-button type="info" plain disabled>信息按钮</el-button>
          <el-button type="warning" plain disabled>警告按钮</el-button>
          <el-button type="danger" plain disabled>危险按钮</el-button>
        </el-row>

        <h3>文字按钮</h3>
        <el-row>
          <el-button type="text">文字按钮</el-button>
          <el-button type="text" disabled>文字按钮</el-button>
        </el-row>

        <h3>图标按钮</h3>
        <el-row>
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
          <el-button type="primary" icon="el-icon-delete"></el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-row>

        <h3>按钮组</h3>
        <el-row>
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
            <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
        </el-row>

        <h3>加载中</h3>
        <el-row>
          <el-button type="primary" :loading="true">加载中</el-button>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Input 输入框" name="2" class="section-input">
        <el-alert
          show-icon
          title='提示：通常用中等型号输入框，即：size="medium"，高度为36px'
          type="warning"
          :closable="false">
        </el-alert>
        <h3>基础用法</h3>
        <el-row>
          <el-input v-model="input" placeholder="可清空输入框" clearable></el-input>
          <el-input
            placeholder="禁用状态输入框"
            v-model="input"
            :disabled="true">
          </el-input>
          <el-input  v-model="input" placeholder="密码输入框" show-password></el-input>
        </el-row>
        <h3>带 icon 的输入框</h3>
        <el-row>
          <el-input
            placeholder="请选择日期"
            suffix-icon="el-icon-date"
            v-model="input">
          </el-input>
          <el-input
            placeholder="请输入内容"
            v-model="input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-row>
        <h3>不同尺寸</h3>
        <el-row>
          <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-date"
            v-model="input">
          </el-input>
          <el-input
            size="medium"
            placeholder="请输入内容"
            suffix-icon="el-icon-date"
            v-model="input">
          </el-input>
          <el-input
            size="small"
            placeholder="请输入内容"
            suffix-icon="el-icon-date"
            v-model="input">
          </el-input>
          <el-input
            size="mini"
            placeholder="请输入内容"
            suffix-icon="el-icon-date"
            v-model="input">
          </el-input>
        </el-row>
        <h3>复合型输入框</h3>
        <el-row>
          <div class="long">
            <el-input placeholder="请输入内容" v-model="input">
              <template slot="prepend">Http://</template>
            </el-input>
          </div>
          <div class="long">
            <el-input placeholder="请输入内容" v-model="input">
              <template slot="append">.com</template>
            </el-input>
          </div>
          <div class="long">
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:120px;">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-row>
        <h3>文本域</h3>
        <el-row>
          <div class="long">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="input">
            </el-input>
          </div>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Select 选择器" name="3" class="section-input">
        <h3>常规选择器</h3>
        <el-row>
          <el-select v-model="value" clearable placeholder="可清空选择器">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" disabled placeholder="禁止状态选择器">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="list" multiple placeholder="可多选选择器">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <h3>Cascader 级联选择器</h3>
        <el-row>
          <el-cascader v-model="value" :options="options1"></el-cascader>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="DatePicker/TimePicker 日期/时间选择器" name="4" class="section-input">
        <h3>日期选择器</h3>
        <el-row>
          <el-date-picker
            v-model="value"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-row>
        <h3>时间选择器</h3>
        <el-row>
          <el-time-select
            v-model="value"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            placeholder="选择时间">
          </el-time-select>
          <el-time-picker
            is-range
            v-model="value"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-row>
        <h3>日期和时间</h3>
        <el-row>
          <el-date-picker
            v-model="value"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Radio 单选框" name="5">
         <h3>常规单选框</h3>
         <el-row>
            <el-radio v-model="radio" label="1">备选项</el-radio>
            <el-radio v-model="radio" label="2">备选项</el-radio>
            <el-radio disabled v-model="radio" label="1">备选项</el-radio>
            <el-radio disabled v-model="radio" label="选中且禁用">备选项</el-radio>
         </el-row>
         <h3>按钮样式单选框</h3>
         <el-row>
           <div>
            <el-radio-group v-model="radio1">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="radio2" size="medium">
              <el-radio-button label="上海" ></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="radio3" size="small">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京" disabled ></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="radio4" disabled size="mini">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>
         </el-row>
         <h3>带边框单选框</h3>
         <el-row>
           <div>
              <el-radio v-model="radio" label="1" border>备选项1</el-radio>
              <el-radio v-model="value" label="2" border>备选项2</el-radio>
            </div>
            <div style="margin-top: 20px">
              <el-radio v-model="radio" label="1" border size="medium" disabled>备选项1</el-radio>
              <el-radio v-model="value" label="2" border size="medium" disabled>备选项2</el-radio>
            </div>
            <div style="margin-top: 20px">
              <el-radio-group v-model="value" size="small">
                <el-radio label="1" border>备选项1</el-radio>
                <el-radio label="2" border disabled>备选项2</el-radio>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px">
              <el-radio-group v-model="value" size="mini" disabled>
                <el-radio label="1" border>备选项1</el-radio>
                <el-radio label="2" border>备选项2</el-radio>
              </el-radio-group>
            </div>
         </el-row>
      </el-collapse-item> 
      <el-collapse-item title="Checkbox 多选框" name="6">
        <h3>常规多选框</h3>
        <el-row>
          <el-checkbox v-model="checked">选项1</el-checkbox>
          <el-checkbox v-model="value">选项2</el-checkbox>
          <el-checkbox v-model="checked" disabled>选项3</el-checkbox>
          <el-checkbox v-model="value" disabled>选项4</el-checkbox>
        </el-row>
        <h3>多选框组</h3>
        <el-row>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
          </el-checkbox-group>
        </el-row>
        <h3>indeterminate 状态</h3>
        <el-row>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <h3>按钮样式多选框</h3>
        <el-row>
          <div>
            <el-checkbox-group v-model="checkboxGroup1">
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup2" size="medium">
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup3" size="small">
              <el-checkbox-button v-for="city in cities" :label="city" :disabled="city === '北京'" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-row>
        <h3>带边框多选框</h3>
        <el-row>
          <div>
            <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
            <el-checkbox v-model="checked2" label="备选项2" border></el-checkbox>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox v-model="checked3" label="备选项1" border size="medium"></el-checkbox>
            <el-checkbox v-model="checked4" label="备选项2" border size="medium"></el-checkbox>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup1" size="small">
              <el-checkbox label="备选项1" border></el-checkbox>
              <el-checkbox label="备选项2" border disabled></el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup2" size="mini" disabled>
              <el-checkbox label="备选项1" border></el-checkbox>
              <el-checkbox label="备选项2" border></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Table 表格" name="7">
        <h3>基础表格（全选/反选及编号示例）</h3>
        <el-row>
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            style="width: 800px">
            <el-table-column
              type="selection"
              width="60"
              align="center">
            </el-table-column>
            <el-table-column
              width="70"
              label="编号"
              align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-row>
        <h3>带边框和斑马纹表格</h3>
        <el-row>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 800px">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-row>
        <h3>固定表头</h3>
        <el-row>
          <el-table
            :data="tableData"
            height="250"
            border
            style="width: 800px">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-row>
        <h3>固定列</h3>
        <el-row>
          <el-table
            :data="tableData"
            border
            style="width: 800px">
            <el-table-column
              fixed
              prop="date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="province"
              label="省份"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="市区"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="邮编"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Pagination 分页" name="8">
        <el-row>
          <el-pagination
            :page-size="20"
            :pager-count="11"
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-row>
        <el-row>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-row>
        <el-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Dialog 对话框" name="9">
        <el-button @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-collapse-item>
      
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      activeName: '0',
      dialogVisible: false,
      radio1: '上海',
      radio2: '上海',
      radio3: '上海',
      radio4: '上海',
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      checkboxGroup1: [],
      checkboxGroup2: [],
      checkAll: false,
      checkedCities: ['上海', '北京'],
      isIndeterminate: true,
      multipleSelection: [],
      input: '',
      value: '',
      select: '',
      radio: '1',
      checked: true,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      list: [], 
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['上海'],
      checkboxGroup3: ['上海'],
      checkboxGroup4: ['上海'],
      cities: ['上海', '北京', '广州', '深圳'],
      checkList: ['选中且禁用','复选框 A'],
      options1: [{
          value: 'zhinan',
          label: '指南',
          disabled: true,
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.cities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          
        })
        .catch(_ => {});
    }
  }
}
</script>

<style lang="scss" scoped>
  .component {
    padding: 20px;
    box-sizing: border-box;
    background: #FFF;
  }
  /deep/ .el-collapse-item__header {
    font-size: 16px;
    &.is-active {
      font-size: 18px;
      color: #376DEF;
    }
  }
  .section-input {
    .el-input,
    .el-select {
      width: 200px;
      margin-right: 15px;
    }
    .long {
      padding-bottom: 15px;
      .el-input {
        width: 420px;
      }
      .el-textarea {
        width: 420px;
      }
      /deep/.el-select .el-input {
        width: 120px;
      }
    }
  }
  h3 {
    padding: 10px 0 20px;
  }
  p {
     padding: 20px 0;
     color: #333;
     font-size: 16px;
  }
  .el-row {
    padding-bottom: 15px;
  }
  .el-button-group {
    padding-right: 20px;
  }
  .common-items {
    .el-alert {
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
</style>