<template>
  <Card
    tag="nav"
    class="w-full flex justify-center gap-2 bg-beige-50 p-2"
    :hoverable="false"
  >
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
  </Card>
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
