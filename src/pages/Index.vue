<script setup lang="ts">
import formIcon from '@/assets/svg/formIcon.svg'
const counterStore = useCounterStore()

onMounted(() => {
  hello()
})

const btnLoading = ref(false)

function getData() {
  btnLoading.value = true
  testApi()
    .then((res: any) => {
      if (res && res.code == 200) {
        ElMessage.success('请求成功：' + res.msg)
        console.log(res)
      }
    })
    .catch((err: any) => {
      throw new Error(`testApi() error:::${err}`)
    })
    .finally(() => {
      btnLoading.value = false
    })
}

const elMessageOptions = reactive([
  {
    type: 'info',
    btnType: 'info',
    message: 'this is a message.'
  },
  {
    type: 'success',
    btnType: 'success',
    message: 'Congrats, this is a success message.'
  },
  {
    type: 'warning',
    btnType: 'warning',
    message: 'Warning, this is a warning message.'
  },
  {
    type: 'error',
    btnType: 'danger',
    message: 'Oops, this is a error message.'
  }
])
</script>

<template>
  <div flex="~" flex-col justify-start m-10 box-content items-center>
    <p text-5 font-bold>count from component</p>
    <br />
    <TheBaseCounter /><br />
    <p text-5 font-bold>count from store</p>
    <br />
    <div>
      <el-button plain @click="counterStore.inc">+</el-button>
      <span text-center px-5>{{ counterStore.count }} | {{ counterStore.doubleCount }}</span>
      <el-button plain @click="counterStore.dec">-</el-button>
    </div>
    <br />
    <p text-5 font-bold>vite-svg-loader</p>
    <formIcon w10 h10 />
    <div>
      <el-button
        plain
        v-for="(item, index) in elMessageOptions"
        :key="index"
        :type="item.btnType as any"
        @click="() => ElMessage({ type: item.type as any, message: item.message })"
        >{{ item.type }}</el-button
      >
    </div>
    <br />
    <div>
      <el-button @click="toggleDark()">
        <span i-carbon-light dark:i-carbon-moon />
        <span>{{ isDark ? 'Dark' : 'Light' }}</span>
      </el-button>
      <el-button plain @click="getData" :loading="btnLoading">请求</el-button>
    </div>
  </div>
</template>
