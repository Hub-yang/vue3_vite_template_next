<script setup lang="ts">
interface Prop {
  initial?: number
}
const props = withDefaults(defineProps<Prop>(), {
  initial: 0
})
const { initial } = toRefs(props)
const { count, inc, dec } = useCounter(initial.value)
</script>

<template>
  <div>
    <el-button plain @click="inc()"> + </el-button>
    <span text-center px-2>{{ count }}</span>
    <el-button plain @click="dec()"> - </el-button>
  </div>
</template>
