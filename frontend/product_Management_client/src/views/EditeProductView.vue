<template>
    <span class="mr-52  mb-4 text-red-600 rounded ">
        <ul>
            <li v-for="item in validation.errors" :key="item">{{ item[0] }}</li>
        </ul>
    </span>
    <div class="container flex justify-around pt-9 mx-auto">

        <form @submit.prevent="addProduct">
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="name" id="name" v-model="product.name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <!-- <input type="password" name="floating_password" v-model="product.type" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> -->
                <!-- <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label> -->
                <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type </label>
                <select type="type" name="type" v-model="product.type" id="type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="A">Type A</option>
                    <option value="B">Type B</option>
                    <option value="C">Type C</option>
                    <option value="D">Type D</option>
                </select>

            </div>
            <div class="relative z-0 w-full mb-6 group">
                <label for="Detail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detail</label>
                <textarea name="desc" id="desc" v-model="product.desc" rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."></textarea>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <input type="number" name="qte" id="qte" v-model="product.qte"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label for="qte"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">qte</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" name="price" id="price" v-model="product.price"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label for="price"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">price</label>
                </div>
            </div>

            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span v-if="this.loading">
                Submiting...
            </span>
            <span v-if="!this.loading">
                Submit
            </span>
            </button>
        </form>

    </div>
</template>
 
<script>
import axios from 'axios';

export default {
    data() {
        return {
            product: {},
            loading:false,
            validation: {},

        }
    },
    created() {
        axios.get(`http://localhost:8000/api/products/${this.$route.params.id}`)
            .then((res) => {
                this.product = res.data.data;
            })
    },
    methods: {
        addProduct() {
            this.loading=true;
            axios
                .put(`http://localhost:8000/api/products/${this.$route.params.id}`, this.product)
                .then(response => (
                    this.$router.push({ path: '/' })
                ))
                .catch((error) => {
                    this.validation = error.response.data;
                })
                .finally(() => this.loading = false)
        }
    }
}
</script>