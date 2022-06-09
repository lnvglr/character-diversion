<template>
  <div
    @dragenter.prevent="({dataTransfer}) => (active = true, draggedFiles = dataTransfer.items.length)"
    @dragleave.prevent="active = false"
    @dragover.prevent
    @drop.prevent="({dataTransfer}) => checkFiles(dataTransfer)"
    :class="{ active, disabled: !moreSpace }"
    class="dropzone"
    v-bind="$attrs"
  >
    <div v-if="!moreSpace" style="pointer-events: none">
      <span>{{$t('files.uploadMax', { n: maxFiles })}}</span>
    </div>
    <div v-else-if="active" style="pointer-events: none">
      <span>{{$t('files.drop', draggedFiles)}}</span>
    </div>
    <div v-else>
      <i18n-t keypath="files.dropNotice" tag="span" for="browse" scope="global">
        <label for="dropzoneFile">{{$t('files.browse')}}</label>
      </i18n-t>
      <small>{{$t('files.supported', { formats: accept.join(', ').toUpperCase(), size: "2 MB" })}}</small>
      <input @change="({target}) => checkFiles(target)" ref="files" type="file" id="dropzoneFile" class="dropzoneFile" multiple />
    </div>
  </div>
  <transition-group name="fade" tag="ul">
    <FileCard
      v-for="(item, i) in files"
      :key="item"
      tag="li"
      :file="item.file"
      :preview="item.preview"
      :index="i"
      @remove="removeFile"
    />
  </transition-group>
  <!-- <callout
    type="warning"
    margin="5px"
    :active="callout.length > 0"
    :close="true"
    @close="callout = []"
    >
      {{ callout.join('. ') }}
    </callout> -->
</template>

<script>
import FileCard from '@/components/UI/FileCard.vue'
// import Callout from '@/components/UI/Callout.vue'

export default {
  name: 'DropZone',
  components: {
    FileCard,
  //   Callout,
  },
  props: {
    name: String,
    accept: {
      type: Array,
      default: () => ['ttf', 'otf'],
    },
  },
  data() {
    return {
      active: false,
      files: [],
      maxFiles: 3,
      draggedFiles: 0,
      callout: [],
    }
  },
  computed: {
    moreSpace() {
      return this.files.length < this.maxFiles
    }
  },
  methods: {
    checkFiles(input) {
      this.callout = [];
      [...input.files].forEach((file) => {
        if (file.type.includes('font')) {
          this.addFile(file)
        } else {
          this.getDataURL(file).then((preview) => this.addFile(file, preview))
        }
      })
      this.active = false
    },
    addFile(file, preview = null) {
      const uniqueName = this.files.every(e => e.file.name !== file.name)
      const withinSize = file.size <= 2000000
      const allowedType = this.accept.some(e => {
        return file.type.replace(/jpeg|jpe/, 'jpg').includes(e.replace(/jpeg|jpe/, 'jpg'))
      })
      if (!uniqueName) this.callout.push(this.$t('files.duplicate') + ` (${file.name})`)
      if (!withinSize) this.callout.push(this.$t('files.supportedSize', { size: '2 MB' }) + ` (${file.name})`)
      const format = this.$t('files.supportedFormats', { formats: this.accept.join(', ').toUpperCase() });
      if (!allowedType && !this.callout.includes(format)) this.callout.push(format)
      if (this.moreSpace && uniqueName && withinSize && allowedType) {
        this.files.push({ file, preview })
      }
    },
    removeFile(index) {
      this.files.splice(index, 1)
    },
    async getDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },
  },
  watch: {
    files: {
      handler(data) {
        this.$emit('update:modelValue', data.map((e) => e.file))
        this.$state.discourse.new.files = data.map((e) => e.file)
      },
      deep: true,
    },
    callout: {
      handler(data) {
        if (data.length > 0) setTimeout(() => this.callout = [], 10000)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.dropzone {
  border-style: dashed;
  transition: var(--transition-duration-default);
  border-radius: var(--rounded-md);
  color: currentColor;
  padding: var(--padding-s);
  background: var(--color-white);
  div {
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
    height: 100%;
    font-weight: bold;
    text-align: center;
    small {
      font-weight: normal;
      color: var(--grey-light-05);
      font-size: 0.75rem;
    }
  }
  label {
    color: var(--color-primary-500);
    &:hover {
      color: var(--grey-dark-02);
      cursor: pointer;
    }
  }
  input {
    display: none;
  }
  &.disabled {
    opacity: 0.5;
    &.active {
      color: var(--color-alert-500);
      border: var(--border-default) dashed currentColor;
      background-color: var(--color-alert-300);
      transform: scale(1);
      // animation: $shake;
    }
  }
  &.active {
    color: var(--color-success-500);
    border: var(--border-default) dashed currentColor;
    background-color: var(--color-success-300);
    transform: scale(1.03);
  }
}
ul {
  list-style: none;
  padding: 0px;
  position: relative;
}
.tag {
  border-radius: var(--rounded-sm);
  font-size: 0.875em;
  background: var(--color-secondary-500);
  padding: 5px 7px;
  display: inline-flex;
  flex: initial;
}

// ======
</style>

<style lang="scss">
.dark {
  .dropzone {
    &.active {
      color: var(--color-info-500);
      border: var(--border-default) dashed currentColor;
      background-color: var(--color-info-800);
    }
  }
}

</style>