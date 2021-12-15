<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增用户
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 1%;"
    >
      <el-table-column label="序号" prop="id" align="center" min-width="5%">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" min-width="15%">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="员工姓名" align="center" min-width="20%">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="员工联系电话" align="center" min-width="25%">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="员工年龄" align="center" min-width="5%">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="30%" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleUpdate(row,$index)">
            修改用户信息
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-drawer
      title="新增用户信息"
      :visible.sync="dialogFormVisible"
      :direction="direction"
      :wrapper-closable="false"
      size="30%"
    >
      <div class="demo-drawer__content">
        <el-form ref="dataForm" :rules="rules" :model="temp1" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
          <el-form-item label="用户名" prop="account">
            <el-input v-model="temp1.account" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="temp1.password" />
          </el-form-item>
          <el-form-item label="员工姓名" prop="name">
            <el-input v-model="temp1.name" />
          </el-form-item>
          <el-form-item label="员工联系电话" prop="phone">
            <el-input v-model="temp1.phone" />
          </el-form-item>
          <el-form-item label="员工年龄" prop="age">
            <el-input v-model="temp1.age" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button style="margin-left:10%; width: 30%" @click="dialogFormVisible = false">取 消</el-button>
          <el-button style="margin-left:8%;width: 30%" type="primary" @click="createData()">确 定</el-button>
        </div>
      </div>
    </el-drawer>

    <el-drawer
      title="修改用户信息"
      :visible.sync="dialogForm1Visible"
      :direction="direction"
      :wrapper-closable="false"
      size="30%"
    >
      <div class="demo-drawer__content">
        <el-form ref="dataForm" :rules="rules1" :model="temp1" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
          <el-form-item label="用户名" prop="account">
            <el-input v-model="temp1.account" disabled />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="temp1.password" />
          </el-form-item>
          <el-form-item label="员工姓名" prop="name">
            <el-input v-model="temp1.name" />
          </el-form-item>
          <el-form-item label="员工联系电话" prop="phone">
            <el-input v-model="temp1.phone" />
          </el-form-item>
          <el-form-item label="员工年龄" prop="age">
            <el-input v-model="temp1.age" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button style="margin-left:10%; width: 30%" @click="dialogForm1Visible = false">取 消</el-button>
          <el-button style="margin-left:8%; width: 30%" type="primary" @click="updateData()">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { fetchUserList, createUser, updateWork, deleteUser } from '@/api/UserManagement'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'WorkerList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        username: ''
      },
      showReviewer: false,
      direction: 'rtl',
      temp1: {
        account: '',
        password: '',
        age: '',
        name: '',
        phone: ''
      },
      dialogFormVisible: false,
      dialogForm1Visible: false,
      dialogStatus: '',
      rules: {
        account: [{ required: true, message: '此项不能为空！', trigger: 'blur' }],
        password: [{ required: true, message: '此项不能为空！', trigger: 'blur' }],
        age: [{ required: true, message: '此项不能为空！', trigger: 'blur' }],
        name: [{ required: true, message: '此项不能为空！', trigger: 'blur' }],
        phone: [{ required: true, message: '此项不能为空！', trigger: 'blur' }]
      },
      rules1: {
        password: [{ required: true, message: '此项不能为空！', trigger: 'blur' }],
        age: [{ required: true, message: '此项不能为空！', trigger: 'blur' }],
        name: [{ required: true, message: '此项不能为空！', trigger: 'blur' }],
        phone: [{ required: true, message: '此项不能为空！', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        // console.log(response.data)
        this.list = response.data
        // this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      /* 新增节点时重置数据 */
      this.temp1 = {
        account: '',
        password: '',
        age: '',
        name: '',
        phone: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp1).then((res) => {
            if (res.code === 200) {
              this.dialogFormVisible = false
              this.getList()
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
      // console.log(this.temp1)
      this.dialogStatus = 'update'
      this.dialogForm1Visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateWork(this.temp1).then((res) => {
            if (res.code === 200) {
              this.dialogForm1Visible = false
              this.getList()
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
    handleDelete(row, index) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const log = this.list[index]
        deleteUser(log.id).then(res => {
          if (res.code === 200) {
            this.getList()
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
