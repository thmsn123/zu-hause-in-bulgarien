<template>
  <div class="filtersWrapper">
    <span class="filterText">Filter by:</span>
    <popper
      class="popperWrapper"
      trigger="click"
      :options="{
          placement: 'bottom-start',
          modifiers: { offset: { offset: '0, 5px' } }
        }"
    >
      <div class="popper">
        <v-btn-toggle style="float:left;box-shadow: none; flex-direction: column;">
          <div class="popper-content">Studio</div>
          <div class="popper-content">One bedroom apartment</div>
          <div class="popper-content">Two bedroom apartment</div>
          <div class="popper-content">Three bedroom apartment</div>
          <div class="popper-content">House/villa</div>
          <div class="popper-content">Rural property</div>
        </v-btn-toggle>
      </div>
      <v-btn small class="whiteTextBtn sortersBtn" text slot="reference">Type</v-btn>
    </popper>
    <popper
      class="popperWrapper"
      trigger="click"
      :options="{
          placement: 'bottom-start',
          modifiers: { offset: { offset: '0, 5px' } }
        }"
    >
      <div class="popper">
        <v-btn-toggle style="float:left;box-shadow: none; flex-direction: column;">
          <div class="popper-content">to 20000</div>
          <div class="popper-content">from 20000 to 50000</div>
          <div class="popper-content">from 50000 to 100000</div>
          <div class="popper-content">over 10000</div>
        </v-btn-toggle>
      </div>
      <v-btn small class="whiteTextBtn sortersBtn" text slot="reference">Price</v-btn>
    </popper>
    <popper
      class="popperWrapper"
      trigger="click"
      :options="{
          placement: 'bottom-start',
          modifiers: { offset: { offset: '0, 5px' } }
        }"
    >
      <div class="popper">
        <v-btn-toggle style="float:left;box-shadow: none; flex-direction: column;">
          <div class="popper-content">Kavarna</div>
          <div class="popper-content">Balchik</div>
          <div class="popper-content">Bulgarevo</div>
          <div class="popper-content">Mogilishte</div>
          <div class="popper-content">Kamen Bryag</div>
          <div class="popper-content">Tyulenovo</div>
        </v-btn-toggle>
      </div>
      <v-btn small class="whiteTextBtn sortersBtn" text slot="reference">Location</v-btn>
    </popper>
    <popper
      class="popperWrapper"
      trigger="click"
      :options="{
          placement: 'bottom-start',
          modifiers: { offset: { offset: '0, 5px' } }
        }"
    >
      <div class="popper">
        <v-btn-toggle style="float:left;box-shadow: none; flex-direction: column;">
          <div class="popper-content">Price</div>
          <div class="popper-content">Distance</div>
          <div class="popper-content">Newest</div>
        </v-btn-toggle>
      </div>
      <v-btn small class="whiteTextBtn sortersBtn" text slot="reference">Sort</v-btn>
    </popper>
  </div>
</template>

<script>
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";

export default {
  name: "Filters",
  components: {
    popper: Popper
  }
};
</script>

<style scoped>
.popperWrapper {
  margin: 0 5px;
}
.filterText{
    font-weight: bold;
}
.filtersWrapper {
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
}
.sortersBtn {
  text-transform: capitalize;
  padding: 0px !important;
  margin: 0px !important;
}
.whiteTextBtn {
  color: #000;
  background: #fff;
  font-weight: bold;
  box-shadow: 0.07143rem 0.1429rem 0.3571rem 0.07143rem rgba(29, 29, 29, 0.08);
  padding: 0 0.7rem !important;
  font-size: 1rem;
  font-weight: 500;
  color: #3a3a3a;
  top: -0.07143rem;
}
#popper-content-selected,
.popper-content-selected {
  background: #f4f4f4ad;
  font-weight: bold;
}
.popper-content {
  text-transform: capitalize;
  padding: 0 0.7142rem;
  color: #3a3a3a !important;
  height: 2.4285rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.popper-content:hover {
  background: #f3f3f3;
}
</style>