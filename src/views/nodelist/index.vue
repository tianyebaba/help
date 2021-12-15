<template>
  <div class="app-container">
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
      <el-table-column align="center" label="节点ID" min-width="25%">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="节点状态" min-width="10%">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">
            <div v-if="scope.row.state == '0'">未启用</div>
            <div v-if="scope.row.state == '1'">离线</div>
            <div v-if="scope.row.state == '2'">在线</div>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属项目" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.project }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备名" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="节点数据" min-width="20%">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="success" @click="handleSearch(row,$index)">
            查看数据
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNodeList } from '@/api/node-management'
import waves from '@/directive/waves'

export default {
  directives: { waves },
  filters: {
    statusFilter(state) {
      const statusMap = {
        '0': 'gray',
        '1': 'danger',
        '2': 'success'
      }
      return statusMap[state]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getNodeList().then(response => {
        this.list = response.data
        this.listLoading = false
        console.log(this.list)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleSearch(row, $index) {
    }
  }
}
</script>
