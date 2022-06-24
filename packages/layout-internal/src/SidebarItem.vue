<template>
  <div class="charrue-layout-sidebar-el-menu-container">
    <component
      :is="subMenuComponent"
      v-if="menuItem.children && menuItem.children.length > 0"
      :index="menuItem.path"
      popper-append-to-body
    >
      <template #title>
        <div
          class="submenu-title"
          :class="[menuItem.icon ? 'submenu-title-with-icon' : '']"
        >
          <i
            class="charrue-sidebar-menu-icon"
            :class="[prefixIconClass, menuItem.icon]"
          ></i>
          <span class="charrue-sidebar-menu-text" :class="[menuTextClass]">{{
            menuItem.title
          }}</span>
        </div>
      </template>

      <sidebar-item
        v-for="child in menuItem.children"
        :key="child.path"
        :route="route"
        :is-nest="true"
        :menu-item="child"
        :sub-menu-component="subMenuComponent"
      />
    </component>
    <template v-else>
      <router-link v-if="route" :to="menuItem.path" class="menu-router-link">
        <el-menu-item :index="menuItem.path">
          <i
            class="charrue-sidebar-menu-icon"
            :class="[prefixIconClass, menuItem.icon]"
          ></i>
          <template #title>
            <span class="charrue-sidebar-menu-text" :class="[menuTextClass]">{{
              menuItem.title
            }}</span>
          </template>
        </el-menu-item>
      </router-link>
      <el-menu-item v-else :index="menuItem.path">
        <i
          class="charrue-sidebar-menu-icon"
          :class="[prefixIconClass, menuItem.icon]"
        ></i>
        <template #title>
          <span class="charrue-sidebar-menu-text" :class="[menuTextClass]">{{
            menuItem.title
          }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
    prefixIconClass: String,
    menuTextClass: String,
    route: Boolean,
  },
  computed: {
    subMenuComponent() {
      return this.charrueLayoutConfig.subMenu;
    },
  },
};
</script>
