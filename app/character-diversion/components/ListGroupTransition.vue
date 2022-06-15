<template>
	<div class="relative"
		:class="{ [`${transitionName}-container`]: transitionName, activeTransition }"
		:style="`--height: ${containerHeight}`">
		<TransitionGroup :name="transitionName" @before-enter="activate" @after-enter="deactivate" @before-leave="activate"
			@after-leave="deactivate">
			<slot />
		</TransitionGroup>
	</div>
</template>
<script lang="ts">
export default defineComponent({
	props: ['watcher'],
	data() {
		return {
			containerHeight: null,
			transitionName: 'list',
			activeTransition: false,
			duration: 300
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.adjustHeight()
		})
	},
	watch: {
		watcher: {
			handler() {
				this.adjustHeight()
			},
			deep: true
		}
	},
	methods: {
		adjustHeight(timeout: number = this.duration) {
			if (!this.$el.children) return
			setTimeout(() => {
				let children = []
				for (let item of this.$el.children) {
					if (!item.classList.contains(`${this.transitionName}-leave-active`)) children.push(item)
				}
				this.containerHeight = [...children].reduce((acc, curr) => acc + curr.clientHeight, 0) + 'px'
			}, timeout)
		},
		activate() {
			this.activeTransition = true,
			this.adjustHeight(0)
		},
		deactivate() {
			setTimeout(() => {
				this.activeTransition = false
			}, this.duration)
		}
	},
})
</script>
<style lang="scss" scoped>
.activeTransition {
	height: var(--height);
}
</style>