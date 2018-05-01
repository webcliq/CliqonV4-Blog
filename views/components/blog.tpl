<!-- Blog.Tpl  -->
<style>
.card {min-width: 200px; max-width: 320px;}
</style>
<div class="card-group" id="blogroll" data-masonry='{ "itemSelector": ".card", "columnWidth": 300 }'>

  <!-- Repeat starts -->
  <div class="card mb-4 box-shadow pointer border-light" v-for="(art, artid) in rs">
    <img class="card-img-top" :src="art.d_image" v-bind:alt="art.d_title['@($idiom)']" v-on:click="displayArticle($event, art.id, art.c_reference, artid)">
    <div class="card-body" v-on:click="displayArticle($event, art.id, art.c_reference)">
      <h5 class="card-title bluec bold">{{art.d_title['@($idiom)']}}</h5>
      <p class="card-text">{{art.d_description['@($idiom)']}}</p>
      <p class="card-text"><small class="text-muted">{{art.d_author}} - {{art.d_date}}</small></p>
    </div>
  </div>
  <!--  Repeat Ends  -->

</div>