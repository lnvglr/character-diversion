<template>
  <TransitionExpand>
    <div v-if="maxFiles > files.length">
    <div
      @dragenter.prevent="
        ({ dataTransfer }) => (
          (active = true), (draggedFiles = dataTransfer.items.length)
        )
      "
      @dragleave.prevent="active = false"
      @dragover.prevent
      @drop.prevent="({ dataTransfer }) => checkFiles(dataTransfer)"
      :class="{ active, disabled: !moreSpace }"
      class="dropzone"
      v-bind="$attrs"
    >
      <div v-if="!moreSpace && dropzone" style="pointer-events: none">
        <span>{{ $t("files.uploadMax", { n: maxFiles }) }}</span>
      </div>
      <div v-else-if="active && dropzone" style="pointer-events: none">
        <span>{{ $t("files.drop", draggedFiles) }}</span>
      </div>
      <div v-else-if="dropzone">
        <i18n-t keypath="files.dropNotice" tag="span" for="browse" scope="global">
          <label for="dropzoneFile">{{ $t("files.browse") }}</label>
        </i18n-t>
        <small>{{
          $t("files.supported", {
            formats: accept.join(", ").toUpperCase(),
            size: formatBytes(maxFileSize),
          })
        }}</small>
        <input
          @change="({ target }) => checkFiles(target)"
          ref="files"
          type="file"
          id="dropzoneFile"
          class="dropzoneFile"
          multiple
        />
      </div>
    </div>
  </div>
  </TransitionExpand>
  <transition-group name="fade" tag="ul" v-if="filelist && dropzone">
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
  <div
    type="warning"
    margin="5px"
    :active="callout.length > 0"
    :close="true"
    @close="callout = []"
  >
    {{ callout.join(". ") }}
  </div>
</template>

<script lang="ts">
import FileCard from "~/components/UI/FileCard.vue";
// import Callout from '~/components/UI/Callout.vue'

export default defineComponent({
  name: "DropZone",
  components: {
    FileCard,
    //   Callout,
  },
  props: {
    name: String,
    accept: {
      type: Array,
      default: () => ["ttf", "otf"],
    },
    maxSize: {
      type: Number,
    },
    maxFiles: {
      type: Number,
      default: 3,
    },
    dropzone: {
      type: Boolean,
      default: true,
    },
    filelist: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      active: false,
      files: [],
      maxFileSize: this.maxSize || 2 * 1024 * 1024,
      draggedFiles: 0,
      callout: [],
    };
  },
  computed: {
    moreSpace() {
      return this.files.length < this.maxFiles;
    },
  },
  methods: {
    checkFiles(input) {
      this.callout = [];
      [...input.files].forEach((file) => {
        if (file.type.includes("font")) {
          this.addFile(file);
        } else {
          this.getDataURL(file).then((preview) => this.addFile(file, preview));
        }
      });
      this.active = false;
    },
    addFile(file, preview = null) {
      const uniqueName = this.files.every((e) => e.file.name !== file.name);
      const withinSize = file.size <= this.maxFileSize;
      const allowedType = this.accept.some((e) => {
        return file.type
          .replace(/jpeg|jpe/, "jpg")
          .includes(e.replace(/jpeg|jpe/, "jpg"));
      });
      if (!uniqueName) this.callout.push(this.$t("files.duplicate") + ` (${file.name})`);
      if (!withinSize)
        this.callout.push(
          this.$t("files.supportedSize", { size: this.formatBytes(this.maxFileSize) }) +
            ` (${file.name})`
        );
      const format = this.$t("files.supportedFormats", {
        formats: this.accept.join(", ").toUpperCase(),
      });
      if (!allowedType && !this.callout.includes(format)) this.callout.push(format);
      if (this.moreSpace && uniqueName && withinSize && allowedType) {
        this.files.push({ file, preview });
      }
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    async getDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    formatBytes(bytes: number, decimals: number = 2): string {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
  },
  watch: {
    files: {
      handler(data) {
        this.$emit(
          "update:modelValue",
          data.map((e) => e.file)
        );
        // this.$state.discourse.new.files = data.map((e) => e.file)
      },
      deep: true,
    },
    callout: {
      handler(data) {
        if (data.length > 0) setTimeout(() => (this.callout = []), 10000);
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
:global(:where(.dropzone)) {
  border-style: dashed;
  transition: var(--transition-duration-default);
  border-radius: var(--rounded-md);
  color: currentColor;
  padding: var(--padding-s);
  background: var(--color-white);
}
:global(:where(.dark .dropzone)) {
  background: var(--color-neutral-700);
}
.dropzone {
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
