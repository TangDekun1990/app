<template>
  <div class="content-wrapper">
    <h3 class="h3"><i class="icon iconfont icon-liebiao"></i>车辆申请审批</h3>
    <div class="content-main">
      <div class="tab-toolbar">        
		 <span class="mar-l-30 two-spacing">审批时间</span>
		          <el-date-picker
						v-model="value6"
						  type="daterange"
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期">
                    </el-date-picker>
        <span class="mar-l-30 two-spacing">用车类型</span>
        <el-select  v-model="plateNumber" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>			
        <span class="mar-l-30 three-spacing">审批状态</span>
        <el-select v-model="plateNumber"  placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>       
        <el-button type="primary" icon="el-icon-search" class="mar-l-30">查询</el-button>
      </div>
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80"></el-table-column>
        <el-table-column prop="brand" label="事项"></el-table-column>
        <el-table-column prop="vehicleType" label="目的地"></el-table-column>
        <el-table-column prop="seatCount" label="申请部门"></el-table-column>		
		    <el-table-column prop="brander" label="申请人" ></el-table-column>		
        <el-table-column prop="vehicleTyper" label="申请时间"></el-table-column>		
        <el-table-column prop="seatCounter" label="用车类型"></el-table-column>		
        <el-table-column prop="plateNumber" label="审批时间"></el-table-column>
		    <el-table-column prop="plateNumbers" label="审批状态"></el-table-column>      
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
              <el-button type="text" size="small"><i class="icon iconfont icon-shenhe"></i> 审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :page-size="formPage.limit"
        :total="formPage.total">
      </el-pagination>	  
    </div>
  </div>
</template>
<script>
// import {postList} from '../../api/application'
    export default {
      data() {
        return {

          brand:[],          //事项
		      vehicleType:[],    //目的地
		      seatCount:[],     //申请部门
		      brander:[],       //申请人  
          vehicleTyper:[], //申请时间
		      seatCounter:[],  //用车类型
          plateNumber:[],   //审批时间
		      plateNumbers:[],   //审批状态   

          formPage:{
            page: 1,
            limit: 10,
            total:undefined,
          },
          active: 0,
          showImg: true,
          activeIndex: '1',
          activeIndex2: '1',
          value6: '',
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
          tableData: [{

          }]
        };
      },
	  created(){
          // postList(1,1,this.formPage.page,this.formPage.limit).then(response => {
          //  this.tableData = response.data.list
          //   this.formPage.total = response.data.total
          // })
      },
	  methods:{
        addInfo: function () {
          // this.$router.push({ path: '/application/cl-application'});
        },
        handleSizeChange(val) {

        },
        handleCurrentChange(val) {
          this.formPage.page == val
          postList(1,1,val,this.formPage.limit).then(response => {
            this.tableData = response.data.list
          })
        },			
      },
    }
</script>
<style scoped>
  .two-spacing  {
    letter-spacing: 15px;
  }
  .three-spacing {
  letter-spacing: 7px;
  }
</style>