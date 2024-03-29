<template>
  <form class="form-wrapper" @submit.prevent="onSave">
    <div class="form-group text-left">
      <label for="user-name">Name:</label>
      <input
        type="text"
        v-model.trim="$v.author.$model"
        value="user-name"
        :class="['form-control', {'alert-danger' : $v.author.$error}]"
      />
      <p class="alert alert-danger" v-if="$v.author.$error">Name is not valid!</p>
    </div>
    <div class="form-group text-left">
      <label for="postType">Typ immobilie:</label>
      <select
        id="postType"
        v-model="$v.postType.$model"
        :class="['form-control', {'alert-danger' : $v.postType.$error}]"
      >
        <option value="news">Allgemeines</option>
        <option value="sales">Zu verkaufen</option>
        <option value="rentals">Zu mieten</option>
      </select>
      <p class="alert alert-danger" v-if="$v.postType.$error">Please choose an option!</p>
    </div>
    <div class="form-group text-left">
      <label for="title">Beschreibung:</label>
      <input type="text" v-model.trim="title" value="title" class="form-control" />
    </div>
    <div class="form-group text-left" v-if="postType !== 'news'">
      <label for="price">Preis:</label>
      <input type="text" v-model.trim="price" value="price" class="form-control" />
    </div>
    <div class="form-group text-left" v-if="postType !== 'news'">
      <label for="propertyType">Immobilientyp:</label>
      <select id="propertyType" v-model="propertyType" class="form-control">
        <option value="Studio">Studio</option>
        <option value="Ein Zimmerwohnung">Ein Zimmerwohnung</option>
        <option value="Zwei Zimmerwohnung">Zwei Zimmerwohnung</option>
        <option value="Drei Zimmerwohnung">Drei Zimmerwohnung</option>
        <option value="Haus">Haus</option>
        <option value="Haus Dorflage">Haus Dorflage</option>
      </select>
    </div>
    <div class="form-group text-left" v-if="postType !== 'news'">
      <label for="location">Lage:</label>
      <select id="location" v-model="location" class="form-control">
        <option value="Varna">Varna</option>
        <option value="Kavarna">Kavarna</option>
        <option value="Balchik">Balchik</option>
        <option value="Bulgarevo">Bulgarevo</option>
        <option value="Mogilishte">Mogilishte</option>
        <option value="Kamen Bryag">Kamen Bryag</option>
        <option value="Tyulenovo">Tyulenovo</option>
        <option value="Topola">Topola</option>
        <option value="Bozhuretz">Bozhuretz</option>
      </select>
    </div>
    <div class="form-group text-left" v-if="postType !== 'news'">
      <label for="propertySize">Fläche:</label>
      <input type="text" v-model.trim="propertySize" value="propertySize" class="form-control" />
    </div>
    <div class="form-group text-left" v-if="postType !== 'news'">
      <label for="constructionYear">Baujahr:</label>
      <input
        type="text"
        v-model.trim="constructionYear"
        value="constructionYear"
        class="form-control"
      />
    </div>
    <b-form-group label="Bilder:" label-for="gallery" class="text-left">
      <b-form-file
        id="gallery"
        v-model="gallery"
        accept="image/*"
        value="gallery"
        multiple
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="uploadFiles"
      ></b-form-file>
      <div class="mt-3">
        <vue-select-image :dataImages="dataImages" @onselectimage="onSelectImage"></vue-select-image>
      </div>
      <div v-if="uploadMessage" class="alert alert-success">
        <span>{{uploadMessage}}</span>
      </div>
    </b-form-group>
    <div class="form-group text-left">
      <label for="content">Text:</label>
      <br />
      <textarea v-model="content" id="content" rows="5" class="form-control"></textarea>
    </div>
    <div v-if="postType === 'news'" class="form-group text-left">
      <label for="preview">Preview Text:</label>
      <br />
      <textarea v-model="preview" id="preview" rows="5" class="form-control"></textarea>
    </div>
    <button :disabled="$v.$invalid" class="btn btn-primary">Save</button>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import VueSelectImage from "vue-select-image";
import "vue-select-image/dist/vue-select-image.css";

export default {
  name: "PostForm",
  components: { VueSelectImage },
  data() {
    return {
      author: "",
      postType: "",
      propertyType: "",
      title: "",
      location: "",
      propertySize: "",
      constructionYear: "",
      price: "",
      gallery: [],
      content: "",
      preview: "",
      uploadMessage: "",
      thumbnail: ""
    };
  },
  computed: {
    ...mapGetters(["loadedImages", "loadedSales", "loadedRentals"]),
    dataImages() {
      let result = [];
      this.loadedImages.forEach((element, index) => {
        result.push({ id: index, src: element });
      });
      return result;
    }
  },
  methods: {
    ...mapActions(["addFilesToStorage"]),
    uploadFiles() {
      this.addFilesToStorage(gallery).then(resp => {
        if (resp.status === "ok") {
          this.uploadMessage = "The attachments were uploaded!";
        }
      });
    },
    getNumber() {
      if (this.postType === "sales") {
        return this.loadedSales.length + 1;
      } else if (this.postType === "rentals") {
        return this.loadedRentals.length + 1;
      }
    },
    onSave() {
      let postData = {
        author: this.author,
        postType: this.postType,
        propertyType: this.propertyType,
        title: this.title,
        location: this.location,
        propertySize: this.propertySize,
        constructionYear: this.constructionYear,
        price: this.price,
        content: this.content,
        preview: this.preview,
        number: this.getNumber(),
        thumbnail: this.thumbnail,
        date: new Date()
      };

      postData.gallery = this.loadedImages.toString();
      this.$emit("submit", postData);
    },
    onSelectImage(img) {
      this.thumbnail = img.src;
    }
  },
  validations: {
    author: {
      required
    },
    postType: {
      required
    }
  }
};
</script>

<style>
.vue-select-image__wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}
.vue-select-image__item {
  width: 20%;
}
</style>