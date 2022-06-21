<template>
<div>
  <div class="flex item-center my-5 justify-between">
    <div class="button-group">
      <Button
        v-for="(item, name) in items"
        @click="setActive(name)"
        :class="{ active: active === name }"
        :icon="item.icon"
        :title="item.label"
        v-show="!item.hide"
      />
    </div>
    <Button
      @click="$state.discourse.filter.opinion = !$state.discourse.filter.opinion"
      icon="filter"
      class="ml-auto mr-2 clear"
      :title="$t('filter')"
      :class="{ active: $state.discourse.filter.opinion }"
    />
  </div>
  <Input
    type="text"
    v-model="$state.discourse.search"
    placeholder="Filter glyphs ..."
    containerClass="text-bold w-auto w-full"
    class="lg"
  />
	</div>
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
    this.active = Object.entries(this.items).find((e) => e[1].active)?.[0] || "";
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

<style lang="scss">
.button-group {
  display: flex;
  gap: var(--border-default);

  .button {
    --border-radius: 0;

    &:first-child {
      --border-radius: var(--rounded-md) 0 0 var(--rounded-md);
    }

    &:last-child {
      --border-radius: 0 var(--rounded-md) var(--rounded-md) 0;
    }
  }
}
</style>
