<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入要查找的节点所属人员..." style="width: 280px;margin-right:10px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" :picker-options="pickerOptions" align="left" style="width: 400px;margin-right:10px;" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 1%;"
    >
      <el-table-column align="center" label="序号" min-width="5%">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="预警类型" min-width="10%">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="预警时间" min-width="15%">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="节点号" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属项目" min-width="15%">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="节点所属人员" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作人" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间(关闭预警)" min-width="15%">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="10%">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import waves from '@/directive/waves'

export default {
  directives: { waves },
  data() {
    return {
      list: null,
      listLoading: true,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleFilter() {
    },
    handleDelete(row, $index) {
    }
  }
}
</script>
