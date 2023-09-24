<template>
  <div class="w-[75%] flex pt-9 pb-4 mx-auto">
    <input type="text" v-model="search" id="search" class="border rounded-lg p-2 w-full" @input=" searchProducts()" />
    <div class="pl-2 z-0 group w-35">
        <select type="filter" name="filter" v-model="filter"  id="filter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="name">By name</option>
        <option value="type">By type</option>
        <option value="desc">By details</option>
        <option value="price">By price</option>
        </select>
  
    </div>
  </div>
  <div class="w-[75%]  justify-around pb-8 mx-auto">
    <div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            ID
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            type
          </th>
          <th scope="col" class="px-6 py-3">
            Detail
          </th>
          <th scope="col" class="px-6 py-3">
            Price
          </th>
          <th scope="col" class="px-6 py-3">
            qte
          </th>
            <th scope="col" class="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="bg-white border-b">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.desc }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.qte }}</td>

          <td>
            <div class="btn-group" role="group">
              <router-link :to="`/edit/${product.id}`" class="btn btn-success">Edit</router-link>/
              <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
            </div>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
    <div>

      <div class="mt-4">
      <nav class="flex items-center justify-between">
        <div class="flex justify-center items-center">
          <span class="mr-2">Page:</span>
          
          <button
            class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            :class="{ 'bg-blue-600': currentPage ===this.meta.currentPage }"
            @click="currentPage(this.meta.currentPage)"
            :disabled="currentPage === this.meta.currentPage"
          >
           {{ this.currentPage}}
          </button>
        

          <!-- Add more buttons as needed based on the number of pages -->

          <span class="ml-2">of {{ this.meta.last_page}}</span>
        </div>
        <div class="flex">
          <button
            class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            @click="prevPage"
           
          >
            Prev
          </button>
          <button
            class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 ml-2"
            @click="nextPage"
            
          >
            Next
          </button>
        </div>
      </nav>
    </div>
    </div>
 
  </div>


</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      products: [],
      search:'',
      meta : {}, // Define the "page" variable
      currentPage:1,
      filter:''
    }
  },  
  created() {
   
       axios
      .get(`http://localhost:8000/api/products?page=${this.currentPage}`)
      .then(response => {
        this.products = response.data.data;
        this.meta = response.data.meta;
      });
   
  },
  methods: {
    
    deleteProduct(id) {
      axios
        .delete(`http://localhost:8000/api/products/${id}`)
        .then(response => {
          let i = this.products.map(data => data.id).indexOf(id);
          this.products.splice(i, 1)
        });
    },
    searchProducts() {
      axios
        .post(`http://localhost:8000/api/search?page=${this.currentPage}`,{keyword:this.search,filter:this.filter})
        .then(response => {
          this.products = response.data.data;
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.searchProducts();
      }
    },
    nextPage() {
      if (this.currentPage < this.meta.last_page) {
        this.currentPage++;
        this.searchProducts();
      }
  }
  }
  }
</script>