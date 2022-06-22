<template>
  <nav
    class="w-full m-2"
    :hoverable="false"
  >
  <div class="flex justify-center gap-2 w-full">
    <Button
      v-for="(item, name) in items"
      :key="name"
      :icon="item.icon"
      :title="item.label"
      class="flex-1 lg clear flex-row-reverse"
      @click="setActive(name)"
      :class="{ active: active === name }"
      v-show="!item.hide"
      >{{ item.label }}</Button
    >
    </div>
  </nav>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    items: Object as () => {
      [key: string]: {
        icon: string;
        label: string;
        color?: string;
        class?: string;
        active?: boolean;
        hide?: boolean;
      };
    },
  },
  mounted() {
    this.active = Object.entries(this.items).find(e => e[1].active)?.[0] || "";
  },
  data() {
    return {
      active: "",
    };
  },
  methods: {
    setActive(name: string | number) {
      this.active = name.toString();
    },
  },
  watch: {
    active(newValue: string) {
      this.$emit("active", newValue);
    },
  },
});
</script>

<style lang="scss"></style>
