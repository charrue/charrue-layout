<template>
  <div>
    <el-radio-group v-model="authValue" @change="onAuthChange">
      <el-radio-button label="user">User</el-radio-button>
      <el-radio-button label="admin">Admin</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "PageFive",
  data() {
    return {
      authValue: "user"
    }
  },
  methods: {
    onAuthChange(val) {
      this.$store.commit("SET_AUTH", val)
    }
  }
};
</script>
