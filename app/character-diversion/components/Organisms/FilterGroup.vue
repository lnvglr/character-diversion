<template>
  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-3 sm:flex-row item-center justify-between">
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
      <div class="w-full">
        <Input
          type="text"
          v-model="$state.discourse.search"
          placeholder="Filter glyphs ..."
          containerClass="text-bold w-auto w-full"
          class=""
        />
      </div>
      <Button
        @click="$state.discourse.filter.opinion = !$state.discourse.filter.opinion"
        class="mr-2 clear hidden sm:block"
        :title="$t('filter')"
        :class="{ active: $state.discourse.filter.opinion }"
      >with opinion</Button>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    items: {
      type: Object as () => {
        [key: string]: {
          icon: string;
          label: string;
          color?: string;
          class?: string;
          active?: boolean;
          hide?: boolean;
        };
      },
      required: true,
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
      --border-radius: var(--rounded-sm) 0 0 var(--rounded-sm);
    }

    &:last-child {
      --border-radius: 0 var(--rounded-sm) var(--rounded-sm) 0;
    }
  }
}
</style>
