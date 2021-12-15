<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增节点
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
          <el-button size="mini" type="primary" @click="handleUpdate(row,$index)">
            修改节点
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除节点
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="新增节点"
      :visible.sync="dialogFormVisible"
      direction="rtl"
      :wrapper-closable="false"
      size="30%"
    >
      <div class="demo-drawer__content">
        <el-form ref="dataForm" :rules="rules" :model="temp1" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
          <el-form-item label="设备名" prop="name">
            <el-input v-model="temp1.name" />
          </el-form-item>
          <el-form-item label="所属项目" prop="project">
            <el-input v-model="temp1.project" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button style="margin-left:10%; width: 30%" @click="dialogFormVisible = false">取 消</el-button>
          <el-button style="margin-left:8%;width: 30%" type="primary" @click="createData()">确 定</el-button>
        </div>
      </div>
    </el-drawer>

    <el-drawer
      title="修改节点"
      :visible.sync="dialogForm1Visible"
      direction="rtl"
      :wrapper-closable="false"
      size="30%"
    >
      <div class="demo-drawer__content">
        <el-form ref="dataForm" :rules="rules" :model="temp1" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
          <el-form-item label="设备名" prop="name">
            <el-input v-model="temp1.name" />
          </el-form-item>
          <el-form-item label="所属项目" prop="project">
            <el-input v-model="temp1.project" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button style="margin-left:10%; width: 30%" @click="dialogForm1Visible = false">取 消</el-button>
          <el-button style="margin-left:8%;width: 30%" type="primary" @click="updateData()">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getNodeList, createNode, updateNode, deleteNode } from '@/api/node-management'
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
      listLoading: true,
      dialogFormVisible: false,
      dialogForm1Visible: false,
      temp1: {
        id: '',
        name: '',
        project: '',
        state: ''
      },
      rules: {
        name: [{ required: true, message: '此项不能为空！', trigger: 'blur' }],
        project: [{ required: true, message: '此项不能为空！', trigger: 'blur' }]
      }
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
    resetTemp() {
      /* 新增节点时重置数据 */
      this.temp1 = {
        id: '',
        name: '',
        project: '',
        state: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createNode(this.temp1).then((res) => {
            if (res.code === 200) {
              this.dialogFormVisible = false
              this.fetchData()
              this.$notify({
                title: '新增',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp1 = Object.assign({}, row) // copy obj
      this.dialogForm1Visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateNode(this.temp1).then((res) => {
            if (res.code === 200) {
              this.dialogForm1Visible = false
              this.fetchData()
              this.$notify({
                title: 'Success',
                message: '修改成功！',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.temp1 = Object.assign({}, row)
        deleteNode(this.temp1).then(res => {
          if (res.code === 200) {
            this.fetchData()
            this.$notify({
              title: 'Success',
              type: 'success',
              message: '删除成功!',
              duration: 2000
            })
          }
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除',
          duration: 2000
        })
      })
    }
  }
}
</script>
